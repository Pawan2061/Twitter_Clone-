import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
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
  @Get('/:id')
  getTweetById(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.getTweetById(id);
  }
}
