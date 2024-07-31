import { Delete, Injectable, RequestTimeoutException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTweetDto } from './dto/createTweet.dto';
import { count } from 'console';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';

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
  async likeTweet(tweetId: number, user: any) {
    try {
      const updatedUser = await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          likedTweets: {
            connect: [
              {
                id: tweetId,
              },
            ],
          },
        },
      });

      return {
        response: `${tweetId} is liked`,
      };
    } catch (error) {
      return {
        errorMessage: error,
      };
    }
  }
  async saveTweet(tweetId: number, user: any) {
    try {
      const saved = await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          savedTweets: {
            // used to add the likedTweet
            connect: [
              {
                id: tweetId,
              },
            ],
          },
        },
      });

      return {
        respones: `${tweetId} is saved`,
      };
    } catch (error) {
      return {
        errorMessage: error,
      };
    }
  }

  async dislikeTweet(tweetId: number, user: any) {
    try {
      const dislikedTweet = await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          likedTweets: {
            // used to remove the likedTweet
            disconnect: {
              id: tweetId,
            },
          },
        },
      });

      return {
        respone: `${tweetId} is disliked`,
      };
    } catch (error) {
      return {
        errorMessage: error,
      };
    }
  }
  async unsavedTweet(tweetId: number, user: any) {
    try {
      const unsavedTweet = await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          savedTweets: {
            // used to remove the likedTweet
            disconnect: {
              id: tweetId,
            },
          },
        },
      });

      return {
        respone: `${tweetId} is unsaved`,
      };
    } catch (error) {
      return {
        errorMessage: error,
      };
    }
  }

  async comment(tweetId: number, dto: CreateCommentDto, user: any) {
    try {
      console.log('reached here');
      console.log(dto.comment);
      console.log(dto, 'here');

      const comment = await this.prismaService.comment.create({
        data: {
          tweetId: tweetId,
          comment: dto.comment,
          userId: user.id,
        },
        include: {
          commentor: true,
        },
      });
      await this.prismaService.tweet.update({
        where: {
          id: tweetId,
        },
        data: {
          comments: {
            connect: {
              id: comment.id,
            },
          },
        },
      });

      return {
        message: `${comment.id} is posted`,
      };
    } catch (error) {
      console.log(error);

      return {
        errorMessage: error,
      };
    }
  }

  async showComments(tweetId: number) {
    try {
      const comments = await this.prismaService.comment.findMany({
        where: {
          tweetId: tweetId,
        },
      });

      return {
        comments: comments,
      };
    } catch (error) {
      return {
        errorMessage: error,
      };
    }
  }
  async showCommentById(commentId: string) {
    try {
      const comment = await this.prismaService.comment.findFirst({
        where: {
          id: commentId,
        },
      });

      return {
        response: comment,
      };
    } catch (error) {
      return {
        errorMessage: error,
      };
    }
  }

  async updateComment(commentId: string, dto: UpdateCommentDto) {
    try {
      const updatedComment = await this.prismaService.comment.update({
        where: {
          id: commentId,
        },
        data: {
          comment: dto.comment,
        },
      });

      return {
        updatedComment: ` ${updatedComment.comment} is updated`,
      };
    } catch (error) {
      return {
        errorMessage: error,
      };
    }
  }

  async deleteComment(commentId: string) {
    try {
      const comment = await this.prismaService.comment.delete({
        where: {
          id: commentId,
        },
      });
      return {
        response: `${comment.id} is deleted`,
      };
    } catch (error) {
      return {
        errorMessage: error,
      };
    }
  }
}
