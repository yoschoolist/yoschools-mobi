import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

export enum RanklistStatus { DRAFT = 'DRAFT', PRIVATE = 'PRIVATE', PUBLIC = 'PUBLIC' }
export enum RanklistType { ACADEMIC='ACADEMIC', ARTS='ARTS', CUSTOM='CUSTOM', FACILITIES='FACILITIES', OVERALL='OVERALL', SPORTS='SPORTS', STUDENT_LIFE='STUDENT_LIFE', TEACHER_QUALITY='TEACHER_QUALITY' }

export interface CreateRanklistInput { name: string; description?: string; imageUrl?: string; imageId?: string; status?: RanklistStatus; type?: RanklistType; methodology?: string; dataStartDate?: string; dataEndDate?: string; totalSchools?: number; alias?: string; countryId?: string; regionId?: string; localityId?: string; categoryIds?: string[] }
export interface UpdateRanklistInput { name?: string; description?: string; imageUrl?: string; imageId?: string; status?: RanklistStatus; type?: RanklistType; methodology?: string; dataStartDate?: string; dataEndDate?: string; totalSchools?: number; alias?: string; countryId?: string; regionId?: string; localityId?: string; categoryIds?: string[] }
export interface CreateRanklistCriteriaInput { name: string; description?: string; weight?: number }
export interface UpdateRanklistCriteriaInput { name?: string; description?: string; weight?: number }
export interface AddListingToRanklistInput { listingId: string; rank: number; score?: number; notes?: string }
export interface UpdateRanklistListingInput { rank?: number; score?: number; notes?: string }
export interface RanklistFilterInput { search?: string; status?: RanklistStatus; type?: RanklistType; countryId?: string; regionId?: string; localityId?: string; userId?: string; categoryIds?: string[] }
export interface RanklistSortInput { name?: 'asc'|'desc'; createdAt?: 'asc'|'desc'; updatedAt?: 'asc'|'desc'; totalSchools?: 'asc'|'desc'; likeCount?: 'asc'|'desc' }

export interface RanklistCriteria { id: string; ranklistId: string; name: string; description?: string; weight: number }
export interface RanklistListing { ranklistId: string; listingId: string; rank: number; score?: number; notes?: string; listing?: { id: string; name: string; slug: string; imageUrl?: string; averageRating?: number; reviewCount?: number } }
export interface Ranklist {
  id: string; name: string; description?: string; imageUrl?: string; imageId?: string; userId: string; status: RanklistStatus; type: RanklistType; methodology?: string; dataStartDate?: string; dataEndDate?: string; totalSchools: number; createdAt: string; updatedAt: string; publishedAt?: string; likeCount: number; alias?: string; countryId?: string; regionId?: string; localityId?: string;
  user?: { id: string; firstName: string; lastName: string; email: string; profile?: { name?: string; avatar?: string } };
  country?: { id: string; name: string; code: string };
  region?: { id: string; name: string; code: string };
  locality?: { id: string; name: string; code: string };
  criteria?: RanklistCriteria[];
  listings?: RanklistListing[];
  categories?: { id: string; name: string; slug: string }[];
  likedUsers?: { userId: string; likedAt: string }[];
  isLiked?: boolean; canEdit?: boolean; isOwner?: boolean;
}

export interface RanklistResponse { ranklists: Ranklist[]; total: number; hasMore: boolean }
export interface RanklistAnalyticsResponse { averageLikesPerRanklist: number; averageListingsPerRanklist: number; privateRanklists: number; publicRanklists: number; topCategories: string[]; topCountries: string[]; totalLikes: number; totalListings: number; totalRanklists: number }

const RANKLIST_CRITERIA_FRAGMENT = gql`fragment RanklistCriteriaFragment on RanklistCriteriaDto { id name description weight ranklistId ranklist { id name } }`;
const RANKLIST_LISTING_FRAGMENT = gql`fragment RanklistListingFragment on RanklistListingDto { ranklistId listingId rank score notes listing { id name slug imageUrl averageRating reviewCount } ranklist { id name } }`;
const RANKLIST_FRAGMENT = gql`
  fragment RanklistFragment on RanklistDto {
    id name description imageUrl imageId userId status type methodology dataStartDate dataEndDate totalSchools createdAt updatedAt publishedAt likeCount alias countryId regionId localityId isLiked canEdit isOwner
    user { id firstName lastName email profile { name avatar } }
    country { id name code }
    region { id name code }
    locality { id name code }
    criteria { ...RanklistCriteriaFragment }
    listings { ...RanklistListingFragment }
    categories { id name slug }
    likedUsers { userId likedAt }
  }
  ${RANKLIST_CRITERIA_FRAGMENT}
  ${RANKLIST_LISTING_FRAGMENT}
`;

const GET_RANKLISTS_QUERY = gql`${RANKLIST_FRAGMENT} query GetRanklists($filters: RanklistFiltersInput, $pagination: PaginationInput, $sort: RanklistSortInput) { getRanklists(filters: $filters, pagination: $pagination, sort: $sort) { ranklists { ...RanklistFragment } total hasMore } }`;
const GET_RANKLIST_QUERY = gql`${RANKLIST_FRAGMENT} query GetRanklist($id: ID!) { getRanklist(id: $id) { ...RanklistFragment } }`;
const GET_RANKLIST_BY_SLUG_QUERY = gql`${RANKLIST_FRAGMENT} query GetRanklistBySlug($slug: String!) { getRanklistBySlug(slug: $slug) { ...RanklistFragment } }`;
const GET_RANKLISTS_BY_USER_QUERY = gql`${RANKLIST_FRAGMENT} query GetRanklistsByUser($userId: ID!) { getRanklistsByUser(userId: $userId) { ranklists { ...RanklistFragment } total hasMore } }`;
const GET_RANKLIST_ANALYTICS_QUERY = gql`query GetRanklistAnalytics { getRanklistAnalytics { averageLikesPerRanklist averageListingsPerRanklist privateRanklists publicRanklists topCategories topCountries totalLikes totalListings totalRanklists } }`;

const CREATE_RANKLIST_MUTATION = gql`${RANKLIST_FRAGMENT} mutation CreateRanklist($input: CreateRanklistInput!) { createRanklist(input: $input) { ...RanklistFragment } }`;
const UPDATE_RANKLIST_MUTATION = gql`${RANKLIST_FRAGMENT} mutation UpdateRanklist($id: ID!, $input: UpdateRanklistInput!) { updateRanklist(id: $id, input: $input) { ...RanklistFragment } }`;
const DELETE_RANKLIST_MUTATION = gql`mutation RemoveRanklist($id: ID!) { removeRanklist(id: $id) }`;
const PUBLISH_RANKLIST_MUTATION = gql`${RANKLIST_FRAGMENT} mutation PublishRanklist($id: ID!) { publishRanklist(id: $id) { ...RanklistFragment } }`;
const UNPUBLISH_RANKLIST_MUTATION = gql`${RANKLIST_FRAGMENT} mutation UnpublishRanklist($id: ID!) { unpublishRanklist(id: $id) { ...RanklistFragment } }`;
const DUPLICATE_RANKLIST_MUTATION = gql`${RANKLIST_FRAGMENT} mutation DuplicateRanklist($id: ID!, $name: String) { duplicateRanklist(id: $id, name: $name) { ...RanklistFragment } }`;
const LIKE_RANKLIST_MUTATION = gql`${RANKLIST_FRAGMENT} mutation LikeRanklist($id: ID!) { likeRanklist(id: $id) { ...RanklistFragment } }`;
const UNLIKE_RANKLIST_MUTATION = gql`${RANKLIST_FRAGMENT} mutation UnlikeRanklist($id: ID!) { unlikeRanklist(id: $id) { ...RanklistFragment } }`;
const ADD_RANKLIST_CRITERIA_MUTATION = gql`${RANKLIST_CRITERIA_FRAGMENT} mutation AddRanklistCriteria($input: CreateRanklistCriteriaInput!, $ranklistId: ID!) { addRanklistCriteria(input: $input, ranklistId: $ranklistId) { ...RanklistCriteriaFragment } }`;
const UPDATE_RANKLIST_CRITERIA_MUTATION = gql`${RANKLIST_CRITERIA_FRAGMENT} mutation UpdateRanklistCriteria($id: ID!, $input: UpdateRanklistCriteriaInput!) { updateRanklistCriteria(id: $id, input: $input) { ...RanklistCriteriaFragment } }`;
const DELETE_RANKLIST_CRITERIA_MUTATION = gql`mutation DeleteRanklistCriteria($criteriaId: ID!, $ranklistId: ID!) { deleteRanklistCriteria(criteriaId: $criteriaId, ranklistId: $ranklistId) }`;
const ADD_LISTING_TO_RANKLIST_MUTATION = gql`${RANKLIST_LISTING_FRAGMENT} mutation AddListingToRanklist($input: AddListingToRanklistInput!, $ranklistId: ID!) { addListingToRanklist(input: $input, ranklistId: $ranklistId) { ...RanklistListingFragment } }`;
const UPDATE_RANKLIST_LISTING_MUTATION = gql`${RANKLIST_LISTING_FRAGMENT} mutation UpdateRanklistListing($input: UpdateRanklistListingInput!, $listingId: ID!, $ranklistId: ID!) { updateRanklistListing(input: $input, listingId: $listingId, ranklistId: $ranklistId) { ...RanklistListingFragment } }`;
const REMOVE_LISTING_FROM_RANKLIST_MUTATION = gql`mutation RemoveListingFromRanklist($listingId: ID!, $ranklistId: ID!) { removeListingFromRanklist(listingId: $listingId, ranklistId: $ranklistId) }`;

export async function getRanklists(filters?: RanklistFilterInput, pagination?: { page?: number; limit?: number }, sort?: RanklistSortInput, accessToken?: string): Promise<RanklistResponse> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_RANKLISTS_QUERY, variables: { filters, pagination, sort }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data.getRanklists as RanklistResponse;
}

export async function getRanklist(id: string, accessToken?: string): Promise<Ranklist> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_RANKLIST_QUERY, variables: { id }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data.getRanklist as Ranklist;
}

export async function getRanklistBySlug(slug: string, accessToken?: string): Promise<Ranklist> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_RANKLIST_BY_SLUG_QUERY, variables: { slug }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data.getRanklistBySlug as Ranklist;
}

export async function getRanklistsByUser(userId: string, accessToken?: string): Promise<RanklistResponse> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_RANKLISTS_BY_USER_QUERY, variables: { userId }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data.getRanklistsByUser as RanklistResponse;
}

export async function getRanklistAnalytics(accessToken?: string): Promise<RanklistAnalyticsResponse> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_RANKLIST_ANALYTICS_QUERY, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data.getRanklistAnalytics as RanklistAnalyticsResponse;
}

export async function createRanklist(input: CreateRanklistInput, accessToken: string): Promise<Ranklist> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_RANKLIST_MUTATION, variables: { input }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data.createRanklist as Ranklist;
}

export async function updateRanklist(id: string, input: UpdateRanklistInput, accessToken: string): Promise<Ranklist> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_RANKLIST_MUTATION, variables: { id, input }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data.updateRanklist as Ranklist;
}

export async function deleteRanklist(id: string, accessToken: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: DELETE_RANKLIST_MUTATION, variables: { id }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data.removeRanklist as boolean;
}

export async function publishRanklist(id: string, accessToken: string): Promise<Ranklist> {
  const { data } = await apolloClient.mutate({ mutation: PUBLISH_RANKLIST_MUTATION, variables: { id }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data.publishRanklist as Ranklist;
}

export async function unpublishRanklist(id: string, accessToken: string): Promise<Ranklist> {
  const { data } = await apolloClient.mutate({ mutation: UNPUBLISH_RANKLIST_MUTATION, variables: { id }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data.unpublishRanklist as Ranklist;
}

export async function duplicateRanklist(id: string, name?: string, accessToken?: string): Promise<Ranklist> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({ mutation: DUPLICATE_RANKLIST_MUTATION, variables: { id, name }, context, errorPolicy: 'all' });
  return data.duplicateRanklist as Ranklist;
}

export async function likeRanklist(id: string, accessToken: string): Promise<Ranklist> {
  const { data } = await apolloClient.mutate({ mutation: LIKE_RANKLIST_MUTATION, variables: { id }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data.likeRanklist as Ranklist;
}

export async function unlikeRanklist(id: string, accessToken: string): Promise<Ranklist> {
  const { data } = await apolloClient.mutate({ mutation: UNLIKE_RANKLIST_MUTATION, variables: { id }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data.unlikeRanklist as Ranklist;
}

export async function addRanklistCriteria(input: CreateRanklistCriteriaInput, ranklistId: string, accessToken: string): Promise<RanklistCriteria> {
  const { data } = await apolloClient.mutate({ mutation: ADD_RANKLIST_CRITERIA_MUTATION, variables: { input, ranklistId }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data.addRanklistCriteria as RanklistCriteria;
}

export async function updateRanklistCriteria(id: string, input: UpdateRanklistCriteriaInput, accessToken: string): Promise<RanklistCriteria> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_RANKLIST_CRITERIA_MUTATION, variables: { id, input }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data.updateRanklistCriteria as RanklistCriteria;
}

export async function deleteRanklistCriteria(criteriaId: string, ranklistId: string, accessToken: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: DELETE_RANKLIST_CRITERIA_MUTATION, variables: { criteriaId, ranklistId }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data.deleteRanklistCriteria as boolean;
}

export async function addListingToRanklist(input: AddListingToRanklistInput, ranklistId: string, accessToken: string): Promise<RanklistListing> {
  const { data } = await apolloClient.mutate({ mutation: ADD_LISTING_TO_RANKLIST_MUTATION, variables: { input, ranklistId }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data.addListingToRanklist as RanklistListing;
}

export async function updateRanklistListing(input: UpdateRanklistListingInput, listingId: string, ranklistId: string, accessToken: string): Promise<RanklistListing> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_RANKLIST_LISTING_MUTATION, variables: { input, listingId, ranklistId }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data.updateRanklistListing as RanklistListing;
}

export async function removeListingFromRanklist(listingId: string, ranklistId: string, accessToken: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: REMOVE_LISTING_FROM_RANKLIST_MUTATION, variables: { listingId, ranklistId }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data.removeListingFromRanklist as boolean;
}

export async function getPublicRanklists(accessToken?: string): Promise<Ranklist[]> { const result = await getRanklists({ status: RanklistStatus.PUBLIC }, { page: 1, limit: 100 }, { createdAt: 'desc' }, accessToken); return result.ranklists; }
export async function getDraftRanklists(accessToken?: string): Promise<Ranklist[]> { const result = await getRanklists({ status: RanklistStatus.DRAFT }, { page: 1, limit: 100 }, { updatedAt: 'desc' }, accessToken); return result.ranklists; }
export async function getRanklistsByType(type: RanklistType, accessToken?: string): Promise<Ranklist[]> { const result = await getRanklists({ type, status: RanklistStatus.PUBLIC }, { page: 1, limit: 100 }, { likeCount: 'desc' }, accessToken); return result.ranklists; }
export async function searchRanklists(searchTerm: string, accessToken?: string): Promise<Ranklist[]> { const result = await getRanklists({ search: searchTerm }, { page: 1, limit: 50 }, { name: 'asc' }, accessToken); return result.ranklists; }


