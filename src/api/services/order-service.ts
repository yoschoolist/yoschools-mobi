import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum OrderStatus { PENDING='PENDING', CONFIRMED='CONFIRMED', PROCESSING='PROCESSING', SHIPPED='SHIPPED', DELIVERED='DELIVERED', CANCELLED='CANCELLED', REFUNDED='REFUNDED', PARTIALLY_REFUNDED='PARTIALLY_REFUNDED' }
export enum PaymentStatus { PENDING='PENDING', PAID='PAID', FAILED='FAILED', REFUNDED='REFUNDED', PARTIALLY_REFUNDED='PARTIALLY_REFUNDED' }
export enum FulfillmentStatus { PENDING='PENDING', PROCESSING='PROCESSING', SHIPPED='SHIPPED', DELIVERED='DELIVERED', CANCELLED='CANCELLED' }

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productVariantId?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: OrderStatus | any;
  createdAt: string;
  updatedAt: string;
}

export interface AddressInput { street: string; city: string; state?: string; country: string; postalCode?: string }

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  listingId: string;
  vendorId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  shippingAddress: AddressInput;
  billingAddress: AddressInput;
  customerEmail: string;
  customerPhone?: string;
  customerName: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface CreateOrderItemInput { productId: string; productVariantId?: string; quantity: number; unitPrice: number }
export interface CreateOrderInput { userId: string; listingId: string; vendorId: string; items: CreateOrderItemInput[]; shippingAddress: AddressInput; billingAddress: AddressInput; customerEmail: string; customerName: string; customerPhone?: string; notes?: string; shippingMethod?: string; paymentMethod?: string }
export interface UpdateOrderInput { id: string; status?: OrderStatus; paymentStatus?: PaymentStatus; fulfillmentStatus?: FulfillmentStatus; notes?: string }

// ========== GRAPHQL PLACEHOLDER ==========
const ORDER_FRAGMENT = gql`fragment OrderFragment on Order { id }`;

// ========== MOCK ==========
const mockOrder: Order = {
  id: 'o_1', orderNumber: 'YO-1001', userId: 'u_1', listingId: 'l_1', vendorId: 'v_1',
  status: OrderStatus.CONFIRMED, paymentStatus: PaymentStatus.PAID, fulfillmentStatus: FulfillmentStatus.PROCESSING,
  subtotal: 30000, taxAmount: 0, shippingAmount: 0, discountAmount: 0, totalAmount: 30000, currency: 'NGN',
  shippingAddress: { street: '1 Main St', city: 'Lagos', country: 'NG' },
  billingAddress: { street: '1 Main St', city: 'Lagos', country: 'NG' },
  customerEmail: 'user@example.com', customerName: 'User One', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  items: [{ id: 'oi_1', orderId: 'o_1', productId: 'p_1', quantity: 2, unitPrice: 15000, totalPrice: 30000, status: OrderStatus.CONFIRMED, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]
};

// ========== HELPERS ==========
export function calculateOrderTotals(items: OrderItem[], taxRate = 0, shipping = 0, discount = 0) {
  const subtotal = items.reduce((s, i) => s + i.totalPrice, 0);
  const taxAmount = subtotal * (taxRate / 100);
  const totalAmount = subtotal + taxAmount + shipping - discount;
  return { subtotal, taxAmount, shippingAmount: shipping, discountAmount: discount, totalAmount };
}

// ========== API (mocked) ==========
export async function getOrders(filter?: any, sort?: any, limit?: number, offset?: number, accessToken?: string): Promise<Order[]> {
  try { return [mockOrder]; } catch (err) { console.error('Error fetching orders:', err); return [mockOrder]; }
}

export async function getOrderById(id: string, accessToken?: string): Promise<Order | null> {
  try { return id === mockOrder.id ? mockOrder : null; } catch (err) { console.error('Error fetching order:', err); return null; }
}

export async function getOrderByNumber(orderNumber: string, accessToken?: string): Promise<Order | null> {
  try { return orderNumber === mockOrder.orderNumber ? mockOrder : null; } catch (err) { console.error('Error fetching order by number:', err); return null; }
}

export async function createOrder(input: CreateOrderInput, accessToken?: string): Promise<Order> {
  try {
    const items: OrderItem[] = input.items.map((i, idx) => ({ id: `oi_new_${idx}`, orderId: 'o_new', productId: i.productId, productVariantId: i.productVariantId, quantity: i.quantity, unitPrice: i.unitPrice, totalPrice: i.quantity * i.unitPrice, status: OrderStatus.PENDING, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
    const totals = calculateOrderTotals(items);
    return { ...mockOrder, id: 'o_new', orderNumber: 'YO-NEW', userId: input.userId, listingId: input.listingId, vendorId: input.vendorId, items, ...totals, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  } catch (err) { console.error('Error creating order:', err); throw err; }
}

export async function updateOrder(input: UpdateOrderInput, accessToken?: string): Promise<Order> {
  try { return { ...mockOrder, ...input, updatedAt: new Date().toISOString() }; } catch (err) { console.error('Error updating order:', err); throw err; }
}


