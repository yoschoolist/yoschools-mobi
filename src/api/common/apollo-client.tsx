import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { getPlatformGraphQLUrl } from './client';
import { getTokenForApollo } from '../graphql/auth';

// Create the http link
const httpLink = createHttpLink({
  uri: getPlatformGraphQLUrl(),
});

// Auth link to add authentication headers
const authLink = setContext(async (_, { headers }) => {
  // Get token from storage
  const token = getTokenForApollo();

  return {
    headers: {
      ...headers,
      authorization: token?.access ? `Bearer ${token.access}` : '',
      'Content-Type': 'application/json',
    },
  };
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Add field policies for pagination if needed
          // jobs: {
          //   keyArgs: false,
          //   merge(existing = [], incoming) {
          //     return [...existing, ...incoming];
          //   },
          // },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
  // Add error handling for client initialization
  connectToDevTools: __DEV__,
});



export default apolloClient;
