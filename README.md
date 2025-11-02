# Admin Dashboard

A Next.js admin dashboard for content and product management using Cloudflare services and Clerk authentication.

## Features

- **Authentication**: Clerk.com for secure admin access
- **Database**: Cloudflare D1 for storing products and content
- **File Storage**: Cloudflare R2 for image uploads
- **Hosting**: Cloudflare Pages/Workers
- **UI**: Next.js with Tailwind CSS

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=d1e85aae55595aca1129bc334543248a
CLOUDFLARE_DATABASE_ID=b34efe44-2975-4d4c-bbba-e7abdf12c5f6
CLOUDFLARE_R2_BUCKET_NAME=admin-dashboard-storage
CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key_here
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_key_here
CLOUDFLARE_API_TOKEN=your_api_token_here
```

### 2. Clerk Setup

1. Go to [Clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy the publishable key and secret key to your `.env.local` file
4. Configure your application settings in the Clerk dashboard

### 3. Cloudflare R2 Setup

1. Go to Cloudflare dashboard → R2 Object Storage
2. Create API tokens for R2 access
3. Update the `.env.local` file with your R2 credentials

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

### 6. Deploy to Cloudflare Pages

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler auth login

# Deploy to Cloudflare Pages
wrangler pages publish .next/static
```

## Database Schema

### Products Table
- `id`: Primary key
- `name`: Product name
- `description`: Product description
- `price`: Product price
- `image_url`: Product image URL
- `category`: Product category
- `status`: Product status (active/inactive)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Content Table
- `id`: Primary key
- `page`: Page identifier (home, about, etc.)
- `section`: Section identifier (hero, features, etc.)
- `title`: Content title
- `content`: Content text
- `image_url`: Content image URL
- `status`: Content status (active/inactive)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## API Endpoints

### Admin APIs (Protected)
- `GET /api/products` - List all products
- `POST /api/products` - Create new product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `GET /api/content` - List all content
- `POST /api/content` - Create new content
- `PUT /api/content/[id]` - Update content
- `POST /api/upload` - Upload file to R2 storage

### Public APIs (For Website Integration)
- `GET /api/public/products` - Get all active products
- `GET /api/public/content` - Get all active content
- `GET /api/public/content/[page]` - Get content for specific page
- `GET /api/public/content/[page]?section=hero` - Get specific section content

## Website Integration

The admin dashboard provides public APIs that your main website can use to fetch content and products dynamically. See [WEBSITE_INTEGRATION.md](./WEBSITE_INTEGRATION.md) for detailed integration instructions and examples.

### Quick Integration Example
```javascript
// Fetch products for your website
const products = await fetch('https://your-admin-dashboard.pages.dev/api/public/products')
  .then(res => res.json());

// Fetch homepage hero content
const heroContent = await fetch('https://your-admin-dashboard.pages.dev/api/public/content/home?section=hero')
  .then(res => res.json());
```

## Security

- All API routes are protected with Clerk authentication
- Only authenticated users can access admin functionality
- File uploads are validated and stored securely in R2

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Cloudflare D1
- **File Storage**: Cloudflare R2
- **Hosting**: Cloudflare Pages/Workers