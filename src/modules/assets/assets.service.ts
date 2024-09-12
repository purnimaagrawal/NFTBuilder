import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createMetadataRequestBodyValidate } from 'src/ajvInstance';
import { assetModel } from 'src/dtos/assetModel';
import { createMetadataRequestBody } from 'src/dtos/createMetadataRequestBody';
import {
  ERR_MEDIA_NOT_PROVIDED,
  ERR_AJV_VALIDATION_FAILED,
  ERR_ASSET_NOT_FOUND,
  ERR_COLLECTION_NOT_FOUND,
} from 'src/errors';
import { uploadToS3 } from 'src/utils/awsS3';
import { removeEmptyFields } from 'src/utils/misc';
import { v4 as uuid } from 'uuid';
import {
  Collection,
  CollectionDocument,
} from '../collections/collections.schema';
import { Asset, AssetDocument } from './assets.schema';
import { ListAssetsQuery } from './listAssetsQuery';

@Injectable()
export class AssetsService {
  constructor(
    @InjectModel(Asset.name)
    private readonly asset: Model<AssetDocument>,

    @InjectModel(Collection.name)
    private readonly collection: Model<CollectionDocument>,
  ) {}

  async listAssets(query: ListAssetsQuery) {
    let assetDocumentList: AssetDocument[] = [];
    let collectionDocumentList: CollectionDocument[] = [];
    let dbQuery = {
      asset_id: query.assetId,
      owner: query.owner,
      collection_id: null,
    };

    if (query.tokenStandard || query.collectionIds) {
      collectionDocumentList = await this.getCollectionList(
        query.tokenStandard,
        query.collectionIds,
      );
    }

    if (collectionDocumentList.length === 0) {
      // Remove empty fields from dbQuery and query all the relevant assets
      removeEmptyFields(dbQuery);
      assetDocumentList = await this.asset.find(dbQuery).exec();
    } else {
      // Loop through collection list and find assets with that collection_id
      await Promise.all(
        collectionDocumentList.map(async (collectionDocument) => {
          let filteredAssetDocumentList: AssetDocument[] = [];
          dbQuery.collection_id = collectionDocument._id;
          removeEmptyFields(dbQuery);
          filteredAssetDocumentList = await this.asset.find(dbQuery).exec();
          assetDocumentList.push(...filteredAssetDocumentList);
        }),
      );
    }

    if (assetDocumentList.length === 0) {
      throw new NotFoundException(ERR_ASSET_NOT_FOUND);
    }

    // Remove empty fields and create assetResponseList
    let assetResponseList: assetModel[] = [];
    assetDocumentList.map((assetDocument) => {
      const assetResponse: assetModel = {
        assetId: assetDocument.asset_id,
        assetContractAddress: assetDocument.assetContractAddress,
        mintedAt: assetDocument.mintedAt,
        mintedBy: assetDocument.mintedBy,
        name: assetDocument.name,
        description: assetDocument.description,
        image: assetDocument.image,
        attributes: assetDocument.attributes,
        externalURL: assetDocument.external_url,
        metadataURL: assetDocument.metadataURL,
        metadataJSON: assetDocument.metadataJSON,
        owner: assetDocument.owner,
        backgroundImage: assetDocument.background_image,
        backgroundColor: assetDocument.background_color,
        NFTCollection: assetDocument.NFTCollection,
      };

      removeEmptyFields(assetResponse);
      assetResponseList.push(assetResponse);
    });

    if (assetResponseList.length === 0) {
      throw new NotFoundException(ERR_ASSET_NOT_FOUND);
    }
    return assetResponseList;
  }

  async uploadMedia(mediaFile: Express.Multer.File) {
    if (!mediaFile) {
      throw new BadRequestException(ERR_MEDIA_NOT_PROVIDED);
    }

    const key = uuid() + '-' + mediaFile.originalname.replace(/\s/g, '');

    const uploadedMedia = await uploadToS3(
      key,
      mediaFile.buffer,
      mediaFile.mimetype,
    );

    return {
      uploadedMedia,
    };
  }

  async createMetadata(createMetadataRequestBody: createMetadataRequestBody) {
    const validBody = createMetadataRequestBodyValidate(
      createMetadataRequestBody,
    );
    if (!validBody) {
      const errors = createMetadataRequestBodyValidate.errors;
      throw new BadRequestException(ERR_AJV_VALIDATION_FAILED(errors));
    }

    const metadataBuffer = Buffer.from(
      JSON.stringify(createMetadataRequestBody),
    );
    const key =
      uuid() +
      '-' +
      createMetadataRequestBody.name.replace(/\s/g, '') +
      '.json';

    const uploadedMetadata = await uploadToS3(
      key,
      metadataBuffer,
      'application/json',
      'base64',
    );

    return {
      uploadedMetadata,
    };
  }

  private async getCollectionList(
    tokenStandard?: string,
    collectionIds?: number[],
  ) {
    let collectionDocumentList: CollectionDocument[] = [];
    let dbQuery = {
      tokenStandard,
      collectionId: null,
    };

    if (collectionIds) {
      // Loop through collectionIds and get collectionDocuments
      await Promise.all(
        collectionIds.map(async (collectionId) => {
          dbQuery.collectionId = collectionId;
          removeEmptyFields(dbQuery);
          const collectionDocument = await this.collection
            .findOne(dbQuery)
            .exec();
          if (collectionDocument) {
            collectionDocumentList.push(collectionDocument);
          }
        }),
      );
    } else {
      removeEmptyFields(dbQuery);
      collectionDocumentList = await this.collection.find(dbQuery).exec();
    }

    if (collectionDocumentList.length === 0) {
      throw new NotFoundException(ERR_COLLECTION_NOT_FOUND);
    }

    return collectionDocumentList;
  }
}
