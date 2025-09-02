import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum PaymentIntentStatus { PENDING='PENDING', PROCESSING='PROCESSING', REQUIRES_ACTION='REQUIRES_ACTION', REQUIRES_CONFIRMATION='REQUIRES_CONFIRMATION', REQUIRES_PAYMENT_METHOD='REQUIRES_PAYMENT_METHOD', CANCELED='CANCELED', SUCCEEDED='SUCCEEDED', FAILED='FAILED' }
export enum PaymentMethodType { CARD='CARD', BANK_TRANSFER='BANK_TRANSFER', MOBILE_MONEY='MOBILE_MONEY', DIGITAL_WALLET='DIGITAL_WALLET', CASH='CASH', CHECK='CHECK', OTHER='OTHER' }
export enum PaymentProvider { FLUTTERWAVE='FLUTTERWAVE', STRIPE='STRIPE', PAYPAL='PAYPAL', MPESA='MPESA', AIRTEL_MONEY='AIRTEL_MONEY', MTN_MOMO='MTN_MOMO', BANK='BANK', CASH='CASH', OTHER='OTHER' }

export interface PaymentIntent {
  id: string;
  userId: string;
  listingId: string;
  amount: number;
  currency: string;
  status: PaymentIntentStatus;
  paymentMethodType: PaymentMethodType;
  paymentProvider: PaymentProvider;
  description: string;
  metadata: Record<string, any>;
  clientSecret?: string;
  created: string;
  updated: string;
}

export interface CreatePaymentIntentInput { userId: string; listingId: string; amount: number; currency: string; paymentMethodType: PaymentMethodType; paymentProvider: PaymentProvider; description: string; metadata?: Record<string, any> }
export interface UpdatePaymentIntentInput { id: string; amount?: number; currency?: string; description?: string; metadata?: Record<string, any> }

// ========== GRAPHQL PLACEHOLDER ==========
const PAYMENT_INTENT_FRAGMENT = gql`fragment PaymentIntentFragment on PaymentIntent { id }`;

// ========== MOCK ==========
const mockPaymentIntent: PaymentIntent = {
  id: 'pi_1', userId: 'u_1', listingId: 'l_1', amount: 30000, currency: 'NGN', status: PaymentIntentStatus.SUCCEEDED,
  paymentMethodType: PaymentMethodType.MOBILE_MONEY, paymentProvider: PaymentProvider.FLUTTERWAVE, description: 'Uniform purchase', metadata: {}, clientSecret: 'secret_abc',
  created: new Date().toISOString(), updated: new Date().toISOString()
};

// ========== HELPERS ==========
export function formatPaymentAmount(amount: number, currency: string = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(amount);
}

// ========== API (mocked) ==========
export async function getPaymentIntents(): Promise<PaymentIntent[]> {
  try { return [mockPaymentIntent]; } catch (err) { console.error('Error fetching payment intents:', err); return [mockPaymentIntent]; }
}

export async function getPaymentIntentById(id: string): Promise<PaymentIntent | null> {
  try { return id === mockPaymentIntent.id ? mockPaymentIntent : null; } catch (err) { console.error('Error fetching payment intent:', err); return null; }
}

export async function createPaymentIntent(input: CreatePaymentIntentInput): Promise<PaymentIntent> {
  try { return { ...mockPaymentIntent, id: 'pi_new', ...input, status: PaymentIntentStatus.PROCESSING, created: new Date().toISOString(), updated: new Date().toISOString() }; } catch (err) { console.error('Error creating payment intent:', err); throw err; }
}

export async function updatePaymentIntent(input: UpdatePaymentIntentInput): Promise<PaymentIntent> {
  try { return { ...mockPaymentIntent, ...input, updated: new Date().toISOString() }; } catch (err) { console.error('Error updating payment intent:', err); throw err; }
}

export async function confirmPaymentIntent(id: string, paymentMethodId?: string): Promise<PaymentIntent> {
  try { return { ...mockPaymentIntent, id, status: PaymentIntentStatus.SUCCEEDED, updated: new Date().toISOString() }; } catch (err) { console.error('Error confirming payment intent:', err); throw err; }
}

export async function cancelPaymentIntent(id: string, reason?: string): Promise<PaymentIntent> {
  try { return { ...mockPaymentIntent, id, status: PaymentIntentStatus.CANCELED, updated: new Date().toISOString(), metadata: { ...mockPaymentIntent.metadata, cancelReason: reason } }; } catch (err) { console.error('Error cancelling payment intent:', err); throw err; }
}


