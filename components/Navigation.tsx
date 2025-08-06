'use client'

import Link from 'next/link'
import CartIcon from './CartIcon'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Store
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Products
            </Link>
            <Link 
              href="/collections" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Collections
            </Link>
          </div>
          
          {/* Cart Icon */}
          <div className="flex items-center">
            <CartIcon />
          </div>
        </div>
      </div>
    </nav>
  )
}