import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Accounts } from 'meteor/accounts-base';

import { withApollo } from 'react-apollo';

import ResolutionForm from './ResolutionForm';
import RegisterForm from './RegisterForm';
import GoalForm from './GoalForm';
import LoginForm from './LoginForm';
import Goal from './Resolutions/Goal';

const App = ({loading, resolutions, client, user}) => {
  if (loading) return null;
  return (
    <div>
      { !!user._id ? (
        <button onClick={() => {
          Meteor.logout()
          client.resetStore();
        }}>Sair</button>
      ) : (
        <div>
          <RegisterForm client={client} />
          <LoginForm client={client} />
        </div>
      )}
      <ResolutionForm />
      <ul>
        {resolutions.map(resolution => (
          <li key={resolution._id}>
            <span style={{
              textDecoration: resolution.completed ? 'line-through' : ''
            }}>
              {resolution.name}
            </span>
            <ul>
              {resolution.goals.map( goal => <Goal goal={goal} key={goal._id}/> )}
            </ul>
            <GoalForm resolutionId={resolution._id} />
          </li>
        ))}
      </ul>
    </div>
  )
};

const resolutionQuery = gql`
  query Resolutions{
    resolutions {
      _id
      name
      completed
      goals {
        _id
        name
        completed
      }
    }
    user {
      _id
      email
    }
  }
`;

export default graphql(resolutionQuery, {
  props: ({data}) => ({...data}),
  options: {pollInterval: 5000}
})(withApollo(App));
