import { Schema as MongooseSchema } from "mongoose";

export interface collectionModel {
  collectionId: Number;
  storeId: Number;
  fk_storeId: MongooseSchema.Types.ObjectId;
  tokenStandard: String;
  contractAddress: String;
  logoImage: String;
  bannerImage: String;
  displayName: String;
  contractName: String;
  contractSymbol: String;
  description: String;
}
