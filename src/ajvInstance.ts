import Ajv from "ajv";
import addFormats from "ajv-formats";
import { createCollectionRequestBodyAJVSchema } from "./dtos/validationSchemaCollection";
import { createMetadataRequestBodyAJVSchema } from "./dtos/validation/createMetadataValidationSchema";
import { createStoreRequestBodyAJVSchema } from './dtos/validation/createStoreValidationSchema';
import { updateStoreNameRequestBodyAJVSchema } from './dtos/validation/updateStoreNameValidationSchema';

const ajvInstance = new Ajv({ allErrors: true });
addFormats(ajvInstance);

ajvInstance.addKeyword({
  keyword: "isNotEmpty",
  validate: (schema, data) => {
    if (schema) {
      return (
        (typeof data === "string" && data.trim() !== "") ||
        typeof data === "number"
      );
    } else return true;
  },
});

export const createCollectionRequestBodyValidate = ajvInstance.compile(
  createCollectionRequestBodyAJVSchema
);
export const createStoreRequestBodyValidate = ajvInstance.compile(
  createStoreRequestBodyAJVSchema,
);
export const createMetadataRequestBodyValidate = ajvInstance.compile(
  createMetadataRequestBodyAJVSchema,
);
export const updateStoreNameRequestBodyValidate = ajvInstance.compile(
  updateStoreNameRequestBodyAJVSchema,
);
