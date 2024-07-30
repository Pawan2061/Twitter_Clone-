import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTweetDto } from './dto/createTweet.dto';

@Injectable()
export class TweetService {
  constructor(private prismaService: PrismaService) {}

  async createTweet(dto: CreateTweetDto, user: any) {
    try {
      const tweet = await this.prismaService.tweet.create({
        data: {
          caption: dto.caption,
          authorId: user.id,
        },
        include: {
          likes: true,
        },
      });
      return {
        tweet: tweet.caption,
      };
    } catch (error) {
      return {
        errormessage: error,
      };
    }
  }

  async getTweets() {
    try {
      const tweets = await this.prismaService.tweet.findMany();
      if (!tweets) {
        return {
          message: 'No tweets found of the  user',
        };
      }
      return {
        tweets: tweets,
      };
    } catch (error) {
      return {
        errormessage: error,
      };
    }
  }

  async getTweetById(id: number) {
    try {
      const tweet = await this.prismaService.tweet.findFirst({
        where: {
          id: id,
        },
      });
      if (!tweet) {
        return {
          errormessage: 'No such tweet found',
        };
      }

      return {
        givenTweet: tweet,
      };
    } catch (error) {
      return {
        errorMessage: error,
      };
    }
  }

  async deleteTweet(id: number) {
    try {
      await this.prismaService.tweet.delete({
        where: {
          id: id,
        },
      });

      return {
        deletionResponse: 'The tweet is deleted',
      };
    } catch (error) {
      return {
        errorMessage: error,
      };
    }
  }
}
