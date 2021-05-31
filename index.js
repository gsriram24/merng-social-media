import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';

import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const typeDefs = gql`
	type Query {
		sayHi: String!
	}
`;

const resolvers = {
	Query: {
		sayHi: () => 'Hello World'
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.listen({ port: process.env.PORT || 5000 }).then(res => console.log(`Server running at ${res.url}`));
