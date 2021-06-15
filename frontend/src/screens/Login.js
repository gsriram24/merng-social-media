import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';

const Login = ({ history }) => {
  const [errors, setErrors] = useState({});
  const initialState = {
    username: '',
    password: '',
  };
  const { values, onChange, onSubmit } = useForm(
    loginUserCallback,
    initialState
  );

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1 className='page-title'>Login</h1>
        <Form.Input
          label='Username'
          placeholder='Username...'
          name='username'
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label='Password'
          placeholder='Password...'
          name='password'
          type='password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
