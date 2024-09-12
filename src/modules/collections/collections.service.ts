import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isInt, isNumberString } from "class-validator";
import { Model, Types, Schema as MongooseSchema } from "mongoose";
import { createCollectionRequestBodyValidate } from "src/ajvInstance";
import { createCollectionRequestBody } from "src/dtos/createCollectionRequestBody";
import { createCollectionResponseBody } from "src/dtos/createCollectionResponseBody";
import { collectionModel } from "src/dtos/collectionModel";
import { collectionResponseModel } from "src/dtos/collectionResponseModel";
import {
  ERR_AJV_VALIDATION_FAILED,
  ERR_INVALID_COLLECTION_ID,
  ERR_COLLECTION_NOT_FOUND,
  ERR_STORE_NOT_FOUND,
} from "src/errors";
import { ListCollectionsQuery } from "./listCollectionsQuery";
import { Collection, CollectionDocument } from "./collections.schema";
import { Store, StoreDocument } from "../stores/stores.schema";

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collection.name)
    private readonly collection: Model<CollectionDocument>,

    @InjectModel(Store.name)
    private readonly store: Model<StoreDocument>
  ) {}

  async createCollection(
    createCollectionRequestBody: createCollectionRequestBody
  ) {
    const validBody = createCollectionRequestBodyValidate(
      createCollectionRequestBody
    );
    if (!validBody) {
      const errors = createCollectionRequestBodyValidate.errors;
      throw new BadRequestException(ERR_AJV_VALIDATION_FAILED(errors));
    }
    const newCollection: collectionModel = {
      collectionId: (await this.collection.countDocuments()) + 1,
      storeId: createCollectionRequestBody.storeId,
      fk_storeId: await this.getStoreObjectId(
        createCollectionRequestBody.storeId
      ),
      tokenStandard: createCollectionRequestBody.tokenStandard,
      contractAddress: createCollectionRequestBody.contractAddress,
      logoImage: createCollectionRequestBody.logoImage,
      bannerImage: createCollectionRequestBody.bannerImage,
      displayName: createCollectionRequestBody.displayName,
      contractName: createCollectionRequestBody.contractName,
      contractSymbol: createCollectionRequestBody.contractSymbol,
      description: createCollectionRequestBody.description,
    };
    await this.collection.create(newCollection);

    const createCollectionResponseBody: createCollectionResponseBody = {
      collectionId: newCollection.collectionId,
      storeId: newCollection.storeId,
      tokenStandard: newCollection.tokenStandard,
      contractAddress: newCollection.contractAddress,
      displayName: newCollection.displayName,
      contractName: newCollection.contractName,
      contractSymbol: newCollection.contractSymbol,
      description: newCollection.description,
    };
    return createCollectionResponseBody;
  }

  async listCollections(query: ListCollectionsQuery) {
    let collectionDocumentList: CollectionDocument[] = [];
    if (query.collectionId) {
      if (!isNumberString(query.collectionId)) {
        throw new BadRequestException(ERR_INVALID_COLLECTION_ID);
      }
      const collectionId = Number(query.collectionId);
      if (!isInt(collectionId) || collectionId <= 0) {
        throw new BadRequestException(ERR_INVALID_COLLECTION_ID);
      }
      const collectionDocument = await this.collection
        .findOne({ collectionId })
        .exec();

      if (!collectionDocument) {
        throw new NotFoundException(ERR_COLLECTION_NOT_FOUND);
      }
      collectionDocumentList.push(collectionDocument);
    } else {
      collectionDocumentList = await this.collection.find().exec();
    }

    if (collectionDocumentList.length === 0) {
      throw new NotFoundException(ERR_COLLECTION_NOT_FOUND);
    }

    let collectionResponseList: collectionResponseModel[] = [];
    collectionDocumentList.map((collectionDocument) => {
      const collectionResponse: collectionResponseModel = {
        storeId: collectionDocument.storeId,
        collectionId: collectionDocument.collectionId,
        displayName: collectionDocument.displayName,
        contractName: collectionDocument.contractName,
        contractSymbol: collectionDocument.contractSymbol,
        tokenStandard: collectionDocument.tokenStandard,
        contractAddress: collectionDocument.contractAddress,
      };
      collectionResponseList.push(collectionResponse);
    });

    return collectionResponseList;
  }

  async getStoreObjectId(storeId) {
    const storeDocument = await this.store.findOne({ storeId }).exec();

    if (!storeDocument) {
      throw new NotFoundException(ERR_STORE_NOT_FOUND);
    }
    return await storeDocument._id;
  }
}
