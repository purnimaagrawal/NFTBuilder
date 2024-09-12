export const updateStoreNameRequestBodyAJVSchema = {
  type: 'object',
  properties: {
    storeId: {
      type: 'number',
    },
    storeName: {
      type: 'string',
      isNotEmpty: true,
    },
  },
  required: ['storeId', 'storeName'],
  additionalProperties: false,
};
