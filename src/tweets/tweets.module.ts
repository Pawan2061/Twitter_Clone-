import { Module } from '@nestjs/common';
import { TweetService } from './tweets.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TweetsController } from './tweets.controller';
import { MinioModule } from 'src/minio/minio.module';

@Module({
  imports: [PrismaModule, MinioModule],
  controllers: [TweetsController],
  providers: [TweetService],
})
export class TweetModule {}
