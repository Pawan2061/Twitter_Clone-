import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BufferedFile } from './interface/file.model';
import * as crypto from 'crypto';

@Injectable()
export class MinioService {
  constructor(private readonly minio: MinioService) {}
  private readonly logger = Logger;
  private readonly bucketName = process.env.MINIO_BUCKET_NAME;
  public get client() {
    return this.minio.client;
  }

  public async upload(
    file: BufferedFile,
    bucketName: string = this.bucketName,
  ) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException(
        'file type not supported',
        HttpStatus.BAD_REQUEST,
      );
    }
    const timestamp = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(timestamp)
      .digest('hex');

    const extension = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
    };

    const fileName = hashedFileName + extension;

    this.client.putObject(
      bucketName,
      fileName,
      file.buffer,
      metaData,
      function (err: any, res: any) {
        if (err) {
          throw new HttpException(
            'Error uploading file',
            HttpStatus.BAD_REQUEST,
          );
        }
      },
    );
    return {
      url: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${fileName}`,
    };
  }

  async delete(objectName: string, bucketName: string = this.bucketName) {
    this.client.removeObject(
      bucketName,
      objectName,
      function (err: any, res: any) {
        if (err) {
          throw new HttpException(
            'Error occured while deleting',
            HttpStatus.BAD_REQUEST,
          );
        }
      },
    );
  }
}
