import { IsNotEmpty, isNotEmpty, IsString, isString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  comment: string;
}
