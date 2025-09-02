import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum CartStatus {
  ACTIVE = 'ACTIVE',
  MERGED = 'MERGED',
  CONVERTED = 'CONVERTED',
  ABANDONED = 'ABANDONED',
  EXPIRED = 'EXPIRED'
}

export interface CartItemVariant {
  id: string;
  name: string;
  sku: string;
  stockQuantity: number;
}

export interface CartItemProduct {
  id: string;
  name: string;
  images: string[];
  isActive: boolean;
  isPublished: boolean;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  productVariantId?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  product?: CartItemProduct;
  variant?: CartItemVariant;
}

export interface Cart {
  id: string;
  userId: string;
  listingId: string;
  status: CartStatus;
  itemCount: number;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  expiresAt?: string;
  mergedFromCartId?: string;
  convertedToOrderId?: string;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}

export interface CreateCartInput {
  userId: string;
  listingId: string;
  items?: CreateCartItemInput[];
}

export interface CreateCartItemInput {
  productId: string;
  productVariantId?: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface UpdateCartItemInput {
  id: string;
  quantity?: number;
  notes?: string;
}

// ========== GRAPHQL (placeholders for future wiring) ==========
const CART_FRAGMENT = gql`
  fragment CartFragment on Cart {
    id
  }
`;

// ========== MOCK DATA ==========
const mockCartItems: CartItem[] = [
  {
    id: 'ci_1',
    cartId: 'c_1',
    productId: 'p_1',
    productVariantId: 'pv_1',
    quantity: 2,
    unitPrice: 15000,
    totalPrice: 30000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    product: { id: 'p_1', name: 'Uniform Shirt', images: [], isActive: true, isPublished: true },
    variant: { id: 'pv_1', name: 'Size M', sku: 'UNI-S-M', stockQuantity: 25 }
  }
];

const mockCart: Cart = {
  id: 'c_1',
  userId: 'u_1',
  listingId: 'l_1',
  status: CartStatus.ACTIVE,
  itemCount: mockCartItems.reduce((s, i) => s + i.quantity, 0),
  subtotal: mockCartItems.reduce((s, i) => s + i.totalPrice, 0),
  taxAmount: 0,
  shippingAmount: 0,
  discountAmount: 0,
  totalAmount: mockCartItems.reduce((s, i) => s + i.totalPrice, 0),
  currency: 'NGN',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  items: mockCartItems
};

// ========== HELPERS ==========
export function calculateCartTotals(items: CartItem[], taxRate = 0, shipping = 0, discount = 0) {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const taxAmount = subtotal * (taxRate / 100);
  const totalAmount = subtotal + taxAmount + shipping - discount;
  return { subtotal, taxAmount, shippingAmount: shipping, discountAmount: discount, totalAmount };
}

// ========== API (mocked) ==========
export async function getUserCart(userId: string, listingId?: string, accessToken?: string): Promise<Cart | null> {
  try {
    return { ...mockCart, userId, listingId: listingId || mockCart.listingId };
  } catch (err) {
    console.error('Error fetching user cart:', err);
    return null;
  }
}

export async function createCart(input: CreateCartInput, accessToken?: string): Promise<Cart> {
  try {
    const base = { ...mockCart, id: 'c_new', userId: input.userId, listingId: input.listingId };
    if (!input.items || input.items.length === 0) return base;
    const items: CartItem[] = input.items.map((i, idx) => ({
      id: `ci_new_${idx}`,
      cartId: 'c_new',
      productId: i.productId,
      productVariantId: i.productVariantId,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      totalPrice: i.quantity * i.unitPrice,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    const totals = calculateCartTotals(items);
    return { ...base, items, itemCount: items.reduce((s, it) => s + it.quantity, 0), ...totals };
  } catch (err) {
    console.error('Error creating cart:', err);
    throw err;
  }
}

export async function addCartItem(cartId: string, input: CreateCartItemInput, accessToken?: string): Promise<Cart> {
  try {
    const newItem: CartItem = {
      id: `ci_${Math.random().toString(36).slice(2, 8)}`,
      cartId,
      productId: input.productId,
      productVariantId: input.productVariantId,
      quantity: input.quantity,
      unitPrice: input.unitPrice,
      totalPrice: input.quantity * input.unitPrice,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const items = [...mockCart.items, newItem];
    const totals = calculateCartTotals(items);
    return { ...mockCart, id: cartId, items, itemCount: items.reduce((s, it) => s + it.quantity, 0), ...totals };
  } catch (err) {
    console.error('Error adding cart item:', err);
    throw err;
  }
}

export async function updateCartItem(input: UpdateCartItemInput, accessToken?: string): Promise<Cart> {
  try {
    const items = mockCart.items.map(it => (it.id === input.id ? { ...it, ...input, totalPrice: (input.quantity ?? it.quantity) * it.unitPrice, updatedAt: new Date().toISOString() } : it));
    const totals = calculateCartTotals(items);
    return { ...mockCart, items, itemCount: items.reduce((s, it) => s + it.quantity, 0), ...totals };
  } catch (err) {
    console.error('Error updating cart item:', err);
    throw err;
  }
}

export async function removeCartItem(cartId: string, itemId: string, accessToken?: string): Promise<Cart> {
  try {
    const items = mockCart.items.filter(it => it.id !== itemId);
    const totals = calculateCartTotals(items);
    return { ...mockCart, id: cartId, items, itemCount: items.reduce((s, it) => s + it.quantity, 0), ...totals };
  } catch (err) {
    console.error('Error removing cart item:', err);
    throw err;
  }
}

export async function clearCart(cartId: string, accessToken?: string): Promise<Cart> {
  try {
    return { ...mockCart, id: cartId, items: [], itemCount: 0, subtotal: 0, taxAmount: 0, shippingAmount: 0, discountAmount: 0, totalAmount: 0 };
  } catch (err) {
    console.error('Error clearing cart:', err);
    throw err;
  }
}


