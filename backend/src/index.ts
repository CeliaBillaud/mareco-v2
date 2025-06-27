import { buildSchema } from "type-graphql";
import { dataSource } from "./config/dataSource";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import RecoResolver from "./resolvers/RecoResolver";
import UserResolver from "./resolvers/UserResolver";

const startServer = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [UserResolver, RecoResolver],
  });
  const apolloServer = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port: 3000 },
  });
  console.info("Server started on " + url);
};
startServer();
