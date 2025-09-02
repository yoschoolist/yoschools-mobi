import { ApolloProvider } from '@apollo/client/react';
import React from 'react';

import { apolloClient } from './apollo-client';

interface ApolloProviderWrapperProps {
  children: React.ReactNode;
}

export function ApolloProviderWrapper({ children }: ApolloProviderWrapperProps) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
}
