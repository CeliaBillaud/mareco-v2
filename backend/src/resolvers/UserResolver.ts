import { User } from "../entities/User";
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

@InputType()
class UserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

//todo create /delete / read
@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  async getAllUser(): Promise<User[]> {
    const findOptions: FindManyOptions<User> = {
      relations: { recos: true },
    };

    const allUsers = await User.find(findOptions);

    return allUsers;
  }

  @Query(() => User)
  async getUser(@Arg("id") id: number) {
    const user = await User.findOneByOrFail({ id });
    return user;
  }

  @Mutation(() => ID)
  async createUser(@Arg("data") data: UserInput) {
    // Le spread "casse" l'instance de classe pour créer un objet simple que TypeORM peut utiliser.
    const user = User.create({ ...data });
    await user.save();
    return user.id;
  }

  @Mutation(() => ID)
  async updateUser(@Arg("id") id: number, @Arg("data") data: UserInput) {
    let user = await User.findOneByOrFail({ id });
    user = Object.assign(user, { ...data });
    await user.save();
    return user.id;
  }

  @Mutation(() => ID)
  async deleteUser(@Arg("id") id: number) {
    await User.delete({ id });
    return id;
  }
}
