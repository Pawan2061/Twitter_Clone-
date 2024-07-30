import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { TweetService } from './tweets.service';
import { CreateTweetDto } from './dto/createTweet.dto';
import { Public } from 'src/common/public.decorator';

@Controller('tweets')
export class TweetsController {
  constructor(private tweetService: TweetService) {}

  @Post('/create')
  createTweet(@Body() dto: CreateTweetDto, @Req() req: any) {
    return this.tweetService.createTweet(dto, req.user);
  }

  @Public()
  @Get('')
  getTweets() {
    return this.tweetService.getTweets();
  }

  @Public()
  @Get('/:id')
  getTweetById(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.getTweetById(id);
  }

  @Delete('/:id')
  deleteTweet(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.deleteTweet(id);
  }

  @Patch('/:id/liked')
  likeTweet(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.tweetService.likeTweet(id, req.user);
  }

  @Patch('/:id/removeLike')
  dislikeTweet(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.tweetService.dislikeTweet(id, req.user);
  }

  @Patch('/:id/save')
  saveTweet(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.tweetService.saveTweet(id, req.user);
  }
}
