export const createCollectionRequestBodyAJVSchema = {
  type: "object",
  properties: {
    storeId: { type: "number", isNotEmpty: true },
    tokenStandard: { type: "string", isNotEmpty: true },
    contractAddress: { type: "string", isNotEmpty: true },
    logoImage: { type: "string", isNotEmpty: true },
    bannerImage: { type: "string" },
    displayName: { type: "string", isNotEmpty: true },
    contractName: { type: "string", isNotEmpty: true },
    contractSymbol: { type: "string", isNotEmpty: true },
    description: { type: "string" },
  },
  required: [
    "storeId",
    "tokenStandard",
    "contractAddress",
    "contractName",
    "contractSymbol",
  ],
  additionalProperties: false,
};
