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
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

@InputType()
class NewUserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
class UserInput {
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
  async updateUser(@Arg("id") id: number, @Arg("data") data: NewUserInput) {
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

  @Mutation(() => ID)
  async signup(@Arg("data") data: NewUserInput) {
    const hashedPassword = await argon2.hash(data.password);
    const user = User.create({ ...data, hashedPassword });
    await user.save();
    const payload = {
      id: user.id,
    };
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error("Missing env variable : JWT_SECRET");
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    // return user.id;
    return token;
  }

  @Mutation(() => ID)
  async login(@Arg("data") data: UserInput) {
    const user = await User.findOneOrFail({ where: { email: data.email } });
    const isValid = await argon2.verify(user.hashedPassword, data.password);
    if (!isValid) throw new Error("Invalid password");

    const payload = {
      id: user.id,
    };
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error("Missing env variable : JWT_SECRET");
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    return token;
  }
}
