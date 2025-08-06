import { getAllProducts, getFeaturedCollections, getAllReviews } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import CollectionCard from '@/components/CollectionCard'
import ReviewCard from '@/components/ReviewCard'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const [products, featuredCollections, reviews] = await Promise.all([
    getAllProducts(),
    getFeaturedCollections(),
    getAllReviews()
  ])

  const featuredProducts = products.slice(0, 6)
  const recentReviews = reviews.slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      {/* Featured Collections */}
      {featuredCollections.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Collections
              </h2>
              <p className="text-lg text-gray-600">
                Explore our curated product collections
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCollections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600">
                Discover our most popular items
              </p>
            </div>
            
            <ProductGrid products={featuredProducts} />
          </div>
        </section>
      )}

      {/* Recent Reviews */}
      {recentReviews.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-lg text-gray-600">
                Read authentic reviews from verified customers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}