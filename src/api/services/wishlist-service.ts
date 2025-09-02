import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export interface WishlistItemVariant { id: string; name: string; sku: string; price: number; stockQuantity: number }
export interface WishlistProduct { id: string; name: string; images: string[]; price: number; isActive: boolean; isPublished: boolean }

export interface WishlistItem {
  id: string;
  wishlistId: string;
  productId: string;
  productVariantId?: string;
  addedAt: string;
  notes?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  isAvailable: boolean;
  lastCheckedAt: string;
  createdAt: string;
  updatedAt: string;
  product?: WishlistProduct;
  variant?: WishlistItemVariant;
}

export interface Wishlist {
  id: string;
  userId: string;
  listingId: string;
  name: string;
  description?: string;
  isPublic: boolean;
  isDefault: boolean;
  itemCount: number;
  totalValue: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  items: WishlistItem[];
  user?: { id: string; name: string; email: string };
  listing?: { id: string; title: string };
}

export interface CreateWishlistInput { userId: string; listingId: string; name: string; description?: string; isPublic?: boolean; isDefault?: boolean }
export interface UpdateWishlistInput { id: string; name?: string; description?: string; isPublic?: boolean; isDefault?: boolean }
export interface CreateWishlistItemInput { wishlistId: string; productId: string; productVariantId?: string; notes?: string; priority?: 'LOW' | 'MEDIUM' | 'HIGH' }
export interface UpdateWishlistItemInput { id: string; notes?: string; priority?: 'LOW' | 'MEDIUM' | 'HIGH' }
export interface WishlistFilterInput { userId?: string; listingId?: string; isPublic?: boolean; isDefault?: boolean; search?: string }
export interface WishlistSortInput { field?: 'name' | 'itemCount' | 'totalValue' | 'createdAt' | 'updatedAt'; order?: 'ASC' | 'DESC' }

// ========== FRAGMENTS ==========
const WISHLIST_ITEM_FRAGMENT = gql`
  fragment WishlistItemFragment on WishlistItem {
    id
    wishlistId
    productId
    productVariantId
    addedAt
    notes
    priority
    isAvailable
    lastCheckedAt
    createdAt
    updatedAt
    product { id name images price isActive isPublished }
    variant { id name sku price stockQuantity }
  }
`;

const WISHLIST_FRAGMENT = gql`
  fragment WishlistFragment on Wishlist {
    id
    userId
    listingId
    name
    description
    isPublic
    isDefault
    itemCount
    totalValue
    currency
    createdAt
    updatedAt
    items { ...WishlistItemFragment }
    user { id name email }
    listing { id title }
  }
`;

// ========== QUERIES ==========
const GET_WISHLISTS_QUERY = gql`
  ${WISHLIST_FRAGMENT}
  query GetWishlists($filter: WishlistFilterInput, $sort: WishlistSortInput, $limit: Int, $offset: Int) {
    getWishlists(filter: $filter, sort: $sort, limit: $limit, offset: $offset) { ...WishlistFragment }
  }
`;

const GET_WISHLIST_BY_ID_QUERY = gql`
  ${WISHLIST_FRAGMENT}
  query GetWishlistById($id: String!) { getWishlist(id: $id) { ...WishlistFragment } }
`;

const GET_USER_WISHLISTS_QUERY = gql`
  ${WISHLIST_FRAGMENT}
  query GetUserWishlists($userId: String!, $listingId: String) {
    getUserWishlists(userId: $userId, listingId: $listingId) { ...WishlistFragment }
  }
`;

const GET_PUBLIC_WISHLISTS_QUERY = gql`
  ${WISHLIST_FRAGMENT}
  query GetPublicWishlists($listingId: String, $limit: Int, $offset: Int) {
    getPublicWishlists(listingId: $listingId, limit: $limit, offset: $offset) { ...WishlistFragment }
  }
`;

const GET_WISHLIST_STATS_QUERY = gql`
  query GetWishlistStats {
    getWishlistStats {
      totalWishlists
      publicWishlists
      privateWishlists
      totalItems
      averageItemsPerWishlist
      totalValue
      averageValuePerWishlist
      wishlistsByVisibility { visibility count percentage }
      itemsByPriority { priority count percentage }
      wishlistsByDay { date count items }
    }
  }
`;

// ========== MUTATIONS ==========
const CREATE_WISHLIST_MUTATION = gql`
  ${WISHLIST_FRAGMENT}
  mutation CreateWishlist($input: CreateWishlistInput!) { createWishlist(input: $input) { ...WishlistFragment } }
`;

const UPDATE_WISHLIST_MUTATION = gql`
  ${WISHLIST_FRAGMENT}
  mutation UpdateWishlist($input: UpdateWishlistInput!) { updateWishlist(input: $input) { ...WishlistFragment } }
`;

const DELETE_WISHLIST_MUTATION = gql`
  mutation DeleteWishlist($id: String!) { deleteWishlist(id: $id) }
`;

const ADD_WISHLIST_ITEM_MUTATION = gql`
  ${WISHLIST_FRAGMENT}
  mutation AddWishlistItem($input: CreateWishlistItemInput!) { addWishlistItem(input: $input) { ...WishlistFragment } }
`;

const UPDATE_WISHLIST_ITEM_MUTATION = gql`
  ${WISHLIST_FRAGMENT}
  mutation UpdateWishlistItem($input: UpdateWishlistItemInput!) { updateWishlistItem(input: $input) { ...WishlistFragment } }
`;

const REMOVE_WISHLIST_ITEM_MUTATION = gql`
  ${WISHLIST_FRAGMENT}
  mutation RemoveWishlistItem($wishlistId: String!, $itemId: String!) { removeWishlistItem(wishlistId: $wishlistId, itemId: $itemId) { ...WishlistFragment } }
`;

const MOVE_WISHLIST_ITEM_MUTATION = gql`
  ${WISHLIST_FRAGMENT}
  mutation MoveWishlistItem($itemId: String!, $targetWishlistId: String!) { moveWishlistItem(itemId: $itemId, targetWishlistId: $targetWishlistId) { ...WishlistFragment } }
`;

const DUPLICATE_WISHLIST_ITEM_MUTATION = gql`
  ${WISHLIST_FRAGMENT}
  mutation DuplicateWishlistItem($itemId: String!, $targetWishlistId: String!) { duplicateWishlistItem(itemId: $itemId, targetWishlistId: $targetWishlistId) { ...WishlistFragment } }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getWishlists(filter?: WishlistFilterInput, sort?: WishlistSortInput, limit?: number, offset?: number, accessToken?: string): Promise<Wishlist[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_WISHLISTS_QUERY, variables: { filter, sort, limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getWishlists || []) as Wishlist[];
}

export async function getWishlistById(id: string, accessToken?: string): Promise<Wishlist | null> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_WISHLIST_BY_ID_QUERY, variables: { id }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getWishlist || null) as Wishlist | null;
}

export async function getUserWishlists(userId: string, listingId?: string, accessToken?: string): Promise<Wishlist[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_USER_WISHLISTS_QUERY, variables: { userId, listingId }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getUserWishlists || []) as Wishlist[];
}

export async function getPublicWishlists(listingId?: string, limit?: number, offset?: number, accessToken?: string): Promise<Wishlist[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_PUBLIC_WISHLISTS_QUERY, variables: { listingId, limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getPublicWishlists || []) as Wishlist[];
}

export async function getWishlistStats(accessToken?: string): Promise<any> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_WISHLIST_STATS_QUERY, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data?.getWishlistStats as any;
}

export async function createWishlist(input: CreateWishlistInput, accessToken?: string): Promise<Wishlist> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_WISHLIST_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.createWishlist as Wishlist;
}

export async function updateWishlist(input: UpdateWishlistInput, accessToken?: string): Promise<Wishlist> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_WISHLIST_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.updateWishlist as Wishlist;
}

export async function deleteWishlist(id: string, accessToken?: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: DELETE_WISHLIST_MUTATION, variables: { id }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.deleteWishlist === true;
}

export async function addWishlistItem(input: CreateWishlistItemInput, accessToken?: string): Promise<Wishlist> {
  const { data } = await apolloClient.mutate({ mutation: ADD_WISHLIST_ITEM_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.addWishlistItem as Wishlist;
}

export async function updateWishlistItem(input: UpdateWishlistItemInput, accessToken?: string): Promise<Wishlist> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_WISHLIST_ITEM_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.updateWishlistItem as Wishlist;
}

export async function removeWishlistItem(wishlistId: string, itemId: string, accessToken?: string): Promise<Wishlist> {
  const { data } = await apolloClient.mutate({ mutation: REMOVE_WISHLIST_ITEM_MUTATION, variables: { wishlistId, itemId }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.removeWishlistItem as Wishlist;
}

export async function moveWishlistItem(itemId: string, targetWishlistId: string, accessToken?: string): Promise<Wishlist> {
  const { data } = await apolloClient.mutate({ mutation: MOVE_WISHLIST_ITEM_MUTATION, variables: { itemId, targetWishlistId }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.moveWishlistItem as Wishlist;
}

export async function duplicateWishlistItem(itemId: string, targetWishlistId: string, accessToken?: string): Promise<Wishlist> {
  const { data } = await apolloClient.mutate({ mutation: DUPLICATE_WISHLIST_ITEM_MUTATION, variables: { itemId, targetWishlistId }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.duplicateWishlistItem as Wishlist;
}

// ========== HELPERS ==========
export function getWishlistVisibilityColor(isPublic: boolean): string { return isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'; }
export function getWishlistVisibilityText(isPublic: boolean): string { return isPublic ? 'Public' : 'Private'; }
export function getPriorityColor(priority: string): string { if (priority === 'HIGH') return 'bg-red-100 text-red-800'; if (priority === 'MEDIUM') return 'bg-yellow-100 text-yellow-800'; if (priority === 'LOW') return 'bg-green-100 text-green-800'; return 'bg-gray-100 text-gray-800'; }
export function getPriorityText(priority: string): string { if (priority === 'HIGH') return 'High'; if (priority === 'MEDIUM') return 'Medium'; if (priority === 'LOW') return 'Low'; return 'Unknown'; }
export function formatWishlistValue(value: number, currency: string = 'UGX'): string { return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase(), minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value); }
export function calculateWishlistValue(items: WishlistItem[]): number { return items.reduce((sum, item) => sum + (item.variant?.price || item.product?.price || 0), 0); }
export function validateWishlistInput(input: CreateWishlistInput): string[] { const errors: string[] = []; if (!input.userId) errors.push('User ID is required'); if (!input.listingId) errors.push('Listing ID is required'); if (!input.name || input.name.trim().length === 0) errors.push('Wishlist name is required'); return errors; }
export function validateWishlistItemInput(input: CreateWishlistItemInput): string[] { const errors: string[] = []; if (!input.wishlistId) errors.push('Wishlist ID is required'); if (!input.productId) errors.push('Product ID is required'); return errors; }
export function isItemAvailable(item: WishlistItem): boolean { return item.isAvailable && !!(item.product?.isActive && item.product?.isPublished) && (item.variant ? item.variant.stockQuantity > 0 : true); }
export function getItemAvailabilityColor(item: WishlistItem): string { return isItemAvailable(item) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'; }
export function getItemAvailabilityText(item: WishlistItem): string { return isItemAvailable(item) ? 'Available' : 'Unavailable'; }
export function sortWishlistItemsByPriority(items: WishlistItem[]): WishlistItem[] { const order = { HIGH: 3, MEDIUM: 2, LOW: 1 } as const; return [...items].sort((a, b) => (order[b.priority] || 0) - (order[a.priority] || 0)); }
export function sortWishlistItemsByDate(items: WishlistItem[]): WishlistItem[] { return [...items].sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()); }
export function getWishlistItemCount(wishlist: Wishlist): number { return wishlist.items?.length || 0 }
export function getWishlistTotalValue(wishlist: Wishlist): number { return wishlist.totalValue || 0 }


