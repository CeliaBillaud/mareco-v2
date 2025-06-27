import { Reco } from "../entities/Reco";
import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { FindManyOptions } from "typeorm";
import { User } from "../entities/User";

@InputType()
class RecoInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  type: string;

  @Field()
  link?: string;

  @Field(() => ID)
  userId: number;
}

//todo create /delete / read all
@Resolver(Reco)
export default class RecoResolver {
  @Query(() => [Reco])
  async getAllRecos(): Promise<Reco[]> {
    const findOptions: FindManyOptions<Reco> = {
      relations: { user: true },
    };

    const allRecos = await Reco.find(findOptions);

    return allRecos;
  }

  @Query(() => Reco)
  async getReco(@Arg("id") id: number) {
    const reco = await Reco.findOneByOrFail({ id });
    return reco;
  }

  @Mutation(() => ID)
  async createReco(@Arg("data") data: RecoInput) {
    const user = await User.findOneByOrFail({ id: data.userId });
    const reco = Reco.create({ ...data, user });
    await reco.save();
    return reco.id;
  }

  @Mutation(() => ID)
  async updateReco(@Arg("id") id: number, @Arg("data") data: RecoInput) {
    let reco = await Reco.findOneByOrFail({ id });
    reco = Object.assign(reco, data);
    await reco.save();
    return reco.id;
  }

  @Mutation(() => ID)
  async deleteReco(@Arg("id") id: number) {
    await Reco.delete({ id });
    return id;
  }
}
