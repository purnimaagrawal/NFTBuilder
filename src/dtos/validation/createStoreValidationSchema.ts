export const createStoreRequestBodyAJVSchema = {
  type: "object",
  properties: {
    storeName: {
      type: "string",
      isNotEmpty: true,
    },
    network: {enum: ["ethereum", "polygon", "binance-smart-chain"]},
    storeURL: {
      type: "string",
      format: "uri",
      isNotEmpty: true,
    },
    email: {
      type: "string",
      format: "email",
      isNotEmpty: true,
    },
    assetCategories: {
      type: "array",
      items : {
        type: "string",
        isNotEmpty: true,
      }
    },
    auctions: {
      type: "array",
      items : {
        type: "string",
        isNotEmpty: true,
      }
    }
  },
  required: ["storeName","network", "storeURL","email"],
  additionalProperties: false,
}