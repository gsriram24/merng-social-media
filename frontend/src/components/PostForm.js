import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../utils/graphql';
import { useForm } from '../utils/hooks';

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallBack, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      let newData = [...data.getPosts];
      newData = [result.data.getPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { ...data, getPosts: { newData } },
      });
      values.body = '';
    },
  });
  function createPostCallBack() {
    createPost();
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="What's on your mind?"
            name='body'
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type='submit' color='teal'>
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className='ui error message'>
          <ul className='list'>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};
const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        createdAt
      }
      commentCount
    }
  }
`;
export default PostForm;
