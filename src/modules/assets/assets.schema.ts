import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type AssetDocument = Asset & Document;

@Schema({ collection: 'assets' })
export class Asset {
  @Prop()
  asset_id: Number;

  @Prop()
  assetContractAddress: String;

  @Prop()
  assetTokenId: Number;

  @Prop()
  mintedAt: String;

  @Prop()
  mintedBy: String;

  @Prop()
  name: String;

  @Prop()
  description: String;

  @Prop()
  image: String;

  @Prop({ type: Object })
  attributes: Object;

  @Prop()
  external_url: String;

  @Prop()
  metadataURL: String;

  @Prop({ type: Object })
  metadataJSON: Object;

  @Prop()
  owner: String;

  @Prop()
  background_image: String;

  @Prop()
  background_color: String;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'collections' })
  collection_id: Types.ObjectId;

  @Prop()
  NFTCollection: String;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
