import { ApolloServer, gql } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo'
import merge from 'lodash/merge';

import UsersSchema from '../../api/users/Users.graphql';
import UsersResolvers from '../../api/users/resolvers';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';
import ResolutionsResolvers from '../../api/resolutions/resolvers';

import GoalsSchema from '../../api/goals/Goals.graphql';
import GoalsResolvers from '../../api/goals/resolvers';

//aaasdasdasdasdasd
const typeDefs = [
  ResolutionsSchema,
  UsersSchema,
  GoalsSchema,
];

const resolvers = merge(
  ResolutionsResolvers,
  UsersResolvers,
  GoalsResolvers
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  }),
   playground: true,
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql'
});

WebApp.connectHandlers.use('/graphql', (req, res) => {
  console.log(req.method);
  if (req.method === 'GET') {
    res.end()
  }
});
