import gql from 'graphql-tag';

const typeDefs = gql`
	scalar Date
	type Post {
		id: ID!
		body: String!
		createdAt: Date!
		username: String!
	}
	type User {
		id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: Date!
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}

	type Query {
		getPosts: [Post]
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
	}
`;

export default typeDefs;
