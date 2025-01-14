import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Post } from '../entities/posts.entity';
import { PostDto } from '../dto/create-posts.dto';

@Injectable()
export class PostRepository {
  private readonly repository: Repository<Post>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Post);
  }

  async savePosts(posts: PostDto[]): Promise<Post[]> {
    const postEntities = posts.map((post) => this.repository.create(post));
    return await this.repository.save(postEntities);
  }
}
