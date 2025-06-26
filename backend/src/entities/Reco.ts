import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column("text")
  content: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  link: string;
}
