import React from 'react';

export const GraphQLProvider = (props: { children: React.ReactNode }) => {
  // Temporarily disable Apollo Client to isolate the issue
  return <>{props.children}</>;
};
