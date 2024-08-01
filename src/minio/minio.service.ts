import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BufferedFile } from './interface/file.model';
import { NestMinioService } from 'nestjs-minio';

import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioService {
  constructor(
    private readonly minio: NestMinioService,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(MinioService.name);
  private readonly bucketName = process.env.MINIO_BUCKET_NAME;
  public get client() {
    return this.minio.getMinio();
  }

  public async upload(file: Buffer, key: string) {
    console.log('geetting here');

    try {
      this.client.putObject(
        this.configService.getOrThrow('MINIO_BUCKET_NAME'),
        key,
        file,
      );
    } catch (error) {
      return error.message;
    }

    // if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
    //   throw new HttpException(
    //     'file type not supported',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    // const timestamp = Date.now().toString();
    // const hashedFileName = crypto
    //   .createHash('md5')
    //   .update(timestamp)
    //   .digest('hex');

    // const extension = file.originalname.substring(
    //   file.originalname.lastIndexOf('.'),
    //   file.originalname.length,
    // );
    // const metaData = {
    //   'Content-Type': file.mimetype,
    // };

    // const fileName = hashedFileName + extension;

    // this.client.putObject(
    //   process.env.MINIO_BUCKET_NAME,
    //   fileName,
    //   file.buffer,
    //   metaData,

    //   function (err: any, res: any) {
    //     if (err) {
    //       throw new HttpException(
    //         'Error uploading file',
    //         HttpStatus.BAD_REQUEST,
    //       );
    //     }
    //   },
    // );
    // console.log(fileName);

    // return {
    //   url: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${fileName}`,
    // };
  }

  // async delete(objectName: string, bucketName: string = this.bucketName) {
  //   this.client.removeObject(
  //     bucketName,
  //     objectName,
  //     function (err: any, res: any) {
  //       if (err) {
  //         throw new HttpException(
  //           'Error occured while deleting',
  //           HttpStatus.BAD_REQUEST,
  //         );
  //       }
  //     },
  //   );
  // }
  async getFileUrl(key: string) {
    return `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${key}`;
  }
}
