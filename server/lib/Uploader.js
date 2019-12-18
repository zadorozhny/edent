import AWS from 'aws-sdk';
import { S3 } from '@/config';

const s3 = new AWS.S3({
  accessKeyId: S3.ACCESS_KEY,
  secretAccessKey: S3.SECRET_ACCESS_KEY,
  region: S3.REGION
});

export const Uploader = {
  getUrl() {
    const key = `${Date.now()}.jpeg`;

    return new Promise((resolve, reject) => {
      s3.getSignedUrl('putObject', {
        Bucket: S3.BUCKET_NAME,
        ContentType: 'image/jpeg',
        Key: key
      }, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve({ key, url });
        }
      });
    });
  }
};
