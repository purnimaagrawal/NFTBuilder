import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isInt, isNumberString } from 'class-validator';
import { Model } from 'mongoose';
import {
  createStoreRequestBodyValidate,
  updateStoreNameRequestBodyValidate,
} from 'src/ajvInstance';
import { DEFAULT_PUBLISH_STATUS, DEFAULT_STORE_STATUS } from 'src/constants';
import { createStoreRequestBody } from 'src/dtos/createStoreRequestBody';
import { storeModel } from 'src/dtos/storeModel';
import { updateStoreNameRequestBody } from 'src/dtos/updateStoreNameRequestBody';
import {
  ERR_AJV_VALIDATION_FAILED,
  ERR_INVALID_STORE_ID,
  ERR_STORE_NOT_FOUND,
} from 'src/errors';
import { ListStoresQuery } from './listStoresQuery';
import { Store, StoreDocument } from './stores.schema';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel(Store.name)
    private readonly store: Model<StoreDocument>,
  ) {}

  async createStore(createStoreRequestBody: createStoreRequestBody) {
    const validBody = createStoreRequestBodyValidate(createStoreRequestBody);
    if (!validBody) {
      const errors = createStoreRequestBodyValidate.errors;
      throw new BadRequestException(ERR_AJV_VALIDATION_FAILED(errors));
    }
    const newStore: storeModel = {
      storeId: (await this.store.countDocuments()) + 1,
      storeName: createStoreRequestBody.storeName,
      storeURL: createStoreRequestBody.storeURL,
      storeStatus: DEFAULT_STORE_STATUS,
      network: createStoreRequestBody.network,
      assetCategories: createStoreRequestBody.assetCategories,
      auctions: createStoreRequestBody.auctions,
      email: createStoreRequestBody.email,
      publishStatus: DEFAULT_PUBLISH_STATUS,
    };
    const newStoreDocument: StoreDocument = await this.store.create(newStore);

    const newStoreResponse: storeModel = {
      storeId: newStoreDocument.storeId,
      storeName: newStoreDocument.storeName,
      network: newStoreDocument.network,
      storeURL: newStoreDocument.storeURL,
      storeStatus: newStoreDocument.storeStatus,
      email: newStoreDocument.email,
      assetCategories: newStoreDocument.assetCategories,
      auctions: newStoreDocument.auctions,
      publishStatus: newStoreDocument.publishStatus,
      createdAt: newStoreDocument.createdAt,
      updatedAt: newStoreDocument.updatedAt,
    };
    return newStoreResponse;
  }

  async listStores(query: ListStoresQuery) {
    let storeDocumentList: StoreDocument[] = [];
    if (!query.storeId && !query.email) {
      storeDocumentList = await this.store.find().exec();
    } else if (query.email && !query.storeId) {
      const email = query.email;
      storeDocumentList = await this.store.find({ email }).exec();
    } else if (query.storeId && !query.email) {
      if (!isNumberString(query.storeId)) {
        throw new BadRequestException(ERR_INVALID_STORE_ID);
      }
      const storeId = Number(query.storeId);
      if (!isInt(storeId) || storeId <= 0) {
        throw new BadRequestException(ERR_INVALID_STORE_ID);
      }
      const storeDocument = await this.store.findOne({ storeId }).exec();

      if (!storeDocument) {
        throw new NotFoundException(ERR_STORE_NOT_FOUND);
      }
      storeDocumentList = [storeDocument];
    } else if (query.storeId && query.email) {
      const email = query.email;
      storeDocumentList = await this.store.find({ email }).exec();

      if (!isNumberString(query.storeId)) {
        throw new BadRequestException(ERR_INVALID_STORE_ID);
      }
      const storeId = Number(query.storeId);
      if (!isInt(storeId) || storeId <= 0) {
        throw new BadRequestException(ERR_INVALID_STORE_ID);
      }
      const storeDocument = await this.store.findOne({ storeId }).exec();
      if (storeDocument && storeDocument.email != email) {
        storeDocumentList.push(storeDocument);
      }
    }

    if (storeDocumentList.length === 0) {
      throw new NotFoundException(ERR_STORE_NOT_FOUND);
    }

    let storeResponseList: storeModel[] = [];
    storeDocumentList.map((storeDocument) => {
      const storeResponse: storeModel = {
        storeId: storeDocument.storeId,
        storeName: storeDocument.storeName,
        network: storeDocument.network,
        storeURL: storeDocument.storeURL,
        storeStatus: storeDocument.storeStatus,
        email: storeDocument.email,
        assetCategories: storeDocument.assetCategories,
        auctions: storeDocument.auctions,
        publishStatus: storeDocument.publishStatus,
        createdAt: storeDocument.createdAt,
        updatedAt: storeDocument.updatedAt,
      };
      storeResponseList.push(storeResponse);
    });

    return storeResponseList;
  }

  async updateStoreName(
    updateStoreNameRequestBody: updateStoreNameRequestBody,
  ) {
    const validBody = updateStoreNameRequestBodyValidate(
      updateStoreNameRequestBody,
    );
    if (!validBody) {
      const errors = updateStoreNameRequestBodyValidate.errors;
      throw new BadRequestException(ERR_AJV_VALIDATION_FAILED(errors));
    }

    if (
      !isInt(updateStoreNameRequestBody.storeId) ||
      updateStoreNameRequestBody.storeId > (await this.store.countDocuments())
    ) {
      throw new BadRequestException(ERR_INVALID_STORE_ID);
    }

    await this.store.updateOne(
      { storeId: updateStoreNameRequestBody.storeId },
      { storeName: updateStoreNameRequestBody.storeName },
    );
  }
}
