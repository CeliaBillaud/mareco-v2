import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Reco } from "./Reco";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  username: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Reco, (reco) => reco.user)
  @Field(() => [Reco])
  recos: Reco[];
}
