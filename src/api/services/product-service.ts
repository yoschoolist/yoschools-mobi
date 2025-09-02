import { gql } from '@apollo/client';

// ========== TYPES ==========
export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  comparePrice?: number;
  stockQuantity: number;
  isActive: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  categoryId: string;
  vendorId: string;
  listingId: string;
  brand?: string;
  model?: string;
  isActive: boolean;
  isPublished: boolean;
  isFeatured: boolean;
  tags: string[];
  images: string[];
  documents: string[];
  specifications: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  category?: ProductCategory;
  variants?: ProductVariant[];
}

export interface CreateProductInput {
  name: string;
  description: string;
  shortDescription?: string;
  categoryId: string;
  vendorId: string;
  listingId: string;
  brand?: string;
  model?: string;
  isActive: boolean;
  isPublished: boolean;
  isFeatured: boolean;
  tags?: string[];
  images?: string[];
  documents?: string[];
  specifications?: Record<string, any>;
}

export interface UpdateProductInput {
  id: string;
  name?: string;
  description?: string;
  shortDescription?: string;
  categoryId?: string;
  vendorId?: string;
  listingId?: string;
  brand?: string;
  model?: string;
  isActive?: boolean;
  isPublished?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  images?: string[];
  documents?: string[];
  specifications?: Record<string, any>;
}

export interface ProductFilterInput {
  listingId?: string;
  vendorId?: string;
  categoryId?: string;
  isActive?: boolean;
  isPublished?: boolean;
  isFeatured?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
}

export interface ProductSortInput { field?: 'name' | 'price' | 'createdAt' | 'updatedAt' | 'stockQuantity'; order?: 'ASC' | 'DESC' }

// ========== GRAPHQL PLACEHOLDERS ==========
const PRODUCT_FRAGMENT = gql`fragment ProductFragment on Product { id }`;

// ========== MOCK DATA ==========
const mockProducts: Product[] = [
  {
    id: 'p_1',
    name: 'Uniform Shirt',
    description: 'Comfortable cotton school uniform shirt',
    shortDescription: 'Cotton shirt',
    categoryId: 'pc_1',
    vendorId: 'v_1',
    listingId: 'l_1',
    brand: 'YoBrand',
    model: 'YS-01',
    isActive: true,
    isPublished: true,
    isFeatured: true,
    tags: ['uniform', 'shirt'],
    images: [],
    documents: [],
    specifications: { material: 'cotton', color: 'blue' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    variants: [
      { id: 'pv_1', productId: 'p_1', name: 'Size M', sku: 'UNI-S-M', price: 15000, stockQuantity: 25, isActive: true },
      { id: 'pv_2', productId: 'p_1', name: 'Size L', sku: 'UNI-S-L', price: 16000, stockQuantity: 10, isActive: true }
    ]
  }
];

// ========== API (mocked) ==========
export async function getProducts(filter?: ProductFilterInput, sort?: ProductSortInput, limit?: number, offset?: number, accessToken?: string): Promise<Product[]> {
  try {
    let res = [...mockProducts];
    if (filter?.search) {
      const s = filter.search.toLowerCase();
      res = res.filter(p => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
    }
    if (filter?.categoryId) res = res.filter(p => p.categoryId === filter.categoryId);
    if (limit !== undefined) res = res.slice(offset || 0, (offset || 0) + limit);
    return res;
  } catch (err) {
    console.error('Error fetching products:', err);
    return mockProducts;
  }
}

export async function getProductById(id: string, accessToken?: string): Promise<Product | null> {
  try {
    return mockProducts.find(p => p.id === id) || null;
  } catch (err) {
    console.error('Error fetching product:', err);
    return null;
  }
}

export async function createProduct(input: CreateProductInput, accessToken?: string): Promise<Product> {
  try {
    return { ...mockProducts[0], id: 'p_new', ...input, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  } catch (err) {
    console.error('Error creating product:', err);
    throw err;
  }
}

export async function updateProduct(input: UpdateProductInput, accessToken?: string): Promise<Product> {
  try {
    const existing = mockProducts.find(p => p.id === input.id) || mockProducts[0];
    return { ...existing, ...input, updatedAt: new Date().toISOString() };
  } catch (err) {
    console.error('Error updating product:', err);
    throw err;
  }
}

export async function deleteProduct(id: string, accessToken?: string): Promise<boolean> {
  try {
    return true;
  } catch (err) {
    console.error('Error deleting product:', err);
    throw err;
  }
}


