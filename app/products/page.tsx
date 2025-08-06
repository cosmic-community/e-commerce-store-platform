import { getAllProducts } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products - E-Commerce Store',
  description: 'Browse our complete collection of quality products across electronics, fashion, and home & garden categories.',
}

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of quality items
          </p>
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No products available
            </h2>
            <p className="text-gray-600">
              Check back soon for new products!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}