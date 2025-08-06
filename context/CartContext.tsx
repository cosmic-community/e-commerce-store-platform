'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Cart, CartItem, Product } from '@/types'

interface CartContextType {
  cart: Cart
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product; quantity: number }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; cart: Cart }

interface CartState {
  cart: Cart
  isOpen: boolean
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const price = item.salePrice ?? item.price
    return total + (price * item.quantity)
  }, 0)
}

function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.cart.items.findIndex(
        item => item.id === action.product.id
      )
      
      let newItems: CartItem[]
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.cart.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        )
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: action.product.id,
          name: action.product.metadata.name,
          price: action.product.metadata.price,
          salePrice: action.product.metadata.sale_price,
          image: action.product.metadata.images?.[0],
          quantity: action.quantity,
          sku: action.product.metadata.sku,
          slug: action.product.slug,
        }
        newItems = [...state.cart.items, newItem]
      }
      
      const newCart: Cart = {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      }
      
      return {
        ...state,
        cart: newCart,
        isOpen: true,
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.cart.items.filter(item => item.id !== action.productId)
      const newCart: Cart = {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      }
      
      return {
        ...state,
        cart: newCart,
      }
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', productId: action.productId })
      }
      
      const newItems = state.cart.items.map(item =>
        item.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      )
      
      const newCart: Cart = {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      }
      
      return {
        ...state,
        cart: newCart,
      }
    }
    
    case 'CLEAR_CART': {
      return {
        ...state,
        cart: {
          items: [],
          total: 0,
          itemCount: 0,
        },
      }
    }
    
    case 'OPEN_CART': {
      return {
        ...state,
        isOpen: true,
      }
    }
    
    case 'CLOSE_CART': {
      return {
        ...state,
        isOpen: false,
      }
    }
    
    case 'LOAD_CART': {
      return {
        ...state,
        cart: action.cart,
      }
    }
    
    default:
      return state
  }
}

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: {
      items: [],
      total: 0,
      itemCount: 0,
    },
    isOpen: false,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', cart: parsedCart })
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!product.metadata.in_stock || product.metadata.stock_quantity < 1) {
      return
    }
    dispatch({ type: 'ADD_TO_CART', product, quantity })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' })
  }

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' })
  }

  const value: CartContextType = {
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isOpen: state.isOpen,
    openCart,
    closeCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}