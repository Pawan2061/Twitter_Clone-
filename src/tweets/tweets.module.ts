import { Module } from '@nestjs/common';
import { TweetService } from './tweets.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TweetsController } from './tweets.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TweetsController],
  providers: [TweetService],
})
export class TweetModule {}
