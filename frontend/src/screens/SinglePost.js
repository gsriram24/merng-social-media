import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import moment from 'moment';
import React, { useContext } from 'react';
import { Grid, Image, Card, Label, Button, Icon } from 'semantic-ui-react';
import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';

const SinglePost = ({ match, history }) => {
  const postId = match.params.postId;
  const { user } = useContext(AuthContext);
  const { data } = useQuery(FETCH_POST_QUERY, { variables: { postId } });

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

export default SinglePost;
