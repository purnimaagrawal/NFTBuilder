export const createMetadataRequestBodyAJVSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      isNotEmpty: true,
    },
    description: {
      type: 'string',
      isNotEmpty: true,
    },
    image: {
      type: 'string',
      format: 'uri',
      isNotEmpty: true,
    },
    external_url: {
      type: 'string',
      format: 'uri',
      isNotEmpty: true,
    },
    categories: {
      type: 'array',
      items: {
        type: 'string',
        isNotEmpty: true,
      },
    },
    attributes: {
      type: 'array',
      items: {
        type: 'object',
      },
    },
  },
  required: ['name', 'image', 'categories'],
  additionalProperties: false,
};
