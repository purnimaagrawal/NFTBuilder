import { AWS_S3_BUCKET_NAME, s3 } from 'src/config';

export async function uploadToS3(
  key: string,
  buffer: Buffer,
  mimetype: string,
  contentEncoding?: string,
) {
  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: mimetype,
    ContentEncoding: contentEncoding,
  };

  return s3.upload(params).promise();
}
