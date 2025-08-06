# E-Commerce Store Platform

![App Preview](https://imgix.cosmicjs.com/8b21afb0-731a-11f0-a051-23c10f41277a-photo-1602143407151-7111542de6e8-1754521828848.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive e-commerce website built with Next.js 15 and powered by Cosmic CMS. Features a complete product catalog, collection organization, and customer review system.

## Features

- ✨ **Product Catalog** - Browse and search through your complete product inventory
- 📚 **Collection Organization** - Products organized by categories (Electronics, Fashion, Home & Garden)
- ⭐ **Customer Reviews** - Authentic customer reviews with star ratings and verification badges
- 🎨 **Modern Design** - Clean, professional design with responsive layouts
- 🚀 **Performance Optimized** - Server-side rendering with optimized images
- 📱 **Mobile Ready** - Works perfectly on all devices and screen sizes

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=6893e07f54b8038efaf57a91&clone_repository=6893e1bad88e61992bc79b7a)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **React** - Component-based UI library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your content

### Installation

1. Install dependencies:
```bash
bun install
```

2. Set up environment variables:
Your environment variables will be automatically configured when you deploy this template.

3. Run the development server:
```bash
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

This application demonstrates various Cosmic SDK patterns:

### Fetching Products with Collections
```typescript
const products = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Include nested collection data
```

### Getting Reviews for a Product
```typescript
const reviews = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product': productId 
  })
  .depth(1) // Include nested product data
```

### Featured Collections
```typescript
const featuredCollections = await cosmic.objects
  .find({ 
    type: 'collections',
    'metadata.featured': true 
  })
```

## Cosmic CMS Integration

The application integrates with three main Cosmic object types:

- **Products** - Product catalog with images, pricing, and inventory
- **Collections** - Product categorization and organization
- **Reviews** - Customer feedback with ratings and verification

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically with each push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Configure environment variables

The application will automatically work with your existing Cosmic content structure.

<!-- README_END -->