import { AuthenticationError, UserInputError } from 'apollo-server-express';
import Post from '../../models/PostModel.js';
import checkAuth from '../../util/auth.js';

const commentResolvers = {
  Mutation: {
    // Create Comment

    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty Comment', {
          errors: {
            body: 'Comment body must not be empty',
          },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date(),
        });
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },

    // Delete Comment

    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(c => c.id === commentId);
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else throw new AuthenticationError('Unauthorized user');
      } else throw new UserInputError('Post not found');
    },
  },
};
export default commentResolvers;
