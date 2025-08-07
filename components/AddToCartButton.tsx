'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
}

export default function AddToCartButton({ 
  product, 
  quantity = 1, 
  className = '' 
}: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    if (!product.metadata.in_stock || isAdding) return

    setIsAdding(true)
    
    try {
      // Transform product to cart item format
      const cartItem = {
        id: product.id,
        title: product.title,
        name: product.title,
        slug: product.slug,
        price: product.metadata.price || 0,
        salePrice: product.metadata.sale_price || undefined,
        image: product.metadata.images?.[0] || undefined,
        sku: product.metadata.sku
      };

      for (let i = 0; i < quantity; i++) {
        addToCart(cartItem);
      }
      
      // Brief loading state for visual feedback
      setTimeout(() => {
        setIsAdding(false)
      }, 500)
    } catch (error) {
      console.error('Error adding to cart:', error)
      setIsAdding(false)
    }
  }

  const isOutOfStock = !product.metadata.in_stock || (product.metadata.stock_quantity && product.metadata.stock_quantity < 1)
  
  return (
    <button
      onClick={handleAddToCart}
      disabled={isOutOfStock || isAdding}
      className={`
        w-full px-6 py-3 rounded-lg font-medium transition-all duration-200
        ${isOutOfStock 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : isAdding
          ? 'bg-green-500 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
        }
        ${className}
      `}
    >
      {isAdding ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Added!
        </span>
      ) : isOutOfStock ? (
        'Out of Stock'
      ) : (
        'Add to Cart'
      )}
    </button>
  )
}