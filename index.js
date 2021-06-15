import { ApolloServer, PubSub } from 'apollo-server-express';
import dotenv from 'dotenv';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import connectDB from './config/db.js';
import express from 'express';
import path from 'path';
dotenv.config();
connectDB();

const app = express();

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
server.applyMiddleware({ app, cors: corsOptions });

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
);

await new Promise(resolve =>
  app.listen({ port: process.env.PORT || 5000 }, resolve)
);
console.log(
  `🚀 Server ready at http://localhost:${process.env.PORT || 5000}${
    server.graphqlPath
  }`
);
