import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export interface Review {
  id: string;
  reviewerId: string;
  reviewerName?: string;
  reviewerType: string;
  listingId?: string;
  campusId?: string;
  facilityId?: string;
  curriculumId?: string;
  courseId?: string;
  rating: number;
  comment?: string;
  academicRating?: number;
  facilitiesRating?: number;
  teachingRating?: number;
  environmentRating?: number;
  approvalStatus: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
  reviewer: { id: string; firstName: string; lastName: string; email: string; profile?: { name?: string; avatar?: string } };
  listingName?: string;
  listingSlug?: string;
  listingAverageRating?: number;
}

export interface CreateReviewInput {
  listingId?: string;
  campusId?: string;
  facilityId?: string;
  curriculumId?: string;
  courseId?: string;
  rating: number;
  comment?: string;
  reviewerName?: string;
  reviewerType: string;
  academicRating?: number;
  facilitiesRating?: number;
  teachingRating?: number;
  environmentRating?: number;
}

export interface UpdateReviewInput {
  id: string;
  rating?: number;
  comment?: string;
  academicRating?: number;
  facilitiesRating?: number;
  teachingRating?: number;
  environmentRating?: number;
}

export interface ReviewFilters {
  listingId?: string;
  campusId?: string;
  facilityId?: string;
  curriculumId?: string;
  courseId?: string;
  reviewerId?: string;
  reviewerType?: string;
  approvalStatus?: string;
  minRating?: number;
  maxRating?: number;
  isVerified?: boolean;
  minHelpfulCount?: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface ReviewConnection { reviews: Review[]; totalCount: number; hasMore: boolean }

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Array<{ rating: number; count: number; percentage: number }>;
  averageAcademicRating?: number;
  averageFacilitiesRating?: number;
  averageTeachingRating?: number;
  averageEnvironmentRating?: number;
}

// ========== QUERIES ==========
const GET_REVIEWS_QUERY = gql`
  query GetReviews($filters: ReviewFiltersInput) {
    getReviews(filters: $filters) {
      reviews {
        id reviewerId reviewerName reviewerType listingId campusId facilityId curriculumId courseId rating comment academicRating facilitiesRating teachingRating environmentRating approvalStatus approvedAt rejectedAt rejectionReason isVerified helpfulCount createdAt updatedAt reviewer { id firstName lastName email profile { name avatar } } listingName listingSlug listingAverageRating
      }
      totalCount
      hasMore
    }
  }
`;

const GET_REVIEW_BY_ID_QUERY = gql`
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id reviewerId reviewerName reviewerType listingId campusId facilityId curriculumId courseId rating comment academicRating facilitiesRating teachingRating environmentRating approvalStatus approvedAt rejectedAt rejectionReason isVerified helpfulCount createdAt updatedAt reviewer { id firstName lastName email profile { name avatar } } listingName listingSlug listingAverageRating
    }
  }
`;

const GET_REVIEW_STATS_QUERY = gql`
  query GetReviewStats($listingId: ID!) {
    getReviewStats(listingId: $listingId) {
      totalReviews averageRating ratingDistribution { rating count percentage } averageAcademicRating averageFacilitiesRating averageTeachingRating averageEnvironmentRating
    }
  }
`;

const GET_PENDING_REVIEWS_QUERY = gql`
  query GetPendingReviews($skip: Int, $take: Int) {
    getPendingReviews(skip: $skip, take: $take) {
      reviews { id reviewerId reviewerName reviewerType listingId rating comment approvalStatus createdAt reviewer { id firstName lastName email } listingName listingSlug }
      totalCount
      hasMore
    }
  }
`;

const GET_VERIFIED_REVIEWS_QUERY = gql`
  query GetVerifiedReviews($skip: Int, $take: Int) {
    getVerifiedReviews(skip: $skip, take: $take) {
      reviews { id reviewerId reviewerName reviewerType listingId rating comment approvalStatus isVerified createdAt reviewer { id firstName lastName email } listingName listingSlug }
      totalCount
      hasMore
    }
  }
`;

// ========== MUTATIONS ==========
const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview($input: CreateReviewInput!) { createReview(input: $input) { id rating comment approvalStatus createdAt } }
`;

const UPDATE_REVIEW_MUTATION = gql`
  mutation UpdateReview($input: UpdateReviewInput!) { updateReview(input: $input) { id rating comment academicRating facilitiesRating teachingRating environmentRating updatedAt } }
`;

const ADMIN_UPDATE_REVIEW_MUTATION = gql`
  mutation AdminUpdateReview($input: UpdateReviewInput!) { adminUpdateReview(input: $input) { id rating comment academicRating facilitiesRating teachingRating environmentRating updatedAt } }
`;

const DELETE_REVIEW_MUTATION = gql`
  mutation DeleteReview($id: ID!) { deleteReview(id: $id) }
`;

const MODERATE_REVIEW_MUTATION = gql`
  mutation ModerateReview($id: ID!, $approvalStatus: ApprovalStatus!, $rejectionReason: String) { moderateReview(id: $id, approvalStatus: $approvalStatus, rejectionReason: $rejectionReason) { id approvalStatus rejectionReason approvedAt rejectedAt } }
`;

const VERIFY_REVIEW_MUTATION = gql`
  mutation VerifyReview($id: ID!) { verifyReview(id: $id) { id isVerified } }
`;

const UNVERIFY_REVIEW_MUTATION = gql`
  mutation UnverifyReview($id: ID!) { unverifyReview(id: $id) { id isVerified } }
`;

const MARK_REVIEW_HELPFUL_MUTATION = gql`
  mutation MarkReviewHelpful($reviewId: ID!) { markReviewHelpful(reviewId: $reviewId) }
`;

// ========== SERVICE ==========
export async function getReviews(filters?: ReviewFilters, accessToken?: string): Promise<ReviewConnection> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_REVIEWS_QUERY, variables: { filters }, context, errorPolicy: 'all' });
  if (!data?.getReviews) throw new Error('Failed to fetch reviews');
  return data.getReviews as ReviewConnection;
}

export async function getReviewById(id: string, accessToken?: string): Promise<Review> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_REVIEW_BY_ID_QUERY, variables: { id }, context, errorPolicy: 'all' });
  if (!data?.getReview) throw new Error('Review not found');
  return data.getReview as Review;
}

export async function getReviewStats(listingId: string, accessToken?: string): Promise<ReviewStats> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_REVIEW_STATS_QUERY, variables: { listingId }, context, errorPolicy: 'all' });
  if (!data?.getReviewStats) throw new Error('Failed to fetch review stats');
  return data.getReviewStats as ReviewStats;
}

export async function getPendingReviews(skip: number = 0, take: number = 10, accessToken?: string): Promise<ReviewConnection> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_PENDING_REVIEWS_QUERY, variables: { skip, take }, context, errorPolicy: 'all' });
  if (!data?.getPendingReviews) throw new Error('Failed to fetch pending reviews');
  return data.getPendingReviews as ReviewConnection;
}

export async function getVerifiedReviews(skip: number = 0, take: number = 10, accessToken?: string): Promise<ReviewConnection> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_VERIFIED_REVIEWS_QUERY, variables: { skip, take }, context, errorPolicy: 'all' });
  if (!data?.getVerifiedReviews) throw new Error('Failed to fetch verified reviews');
  return data.getVerifiedReviews as ReviewConnection;
}

export async function createReview(input: CreateReviewInput, accessToken?: string): Promise<Review> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_REVIEW_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  if (!data?.createReview) throw new Error('Failed to create review');
  return data.createReview as Review;
}

export async function updateReview(input: UpdateReviewInput, accessToken?: string): Promise<Review> {
  const { data } = await apolloClient.mutate({ mutation: ADMIN_UPDATE_REVIEW_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  if (!data?.adminUpdateReview) throw new Error('Failed to update review');
  return data.adminUpdateReview as Review;
}

export async function deleteReview(id: string, accessToken?: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: DELETE_REVIEW_MUTATION, variables: { id }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  if (data?.deleteReview === undefined) throw new Error('Failed to delete review');
  return data.deleteReview as boolean;
}

export async function moderateReview(id: string, approvalStatus: string, rejectionReason?: string, accessToken?: string): Promise<Review> {
  const { data } = await apolloClient.mutate({ mutation: MODERATE_REVIEW_MUTATION, variables: { id, approvalStatus, rejectionReason }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  if (!data?.moderateReview) throw new Error('Failed to moderate review');
  return data.moderateReview as Review;
}

export async function verifyReview(id: string, accessToken?: string): Promise<Review> {
  const { data } = await apolloClient.mutate({ mutation: VERIFY_REVIEW_MUTATION, variables: { id }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  if (!data?.verifyReview) throw new Error('Failed to verify review');
  return data.verifyReview as Review;
}

export async function unverifyReview(id: string, accessToken?: string): Promise<Review> {
  const { data } = await apolloClient.mutate({ mutation: UNVERIFY_REVIEW_MUTATION, variables: { id }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  if (!data?.unverifyReview) throw new Error('Failed to unverify review');
  return data.unverifyReview as Review;
}

export async function markReviewHelpful(reviewId: string, accessToken?: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: MARK_REVIEW_HELPFUL_MUTATION, variables: { reviewId }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  if (data?.markReviewHelpful === undefined) throw new Error('Failed to mark review as helpful');
  return data.markReviewHelpful as boolean;
}


