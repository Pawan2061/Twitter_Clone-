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
  }

  async deleteUserProfile(
    objectName: string,
    bucketName: string = this.bucketName,
  ) {
    await this.client.removeObject(bucketName, objectName);
  }

  async updateProfile(key: string, bucketName: string = this.bucketName) {}
  async getFileUrl(key: string) {
    return `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${key}`;
  }
}
