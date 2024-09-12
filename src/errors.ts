import { errorModel } from './dtos/errorModel';

// Authentication/Autherization Error Codes
const ERR_CODE_UNAUTHERIZED: String = 'err0';

// Application Error Codes
const ERR_CODE_AJV_VALIDATION_FAILED: String = 'err1';
const ERR_CODE_DUPLICATE_EXISTS: String = 'err2';
const ERR_CODE_STORE_NOT_FOUND: String = 'err3';
const ERR_CODE_INVALID_STORE_ID: String = 'err4';
const ERR_CODE_MEDIA_NOT_PROVIDED: String = 'err5';
const ERR_CODE_COLLECTION_NOT_FOUND: String = 'err6';
const ERR_CODE_INVALID_COLLECTION_ID: String = 'err7';
const ERR_CODE_ASSET_NOT_FOUND: String = 'err8';
const ERR_CODE_INVALID_ASSET_ID: String = 'err9';

// Authentication/Autherization Error Messages
const ERR_MSG_UNAUTHERIZED: String = 'Unautherized user';
const ERR_MSG_MISSING_AUTH_HEADER: String = 'Missing auth header';
const ERR_MSG_INVALID_AUTH_HEADER: String = 'Invalid auth header';
const ERR_MSG_USER_DISABLED: String = 'User has been disabled';

// Application Error Messages
const ERR_MSG_AJV_VALIDATION_FAILED: String = 'AJV validation failed';
const ERR_MSG_DUPLICATE_EXISTS: String = 'Duplicate exists';
const ERR_MSG_STORE_NOT_FOUND: String = 'Store not found';
const ERR_MSG_INVALID_STORE_ID: String = 'Invalid storeId';
const ERR_MSG_MEDIA_NOT_PROVIDED: String = 'Media not provided';
const ERR_MSG_COLLECTION_NOT_FOUND: String = 'Collection not found';
const ERR_MSG_INVALID_COLLECTION_ID: String = 'Invalid collectionId';
const ERR_MSG_ASSET_NOT_FOUND: String = 'Asset not found';
const ERR_MSG_INVALID_ASSET_ID: String = 'Invalid assetId';

// Custom Authentication/Autherization Errors
export const ERR_UNAUTHERIZED = (error) => {
  return {
    code: ERR_CODE_UNAUTHERIZED,
    message: ERR_MSG_UNAUTHERIZED,
    error: error,
  };
};

export const ERR_MISSING_AUTH_HEADER: errorModel = {
  code: ERR_CODE_UNAUTHERIZED,
  message: ERR_MSG_MISSING_AUTH_HEADER,
};

export const ERR_INVALID_AUTH_HEADER: errorModel = {
  code: ERR_CODE_UNAUTHERIZED,
  message: ERR_MSG_INVALID_AUTH_HEADER,
};

export const ERR_USER_DISABLED: errorModel = {
  code: ERR_CODE_UNAUTHERIZED,
  message: ERR_MSG_USER_DISABLED,
};

// Custom Application Errors
export const ERR_AJV_VALIDATION_FAILED = (error) => {
  return {
    code: ERR_CODE_AJV_VALIDATION_FAILED,
    message: ERR_MSG_AJV_VALIDATION_FAILED,
    error: error,
  };
};

export const ERR_DUPLICATE_EXISTS = (error) => {
  return {
    code: ERR_CODE_DUPLICATE_EXISTS,
    message: ERR_MSG_DUPLICATE_EXISTS,
    error: error,
  };
};

export const ERR_STORE_NOT_FOUND: errorModel = {
  code: ERR_CODE_STORE_NOT_FOUND,
  message: ERR_MSG_STORE_NOT_FOUND,
};

export const ERR_INVALID_STORE_ID: errorModel = {
  code: ERR_CODE_INVALID_STORE_ID,
  message: ERR_MSG_INVALID_STORE_ID,
};

export const ERR_MEDIA_NOT_PROVIDED: errorModel = {
  code: ERR_CODE_MEDIA_NOT_PROVIDED,
  message: ERR_MSG_MEDIA_NOT_PROVIDED,
};

export const ERR_COLLECTION_NOT_FOUND: errorModel = {
  code: ERR_CODE_COLLECTION_NOT_FOUND,
  message: ERR_MSG_COLLECTION_NOT_FOUND,
};

export const ERR_INVALID_COLLECTION_ID: errorModel = {
  code: ERR_CODE_INVALID_COLLECTION_ID,
  message: ERR_MSG_INVALID_COLLECTION_ID,
};

export const ERR_ASSET_NOT_FOUND: errorModel = {
  code: ERR_CODE_ASSET_NOT_FOUND,
  message: ERR_MSG_ASSET_NOT_FOUND,
};

export const ERR_INVALID_ASSET_ID: errorModel = {
  code: ERR_CODE_INVALID_ASSET_ID,
  message: ERR_MSG_INVALID_ASSET_ID,
};
