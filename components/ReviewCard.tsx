import { Review } from '@/types'
import StarRating from '@/components/StarRating'
import Link from 'next/link'

interface ReviewCardProps {
  review: Review
  showProduct?: boolean
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const rating = parseInt(review.metadata.rating.key)
  const reviewDate = new Date(review.metadata.review_date).toLocaleDateString()

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
            {review.metadata.customer_name.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              {review.metadata.customer_name}
            </h4>
            <p className="text-sm text-gray-500">{reviewDate}</p>
          </div>
        </div>
        
        {review.metadata.verified_purchase && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            ✓ Verified Purchase
          </span>
        )}
      </div>
      
      <div className="mb-3">
        <StarRating rating={rating} />
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2">
        {review.metadata.review_title}
      </h3>
      
      <p className="text-gray-700 mb-4 line-clamp-3">
        {review.metadata.review_text}
      </p>
      
      {showProduct && review.metadata.product && (
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500 mb-1">Reviewed product:</p>
          <Link 
            href={`/products/${review.metadata.product.slug}`}
            className="text-primary hover:text-primary/80 font-medium text-sm"
          >
            {review.metadata.product.metadata.name}
          </Link>
        </div>
      )}
    </div>
  )
}