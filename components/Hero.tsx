import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Quality Products,
          <span className="block">Authentic Reviews</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Discover amazing products across electronics, fashion, and home & garden. 
          Read real customer reviews to make informed decisions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/products"
            className="btn-primary bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-md transition-colors"
          >
            Shop All Products
          </Link>
          <Link 
            href="/collections/electronics"
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-semibold rounded-md transition-colors"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    </section>
  )
}