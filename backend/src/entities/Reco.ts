import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class Reco extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column({ length: 200 })
  title: string;

  @Field()
  @Column("text")
  content: string;

  @Field()
  @Column({ length: 50 })
  type: string;

  @Field()
  @Column({ nullable: true })
  link?: string;

  // @Field()
  // @Column()
  // image?: string;

  //une Reco appartient à un Utilisteur
  @ManyToOne(() => User, (user) => user.recos, { eager: true })
  @Field(() => User)
  user: User;
}
