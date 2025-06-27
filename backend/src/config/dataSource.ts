import { Reco } from "../entities/Reco";
import { User } from "../entities/User";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();
const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;

export const dataSource = new DataSource({
  entities: [User, Reco],
  //create and modify table in bdd from my entities, in the futur : create migrations more secure
  synchronize: true,
  logging: true,

  type: "postgres",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: Number(DB_PORT),
});
