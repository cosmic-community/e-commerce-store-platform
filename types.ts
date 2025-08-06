// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
}

// Product interface
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name: string;
    description: string;
    price: number;
    sale_price?: number | null;
    images: Array<{
      url: string;
      imgix_url: string;
    }>;
    stock_quantity: number;
    in_stock: boolean;
    collections?: Collection[];
    sku?: string;
    weight?: number;
    dimensions?: string;
  };
}

// Collection interface
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    name: string;
    description?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
    featured: boolean;
  };
}

// Review interface
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    product: Product;
    customer_name: string;
    rating: {
      key: string;
      value: string;
    };
    review_title: string;
    review_text: string;
    verified_purchase: boolean;
    review_date: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}

// Utility types
export type ProductWithReviews = Product & {
  reviews?: Review[];
};

export type CreateReviewData = Omit<Review, 'id' | 'created_at' | 'modified_at'>;