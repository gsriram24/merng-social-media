import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

const DeleteButton = ({ postId, callback }) => {
  const [open, setOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      let newData = [...data.getPosts];
      newData = newData.filter(p => p.id !== postId);
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { ...data, getPosts: { newData } },
      });
      setOpen(false);
      if (callback) callback();
    },
    variables: {
      postId,
    },
  });
  return (
    <>
      <Button
        as='div'
        color='red'
        floated='right'
        onClick={() => setOpen(true)}
      >
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => deletePost()}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
