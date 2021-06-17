import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import {
  Grid,
  Image,
  Card,
  Label,
  Button,
  Icon,
  Form,
} from 'semantic-ui-react';
import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';

const SinglePost = ({ match, history }) => {
  const postId = match.params.postId;
  const { user } = useContext(AuthContext);
  const { data } = useQuery(FETCH_POST_QUERY, { variables: { postId } });

  const [comment, setComment] = useState('');

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
    },
    variables: {
      postId: postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    history.push('/');
  }

  let postMarkup;

  if (data && data.getPost) {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;
    postMarkup = (
      <Grid style={{ marginTop: 25 }}>
        <Grid.Row>
          <Grid.Column width='2'>
            <Image
              floated='right'
              size='small'
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
          </Grid.Column>
          <Grid.Column width='10'>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton
                  id={id}
                  likes={likes}
                  likeCount={likeCount}
                  user={user}
                />
                <Button as='div' labelPosition='right' onClick={() => {}}>
                  <Button basic color='blue'>
                    <Icon name='comments' />
                  </Button>
                  <Label basic color='blue' pointing='left'>
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className='ui action input fluid'>
                      <input
                        type='text'
                        placeholder='Comment..'
                        name='comment'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                      />
                      <button
                        type='submit'
                        className='ui button teal'
                        disabled={comment.length === 0}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map(c => (
              <Card fluid key={c.id}>
                <Card.Content>
                  {user && user.username === username && (
                    <DeleteButton postId={id} commentId={c.id} />
                  )}
                  <Card.Header>{c.username}</Card.Header>
                  <Card.Meta>{moment(c.createdAt).fromNow(true)}</Card.Meta>
                  <Card.Description>{c.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else {
    postMarkup = <p>Loading Post....</p>;
  }

  return postMarkup;
};
const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default SinglePost;
