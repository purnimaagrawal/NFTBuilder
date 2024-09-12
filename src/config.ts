import { S3 } from 'aws-sdk';

const AWS_S3_CONFIG = {
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
};

export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
export const s3 = new S3(AWS_S3_CONFIG);
