import { useQuery } from '@apollo/client/react';
import { useCallback } from 'react';

import { GET_JOBS, GET_JOB_BY_ID, GET_FEATURED_JOBS, SEARCH_JOBS } from '../graphql/queries';
import type { JobsResponse, JobResponse, FeaturedJobsResponse, SearchJobsResponse } from '../graphql/types';

// ===============================
// JOB HOOKS
// ===============================

export const useJobs = (where?: any, orderBy?: any, skip?: number, take?: number) => {
  const { data, loading, error, refetch, fetchMore } = useQuery<JobsResponse>(GET_JOBS, {
    variables: { where, orderBy, skip, take },
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const loadMore = useCallback(() => {
    if (data?.getJobs?.edges && fetchMore) {
      return fetchMore({
        variables: {
          skip: data.getJobs.edges.length,
          take,
        },
      });
    }
  }, [data, fetchMore, take]);

  return {
    jobs: data?.getJobs?.edges?.map((edge: any) => edge.node) || [],
    pageInfo: data?.getJobs?.pageInfo,
    totalCount: data?.getJobs?.totalCount || 0,
    loading,
    error,
    refetch,
    loadMore,
  };
};

export const useJob = (id: string) => {
  const { data, loading, error, refetch } = useQuery<JobResponse>(GET_JOB_BY_ID, {
    variables: { id },
    errorPolicy: 'all',
    skip: !id,
  });

  return {
    job: data?.getJob,
    loading,
    error,
    refetch,
  };
};

export const useFeaturedJobs = (take: number = 10) => {
  const { data, loading, error, refetch } = useQuery<FeaturedJobsResponse>(GET_FEATURED_JOBS, {
    variables: { take },
    errorPolicy: 'all',
  });

  return {
    jobs: data?.getFeaturedJobs?.edges?.map((edge: any) => edge.node) || [],
    loading,
    error,
    refetch,
  };
};

export const useSearchJobs = (searchInput: any) => {
  const { data, loading, error, refetch } = useQuery<SearchJobsResponse>(SEARCH_JOBS, {
    variables: { searchInput },
    errorPolicy: 'all',
    skip: !searchInput?.query,
  });

  return {
    jobs: data?.searchJobs?.jobs || [],
    totalCount: data?.searchJobs?.totalCount || 0,
    suggestions: data?.searchJobs?.suggestions || [],
    filters: data?.searchJobs?.filters || [],
    loading,
    error,
    refetch,
  };
};
