import { ApolloServer, PubSub } from 'apollo-server';
import dotenv from 'dotenv';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const pubsub = new PubSub();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req, pubsub })
});

server.listen({ port: process.env.PORT || 5000 }).then(res => console.log(`Server running at ${res.url}`));
