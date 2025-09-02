import { useQuery } from '@apollo/client/react';
import { useCallback } from 'react';

import { GET_LISTINGS } from '../graphql/mutations';

// ===============================
// LISTING HOOKS
// ===============================

export const useListings = (page?: number, limit?: number, filters?: any) => {
  const { data, loading, error, refetch } = useQuery(GET_LISTINGS, {
    variables: { page, limit, filters },
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  return {
    listings: data?.getListings?.listings || [],
    loading,
    error,
    refetch,
  };
};


