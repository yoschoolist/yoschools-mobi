import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

export enum ResourceType {
  ART_SUPPLIES = 'ART_SUPPLIES',
  DIGITAL_TOOL = 'DIGITAL_TOOL',
  FURNITURE = 'FURNITURE',
  LAB_EQUIPMENT = 'LAB_EQUIPMENT',
  LIBRARY_RESOURCE = 'LIBRARY_RESOURCE',
  OTHER = 'OTHER',
  SPORTS_EQUIPMENT = 'SPORTS_EQUIPMENT',
  TECHNOLOGY = 'TECHNOLOGY',
  TEXTBOOK = 'TEXTBOOK'
}

export interface ResourceVendor { id: string; name: string }
export interface ResourceTag { id: string; name: string }

export interface Resource {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: ResourceType;
  categoryId?: string;
  listingId?: string;
  campusId?: string;
  quantity?: number;
  availability: boolean;
  vendorId?: string;
  photoId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category?: { id: string; name: string; slug: string };
  listing?: { id: string; name: string; slug: string };
  campus?: { id: string; name: string; location?: string };
  vendor?: ResourceVendor;
  photo?: { id: string; imageUrl: string; caption?: string };
  tags?: ResourceTag[];
}

export interface CreateResourceInput {
  name: string; slug: string; description?: string; type: ResourceType; categoryId?: string; listingId?: string; campusId?: string; quantity?: number; availability?: boolean; vendorId?: string; photoId?: string; isActive?: boolean;
}
export interface UpdateResourceInput {
  name?: string; slug?: string; description?: string; type?: ResourceType; categoryId?: string; listingId?: string; campusId?: string; quantity?: number; availability?: boolean; vendorId?: string; photoId?: string; isActive?: boolean;
}
export interface ResourceFilterInput { search?: string; type?: ResourceType; categoryId?: string; listingId?: string; campusId?: string; vendorId?: string; availability?: boolean; isActive?: boolean; minQuantity?: number; maxQuantity?: number }
export interface ResourceSortInput { name?: 'asc' | 'desc'; type?: 'asc' | 'desc'; quantity?: 'asc' | 'desc'; availability?: 'asc' | 'desc'; isActive?: 'asc' | 'desc'; createdAt?: 'asc' | 'desc'; updatedAt?: 'asc' | 'desc' }
export interface ResourceResponse { resources: Resource[]; total: number; page: number; limit: number; hasMore: boolean }
export interface ResourceAnalytics { totalResources: number; activeResources: number; availableResources: number; resourcesByType: Record<string, number>; resourcesByCategory: Record<string, number>; averageQuantity: number; totalValue: number }

const RESOURCE_FRAGMENT = gql`
  fragment ResourceFragment on Resource { id name slug description type categoryId listingId campusId quantity availability vendorId photoId isActive createdAt updatedAt category { id name slug } listing { id name slug } campus { id name location } vendor { id name } photo { id imageUrl caption } tags { id name } }
`;

const GET_RESOURCES_QUERY = gql`
  ${RESOURCE_FRAGMENT}
  query GetResources($page: Int, $limit: Int, $filters: ResourceFilterInput, $sort: ResourceSortInput) {
    getResources(page: $page, limit: $limit, filters: $filters, sort: $sort) { resources { ...ResourceFragment } total page limit hasMore }
  }
`;

const GET_RESOURCE_QUERY = gql`
  ${RESOURCE_FRAGMENT}
  query GetResource($id: ID!) { getResource(id: $id) { ...ResourceFragment } }
`;

const GET_RESOURCES_BY_TYPE_QUERY = gql`
  ${RESOURCE_FRAGMENT}
  query GetResourcesByType($type: ResourceType!, $page: Int, $limit: Int) { getResourcesByType(type: $type, page: $page, limit: $limit) { resources { ...ResourceFragment } total page limit hasMore } }
`;

const GET_RESOURCES_BY_CATEGORY_QUERY = gql`
  ${RESOURCE_FRAGMENT}
  query GetResourcesByCategory($categoryId: ID!, $page: Int, $limit: Int) { getResourcesByCategory(categoryId: $categoryId, page: $page, limit: $limit) { resources { ...ResourceFragment } total page limit hasMore } }
`;

const GET_RESOURCES_BY_LISTING_QUERY = gql`
  ${RESOURCE_FRAGMENT}
  query GetResourcesByListing($listingId: ID!, $page: Int, $limit: Int) { getResourcesByListing(listingId: $listingId, page: $page, limit: $limit) { resources { ...ResourceFragment } total page limit hasMore } }
`;

const GET_RESOURCES_BY_CAMPUS_QUERY = gql`
  ${RESOURCE_FRAGMENT}
  query GetResourcesByCampus($campusId: ID!, $page: Int, $limit: Int) { getResourcesByCampus(campusId: $campusId, page: $page, limit: $limit) { resources { ...ResourceFragment } total page limit hasMore } }
`;

const GET_RESOURCE_ANALYTICS_QUERY = gql`
  query GetResourceAnalytics($filters: ResourceFilterInput) { getResourceAnalytics(filters: $filters) { totalResources activeResources availableResources resourcesByType resourcesByCategory averageQuantity totalValue } }
`;

const SEARCH_RESOURCES_QUERY = gql`
  ${RESOURCE_FRAGMENT}
  query SearchResources($query: String!, $page: Int, $limit: Int, $filters: ResourceFilterInput) { searchResources(query: $query, page: $page, limit: $limit, filters: $filters) { resources { ...ResourceFragment } total page limit hasMore } }
`;

const CREATE_RESOURCE_MUTATION = gql`
  ${RESOURCE_FRAGMENT}
  mutation CreateResource($input: CreateResourceInput!) { createResource(input: $input) { ...ResourceFragment } }
`;
const UPDATE_RESOURCE_MUTATION = gql`
  ${RESOURCE_FRAGMENT}
  mutation UpdateResource($id: ID!, $input: UpdateResourceInput!) { updateResource(id: $id, input: $input) { ...ResourceFragment } }
`;
const DELETE_RESOURCE_MUTATION = gql`mutation DeleteResource($id: ID!) { deleteResource(id: $id) }`;
const BULK_DELETE_RESOURCES_MUTATION = gql`mutation BulkDeleteResources($ids: [ID!]!) { bulkDeleteResources(ids: $ids) }`;
const TOGGLE_RESOURCE_AVAILABILITY_MUTATION = gql`
  ${RESOURCE_FRAGMENT}
  mutation ToggleResourceAvailability($id: ID!) { toggleResourceAvailability(id: $id) { ...ResourceFragment } }
`;
const TOGGLE_RESOURCE_ACTIVE_STATUS_MUTATION = gql`
  ${RESOURCE_FRAGMENT}
  mutation ToggleResourceActiveStatus($id: ID!) { toggleResourceActiveStatus(id: $id) { ...ResourceFragment } }
`;
const UPDATE_RESOURCE_QUANTITY_MUTATION = gql`
  ${RESOURCE_FRAGMENT}
  mutation UpdateResourceQuantity($id: ID!, $quantity: Int!) { updateResourceQuantity(id: $id, quantity: $quantity) { ...ResourceFragment } }
`;

export async function getResources(page: number = 1, limit: number = 10, filters?: ResourceFilterInput, sort?: ResourceSortInput): Promise<ResourceResponse> {
  const { data } = await apolloClient.query({ query: GET_RESOURCES_QUERY, variables: { page, limit, filters, sort } });
  return data.getResources as ResourceResponse;
}

export async function getResource(id: string): Promise<Resource> {
  const { data } = await apolloClient.query({ query: GET_RESOURCE_QUERY, variables: { id } });
  return data.getResource as Resource;
}

export async function getResourcesByType(type: ResourceType, page: number = 1, limit: number = 10): Promise<ResourceResponse> {
  const { data } = await apolloClient.query({ query: GET_RESOURCES_BY_TYPE_QUERY, variables: { type, page, limit } });
  return data.getResourcesByType as ResourceResponse;
}

export async function getResourcesByCategory(categoryId: string, page: number = 1, limit: number = 10): Promise<ResourceResponse> {
  const { data } = await apolloClient.query({ query: GET_RESOURCES_BY_CATEGORY_QUERY, variables: { categoryId, page, limit } });
  return data.getResourcesByCategory as ResourceResponse;
}

export async function getResourcesByListing(listingId: string, page: number = 1, limit: number = 10): Promise<ResourceResponse> {
  const { data } = await apolloClient.query({ query: GET_RESOURCES_BY_LISTING_QUERY, variables: { listingId, page, limit } });
  return data.getResourcesByListing as ResourceResponse;
}

export async function getResourcesByCampus(campusId: string, page: number = 1, limit: number = 10): Promise<ResourceResponse> {
  const { data } = await apolloClient.query({ query: GET_RESOURCES_BY_CAMPUS_QUERY, variables: { campusId, page, limit } });
  return data.getResourcesByCampus as ResourceResponse;
}

export async function getResourceAnalytics(filters?: ResourceFilterInput): Promise<ResourceAnalytics> {
  const { data } = await apolloClient.query({ query: GET_RESOURCE_ANALYTICS_QUERY, variables: { filters } });
  return data.getResourceAnalytics as ResourceAnalytics;
}

export async function searchResources(queryText: string, page: number = 1, limit: number = 10, filters?: ResourceFilterInput): Promise<ResourceResponse> {
  const { data } = await apolloClient.query({ query: SEARCH_RESOURCES_QUERY, variables: { query: queryText, page, limit, filters } });
  return data.searchResources as ResourceResponse;
}

export async function createResource(input: CreateResourceInput): Promise<Resource> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_RESOURCE_MUTATION, variables: { input } });
  return data.createResource as Resource;
}

export async function updateResource(id: string, input: UpdateResourceInput): Promise<Resource> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_RESOURCE_MUTATION, variables: { id, input } });
  return data.updateResource as Resource;
}

export async function deleteResource(id: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: DELETE_RESOURCE_MUTATION, variables: { id } });
  return data.deleteResource as boolean;
}

export async function bulkDeleteResources(ids: string[]): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: BULK_DELETE_RESOURCES_MUTATION, variables: { ids } });
  return data.bulkDeleteResources as boolean;
}

export async function toggleResourceAvailability(id: string): Promise<Resource> {
  const { data } = await apolloClient.mutate({ mutation: TOGGLE_RESOURCE_AVAILABILITY_MUTATION, variables: { id } });
  return data.toggleResourceAvailability as Resource;
}

export async function toggleResourceActiveStatus(id: string): Promise<Resource> {
  const { data } = await apolloClient.mutate({ mutation: TOGGLE_RESOURCE_ACTIVE_STATUS_MUTATION, variables: { id } });
  return data.toggleResourceActiveStatus as Resource;
}

export async function updateResourceQuantity(id: string, quantity: number): Promise<Resource> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_RESOURCE_QUANTITY_MUTATION, variables: { id, quantity } });
  return data.updateResourceQuantity as Resource;
}

export function getResourceTypeLabel(type: ResourceType): string { return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()); }
export function getResourceTypeColor(type: ResourceType): string { switch (type) { case ResourceType.TEXTBOOK: return 'bg-blue-100 text-blue-800'; case ResourceType.TECHNOLOGY: return 'bg-purple-100 text-purple-800'; case ResourceType.LAB_EQUIPMENT: return 'bg-green-100 text-green-800'; case ResourceType.SPORTS_EQUIPMENT: return 'bg-orange-100 text-orange-800'; case ResourceType.ART_SUPPLIES: return 'bg-pink-100 text-pink-800'; case ResourceType.FURNITURE: return 'bg-indigo-100 text-indigo-800'; case ResourceType.LIBRARY_RESOURCE: return 'bg-teal-100 text-teal-800'; case ResourceType.DIGITAL_TOOL: return 'bg-cyan-100 text-cyan-800'; case ResourceType.OTHER: return 'bg-gray-100 text-gray-800'; default: return 'bg-gray-100 text-gray-800'; } }
export function getAvailabilityStatus(availability: boolean): { label: string; color: string } { return availability ? { label: 'Available', color: 'bg-green-100 text-green-800' } : { label: 'Unavailable', color: 'bg-red-100 text-red-800' }; }
export function getActiveStatus(isActive: boolean): { label: string; color: string } { return isActive ? { label: 'Active', color: 'bg-green-100 text-green-800' } : { label: 'Inactive', color: 'bg-red-100 text-red-800' }; }


