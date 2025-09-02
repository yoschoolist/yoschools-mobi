import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum PaymentMethodType { BANK_ACCOUNT='BANK_ACCOUNT', MOBILE_MONEY='MOBILE_MONEY', DIGITAL_WALLET='DIGITAL_WALLET', CASH_PICKUP='CASH_PICKUP', CHECK='CHECK', WIRE_TRANSFER='WIRE_TRANSFER', CRYPTO='CRYPTO', OTHER='OTHER' }
export enum PaymentMethodStatus { ACTIVE='ACTIVE', INACTIVE='INACTIVE', PENDING_VERIFICATION='PENDING_VERIFICATION', VERIFICATION_FAILED='VERIFICATION_FAILED', SUSPENDED='SUSPENDED', EXPIRED='EXPIRED' }
export enum VerificationStatus { UNVERIFIED='UNVERIFIED', PENDING='PENDING', VERIFIED='VERIFIED', FAILED='FAILED', EXPIRED='EXPIRED' }

export interface VendorPaymentMethod {
  id: string;
  vendorId: string;
  type: PaymentMethodType;
  status: PaymentMethodStatus;
  verificationStatus: VerificationStatus;
  name: string;
  isDefault: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVendorPaymentMethodInput { vendorId: string; type: PaymentMethodType; name: string; isDefault?: boolean }
export interface UpdateVendorPaymentMethodInput { id: string; name?: string; status?: PaymentMethodStatus; isDefault?: boolean }

// ========== GRAPHQL PLACEHOLDER ==========
const VENDOR_PAYMENT_METHOD_FRAGMENT = gql`fragment VendorPaymentMethodFragment on VendorPaymentMethod { id }`;

// ========== MOCK ==========
const mockVpm: VendorPaymentMethod = { id: 'vpm_1', vendorId: 'v_1', type: PaymentMethodType.MOBILE_MONEY, status: PaymentMethodStatus.ACTIVE, verificationStatus: VerificationStatus.VERIFIED, name: 'MTN MoMo', isDefault: true, isVerified: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };

// ========== API (mocked) ==========
export async function getVendorPaymentMethods(vendorId?: string): Promise<VendorPaymentMethod[]> { try { return [vendorId ? { ...mockVpm, vendorId } : mockVpm]; } catch (err) { console.error('Error fetching vendor payment methods:', err); return [mockVpm]; } }
export async function getVendorPaymentMethodById(id: string): Promise<VendorPaymentMethod | null> { try { return id === mockVpm.id ? mockVpm : null; } catch (err) { console.error('Error fetching vendor payment method:', err); return null; } }
export async function createVendorPaymentMethod(input: CreateVendorPaymentMethodInput): Promise<VendorPaymentMethod> { try { return { ...mockVpm, id: 'vpm_new', ...input, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }; } catch (err) { console.error('Error creating vendor payment method:', err); throw err; } }
export async function updateVendorPaymentMethod(input: UpdateVendorPaymentMethodInput): Promise<VendorPaymentMethod> { try { return { ...mockVpm, ...input, updatedAt: new Date().toISOString() }; } catch (err) { console.error('Error updating vendor payment method:', err); throw err; } }


