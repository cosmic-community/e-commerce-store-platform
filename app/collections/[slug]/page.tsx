// app/collections/[slug]/page.tsx
import { getCollectionBySlug, getProductsByCollection } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import { Metadata } from 'next'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    return {
      title: 'Collection Not Found',
    }
  }

  return {
    title: `${collection.metadata.name} - E-Commerce Store`,
    description: collection.metadata.description || `Shop the ${collection.metadata.name} collection.`,
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  const products = await getProductsByCollection(collection.id)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Collection Header */}
        <div className="text-center mb-12">
          {collection.metadata.image && (
            <div className="mb-8">
              <img 
                src={`${collection.metadata.image.imgix_url}?w=1200&h=300&fit=crop&auto=format,compress`}
                alt={collection.metadata.name}
                width="600"
                height="150"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {collection.metadata.name}
          </h1>
          
          {collection.metadata.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {collection.metadata.description}
            </p>
          )}
          
          <div className="mt-4">
            <span className="text-sm text-gray-500">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </span>
          </div>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No products in this collection yet
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