import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export interface ListingStats {
  totalListings: number;
  activeListings: number;
  pendingApproval: number;
  featuredListings: number;
  totalStudents: number;
  averageRating: number;
  totalViews: number;
  totalLikes: number;
}

// ========== QUERY ==========
const GET_LISTING_STATS_QUERY = gql`
  query GetListingStats {
    getListingStats {
      totalListings
      activeListings
      pendingApproval
      featuredListings
      totalStudents
      averageRating
      totalViews
      totalLikes
    }
  }
`;

// ========== SERVICE ==========
export async function getListingStats(accessToken?: string): Promise<ListingStats> {
  try {
    const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
    const { data } = await apolloClient.query({ query: GET_LISTING_STATS_QUERY, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
    if (data?.getListingStats) return data.getListingStats as ListingStats;
    throw new Error('No statistics data received');
  } catch (error) {
    console.error('Error fetching listing statistics:', error);
    return {
      totalListings: 0,
      activeListings: 0,
      pendingApproval: 0,
      featuredListings: 0,
      totalStudents: 0,
      averageRating: 0,
      totalViews: 0,
      totalLikes: 0,
    };
  }
}


