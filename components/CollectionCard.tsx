import { Collection } from '@/types'
import Link from 'next/link'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.slug}`} className="group">
      <div className="card overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {collection.metadata.image && (
          <div className="aspect-video overflow-hidden bg-gray-100">
            <img 
              src={`${collection.metadata.image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={collection.metadata.name}
              width="400"
              height="225"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {collection.metadata.name}
              </h3>
              
              {collection.metadata.description && (
                <p className="text-gray-600 line-clamp-2">
                  {collection.metadata.description}
                </p>
              )}
            </div>
            
            {collection.metadata.featured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-white">
                Featured
              </span>
            )}
          </div>
          
          <div className="mt-4 flex items-center text-primary group-hover:text-primary/80 transition-colors">
            <span className="text-sm font-medium">Explore Collection</span>
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}