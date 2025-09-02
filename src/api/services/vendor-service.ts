import { gql } from '@apollo/client';

// ========== TYPES ==========
export interface Vendor { id: string; name: string; email: string; phone?: string; isVerified: boolean; isActive: boolean; createdAt: string; updatedAt: string }
export interface CreateVendorInput { name: string; email: string; phone?: string; isVerified: boolean; isActive: boolean }
export interface UpdateVendorInput { id: string; name?: string; email?: string; phone?: string; isVerified?: boolean; isActive?: boolean }

// ========== GRAPHQL PLACEHOLDER ==========
const VENDOR_FRAGMENT = gql`fragment VendorFragment on Vendor { id }`;

// ========== MOCK ==========
const mockVendors: Vendor[] = [
  { id: 'v_1', name: 'YoSchool Supplies', email: 'vendor@example.com', isVerified: true, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
];

// ========== API (mocked) ==========
export async function getVendors(): Promise<Vendor[]> { try { return mockVendors; } catch (err) { console.error('Error fetching vendors:', err); return mockVendors; } }
export async function getVendorById(id: string): Promise<Vendor | null> { try { return mockVendors.find(v => v.id === id) || null; } catch (err) { console.error('Error fetching vendor:', err); return null; } }
export async function createVendor(input: CreateVendorInput): Promise<Vendor> { try { return { ...mockVendors[0], id: 'v_new', ...input, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }; } catch (err) { console.error('Error creating vendor:', err); throw err; } }
export async function updateVendor(input: UpdateVendorInput): Promise<Vendor> { try { const existing = mockVendors[0]; return { ...existing, ...input, updatedAt: new Date().toISOString() }; } catch (err) { console.error('Error updating vendor:', err); throw err; } }


