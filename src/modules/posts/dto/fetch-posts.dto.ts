import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FetchPostsDto {
  @ApiProperty({
    description: 'Search query for fetching posts',
    required: false,
    default: 'technology language:english',
  })
  @IsString()
  @IsOptional()
  query: string = 'technology language:english';

  @ApiProperty({
    description: 'Maximum number of posts to fetch',
    required: false,
    default: 200,
    minimum: 1,
  })
  @IsInt()
  @IsOptional()
  @Min(1)
  limit: number = 200;
}
