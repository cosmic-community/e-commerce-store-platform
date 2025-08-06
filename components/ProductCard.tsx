import { Product } from '@/types'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.metadata.images?.[0]
  const hasDiscount = product.metadata.sale_price && product.metadata.sale_price < product.metadata.price

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="card overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {mainImage && (
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img 
              src={`${mainImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={product.metadata.name}
              width="300"
              height="300"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.metadata.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-lg font-bold text-primary">
                    ${product.metadata.sale_price}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.metadata.price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  ${product.metadata.price}
                </span>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              {product.metadata.in_stock ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </div>
          
          {product.metadata.collections && product.metadata.collections.length > 0 && (
            <div className="mt-2">
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                {product.metadata.collections[0].metadata.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}