import commentResolvers from './commentResolver.js';
import postResolvers from './postResolver.js';
import userResolvers from './userResolver.js';

const resolvers = {
  Post: {
    likeCount: parent => parent.likes.length,
    commentCount: parent => parent.comments.length,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
  Subscription: {
    ...postResolvers.Subscription,
  },
};

export default resolvers;
