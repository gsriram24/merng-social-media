import gql from 'graphql-tag';

const typeDefs = gql`
	scalar Date
	type Post {
		id: ID!
		body: String!
		createdAt: Date!
		username: String!
		comments: [Comment]!
		likes: [Like]!
	}
	type User {
		id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: Date!
	}
	type Comment {
		id: ID!
		createdAt: Date!
		username: String!
		body: String!
	}
	type Like {
		id: ID!
		createdAt: Date!
		username: String!
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}

	type Query {
		getPosts: [Post]
		getPost(postId: ID!): Post
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		createPost(body: String!): Post!
		deletePost(postId: ID): String!
		createComment(postId: ID!, body: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): Post!
		likePost(postId: ID!): Post!
	}
	type Subscription {
		newPost: Post!
	}
`;

export default typeDefs;
