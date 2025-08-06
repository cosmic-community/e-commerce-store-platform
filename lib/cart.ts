import { CartItem } from '@/types'

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const price = item.salePrice ?? item.price
    return total + (price * item.quantity)
  }, 0)
}

export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function getCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved).items || [] : []
  } catch {
    return []
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return
  
  const cart = {
    items,
    total: calculateCartTotal(items),
    itemCount: calculateItemCount(items),
  }
  
  localStorage.setItem('cart', JSON.stringify(cart))
}