import { Product } from '@/types'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const hasDiscount = product.metadata.sale_price && product.metadata.sale_price < product.metadata.price
  const images = product.metadata.images || []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        {images.length > 0 && (
          <>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={`${images[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={product.metadata.name}
                width="400"
                height="400"
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                      alt={`${product.metadata.name} - Image ${index + 2}`}
                      width="100"
                      height="100"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.metadata.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            {hasDiscount ? (
              <>
                <span className="text-3xl font-bold text-primary">
                  ${product.metadata.sale_price}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${product.metadata.price}
                </span>
                <span className="px-2 py-1 text-sm bg-red-100 text-red-800 rounded">
                  Save ${(product.metadata.price - product.metadata.sale_price!).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                ${product.metadata.price}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.metadata.in_stock 
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {product.metadata.in_stock ? 'In Stock' : 'Out of Stock'}
            </div>
            
            <span className="text-gray-600">
              {product.metadata.stock_quantity} available
            </span>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
          <div 
            className="prose prose-gray max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.metadata.description }}
          />
        </div>
        
        {(product.metadata.sku || product.metadata.weight || product.metadata.dimensions) && (
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h2>
            <dl className="grid grid-cols-1 gap-3">
              {product.metadata.sku && (
                <div className="flex">
                  <dt className="font-medium text-gray-900 w-24">SKU:</dt>
                  <dd className="text-gray-700">{product.metadata.sku}</dd>
                </div>
              )}
              {product.metadata.weight && (
                <div className="flex">
                  <dt className="font-medium text-gray-900 w-24">Weight:</dt>
                  <dd className="text-gray-700">{product.metadata.weight} lbs</dd>
                </div>
              )}
              {product.metadata.dimensions && (
                <div className="flex">
                  <dt className="font-medium text-gray-900 w-24">Dimensions:</dt>
                  <dd className="text-gray-700">{product.metadata.dimensions}</dd>
                </div>
              )}
            </dl>
          </div>
        )}
        
        {product.metadata.collections && product.metadata.collections.length > 0 && (
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Collections</h2>
            <div className="flex flex-wrap gap-2">
              {product.metadata.collections.map((collection) => (
                <span 
                  key={collection.id}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {collection.metadata.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}