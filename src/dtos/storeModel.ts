export interface storeModel {
  storeId: Number;
  storeName: String;
  storeURL: String;
  storeStatus: String;
  network: String;
  assetCategories: String[];
  auctions: String[];
  email: String;
  createdAt?: Date;
  updatedAt?: Date;
  publishStatus: String;
}
