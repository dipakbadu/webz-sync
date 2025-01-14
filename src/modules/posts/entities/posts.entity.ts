import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  author?: string;

  @Column()
  published: Date;

  @Column('text')
  content: string;
}
