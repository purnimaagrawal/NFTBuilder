import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, Schema as MongooseSchema } from "mongoose";

export type CollectionDocument = Collection & Document;

enum TokenStandard {
  ERC721 = "ERC-721",
  ERC1155 = "ERC-1155",
}

@Schema({ collection: "collections" })
export class Collection {
  @Prop({ required: true })
  storeId: Number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "stores" })
  fk_storeId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  collectionId: Number;

  @Prop({ required: true, type: String, enum: TokenStandard })
  tokenStandard: TokenStandard;

  @Prop({ required: true, unique: true })
  contractAddress: String;

  @Prop()
  logoImage: String;

  @Prop()
  bannerImage: String;

  @Prop()
  displayName: String;

  @Prop({ required: true, unique: true })
  contractName: String;

  @Prop({ required: true, unique: true })
  contractSymbol: String;

  @Prop()
  description: String;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
