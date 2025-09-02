import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum ShippingMethod { STANDARD='STANDARD', EXPRESS='EXPRESS', NEXT_DAY='NEXT_DAY', SAME_DAY='SAME_DAY', ECONOMY='ECONOMY', PREMIUM='PREMIUM', INTERNATIONAL='INTERNATIONAL', LOCAL_PICKUP='LOCAL_PICKUP', CURBSIDE='CURBSIDE', DELIVERY='DELIVERY' }
export enum ShippingStatus { ACTIVE='ACTIVE', INACTIVE='INACTIVE', SUSPENDED='SUSPENDED', EXPIRED='EXPIRED', DRAFT='DRAFT' }

export interface ShippingProfile {
  id: string;
  listingId: string;
  name: string;
  description?: string;
  status: ShippingStatus;
  isDefault: boolean;
  shippingMethods: ShippingMethod[];
  baseShippingCost: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateShippingProfileInput { listingId: string; name: string; description?: string; status?: ShippingStatus; isDefault?: boolean; shippingMethods: ShippingMethod[]; baseShippingCost: number; currency: string }
export interface UpdateShippingProfileInput { id: string; name?: string; description?: string; status?: ShippingStatus; isDefault?: boolean; shippingMethods?: ShippingMethod[]; baseShippingCost?: number; currency?: string }

// ========== GRAPHQL PLACEHOLDER ==========
const SHIPPING_PROFILE_FRAGMENT = gql`fragment ShippingProfileFragment on ShippingProfile { id }`;

// ========== MOCK ==========
const mockShippingProfile: ShippingProfile = {
  id: 'sp_1', listingId: 'l_1', name: 'Default Shipping', status: ShippingStatus.ACTIVE, isDefault: true, shippingMethods: [ShippingMethod.STANDARD, ShippingMethod.EXPRESS], baseShippingCost: 1500, currency: 'NGN', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
};

// ========== API (mocked) ==========
export async function getShippingProfiles(listingId?: string): Promise<ShippingProfile[]> {
  try { return [listingId ? { ...mockShippingProfile, listingId } : mockShippingProfile]; } catch (err) { console.error('Error fetching shipping profiles:', err); return [mockShippingProfile]; }
}

export async function getShippingProfileById(id: string): Promise<ShippingProfile | null> {
  try { return id === mockShippingProfile.id ? mockShippingProfile : null; } catch (err) { console.error('Error fetching shipping profile:', err); return null; }
}

export async function createShippingProfile(input: CreateShippingProfileInput): Promise<ShippingProfile> {
  try { return { ...mockShippingProfile, id: 'sp_new', ...input, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }; } catch (err) { console.error('Error creating shipping profile:', err); throw err; }
}

export async function updateShippingProfile(input: UpdateShippingProfileInput): Promise<ShippingProfile> {
  try { return { ...mockShippingProfile, ...input, updatedAt: new Date().toISOString() }; } catch (err) { console.error('Error updating shipping profile:', err); throw err; }
}


