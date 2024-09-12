import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoreDocument = Store & Document;

enum PublishStatus {
  Published = 'published',
  Unpublished = 'unpublished',
}

enum StoreStatus {
  Active = 'active',
  Deactivated = 'deactivated',
}

enum Network {
  Ethereum = 'ethereum',
  Polygon = 'polygon',
  BinanceSmartChain = 'binance-smart-chain',
}

@Schema({ collection: 'stores', timestamps: true })
export class Store {
  @Prop({ required: true, unique: true })
  storeId: Number;

  @Prop({ required: true, unique: true })
  storeName: String;

  @Prop({ required: true, type: String, enum: Network })
  network: Network;

  @Prop({ required: true, unique: true })
  storeURL: String;

  @Prop({ type: String, enum: StoreStatus, default: StoreStatus.Active })
  storeStatus: StoreStatus;

  @Prop()
  assetCategories: String[];

  @Prop()
  auctions: String[];

  @Prop({ required: true })
  email: String;

  @Prop({
    type: String,
    enum: PublishStatus,
    default: PublishStatus.Unpublished,
  })
  publishStatus: PublishStatus;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
