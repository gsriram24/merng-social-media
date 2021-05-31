import postResolvers from './postResolver.js';
import userResolvers from './userResolver.js';

const resolvers = {
	Query: {
		...postResolvers.Query
	},
	Mutation: {
		...userResolvers.Mutation,
		...postResolvers.Mutation
	}
};

export default resolvers;
