# Website Integration Guide

This guide explains how to integrate your main website with the admin dashboard to dynamically fetch content and products.

## Public API Endpoints

The admin dashboard provides public API endpoints that your website can use to fetch data:

### Products API

**Get all active products:**
```
GET https://your-admin-dashboard.pages.dev/api/public/products
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "image_url": "https://pub-xxx.r2.dev/image.jpg",
    "category": "category-name",
    "status": "active",
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  }
]
```

### Content API

**Get all active content:**
```
GET https://your-admin-dashboard.pages.dev/api/public/content
```

**Get content for specific page:**
```
GET https://your-admin-dashboard.pages.dev/api/public/content/home
GET https://your-admin-dashboard.pages.dev/api/public/content/about
```

**Get content for specific page and section:**
```
GET https://your-admin-dashboard.pages.dev/api/public/content/home?section=hero
GET https://your-admin-dashboard.pages.dev/api/public/content/about?section=team
```

**Response:**
```json
[
  {
    "id": 1,
    "page": "home",
    "section": "hero",
    "title": "Welcome to Our Site",
    "content": "This is the hero content...",
    "image_url": "https://pub-xxx.r2.dev/hero-image.jpg",
    "status": "active",
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  }
]
```

## JavaScript Integration Examples

### Vanilla JavaScript

```javascript
// Fetch products
async function fetchProducts() {
  try {
    const response = await fetch('https://your-admin-dashboard.pages.dev/api/public/products');
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch content for a specific page
async function fetchPageContent(page) {
  try {
    const response = await fetch(`https://your-admin-dashboard.pages.dev/api/public/content/${page}`);
    const content = await response.json();
    return content;
  } catch (error) {
    console.error('Error fetching content:', error);
    return [];
  }
}

// Fetch specific section content
async function fetchSectionContent(page, section) {
  try {
    const response = await fetch(`https://your-admin-dashboard.pages.dev/api/public/content/${page}?section=${section}`);
    const content = await response.json();
    return content;
  } catch (error) {
    console.error('Error fetching section content:', error);
    return [];
  }
}

// Usage example
async function loadHomePage() {
  const heroContent = await fetchSectionContent('home', 'hero');
  const featuresContent = await fetchSectionContent('home', 'features');
  const products = await fetchProducts();
  
  // Update DOM with fetched content
  if (heroContent.length > 0) {
    document.getElementById('hero-title').textContent = heroContent[0].title;
    document.getElementById('hero-content').textContent = heroContent[0].content;
    if (heroContent[0].image_url) {
      document.getElementById('hero-image').src = heroContent[0].image_url;
    }
  }
  
  // Render products
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = products.map(product => `
    <div class="product">
      <img src="${product.image_url}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <span class="price">$${product.price}</span>
    </div>
  `).join('');
}
```

### React/Next.js Integration

```jsx
// hooks/useContent.js
import { useState, useEffect } from 'react';

export function useContent(page, section = null) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const url = section 
          ? `https://your-admin-dashboard.pages.dev/api/public/content/${page}?section=${section}`
          : `https://your-admin-dashboard.pages.dev/api/public/content/${page}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch content');
        
        const data = await response.json();
        setContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [page, section]);

  return { content, loading, error };
}

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('https://your-admin-dashboard.pages.dev/api/public/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

// components/HeroSection.jsx
import { useContent } from '../hooks/useContent';

export default function HeroSection() {
  const { content, loading, error } = useContent('home', 'hero');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!content.length) return null;

  const hero = content[0];

  return (
    <section className="hero">
      {hero.image_url && (
        <img src={hero.image_url} alt={hero.title} />
      )}
      <h1>{hero.title}</h1>
      <p>{hero.content}</p>
    </section>
  );
}

// components/ProductsList.jsx
import { useProducts } from '../hooks/useContent';

export default function ProductsList() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="products-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          {product.image_url && (
            <img src={product.image_url} alt={product.name} />
          )}
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <span className="price">${product.price}</span>
        </div>
      ))}
    </div>
  );
}
```

### Cloudflare Workers Integration

```javascript
// For Cloudflare Workers sites
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Example: Dynamic page rendering based on CMS content
    if (url.pathname === '/') {
      return handleHomePage();
    }
    
    return new Response('Not found', { status: 404 });
  }
};

async function handleHomePage() {
  try {
    // Fetch content from admin dashboard
    const [contentResponse, productsResponse] = await Promise.all([
      fetch('https://your-admin-dashboard.pages.dev/api/public/content/home'),
      fetch('https://your-admin-dashboard.pages.dev/api/public/products')
    ]);
    
    const content = await contentResponse.json();
    const products = await productsResponse.json();
    
    // Group content by section
    const contentBySection = content.reduce((acc, item) => {
      acc[item.section] = item;
      return acc;
    }, {});
    
    // Generate HTML
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${contentBySection.hero?.title || 'Welcome'}</title>
        </head>
        <body>
          <section class="hero">
            ${contentBySection.hero?.image_url ? `<img src="${contentBySection.hero.image_url}" alt="${contentBySection.hero.title}">` : ''}
            <h1>${contentBySection.hero?.title || ''}</h1>
            <p>${contentBySection.hero?.content || ''}</p>
          </section>
          
          <section class="products">
            <h2>Our Products</h2>
            <div class="products-grid">
              ${products.map(product => `
                <div class="product">
                  ${product.image_url ? `<img src="${product.image_url}" alt="${product.name}">` : ''}
                  <h3>${product.name}</h3>
                  <p>${product.description}</p>
                  <span class="price">$${product.price}</span>
                </div>
              `).join('')}
            </div>
          </section>
        </body>
      </html>
    `;
    
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error) {
    return new Response('Error loading page', { status: 500 });
  }
}
```

## Content Organization Best Practices

### Page Structure
Organize your content using the page/section structure:

- **home**
  - hero
  - features
  - testimonials
  - cta

- **about**
  - intro
  - team
  - history
  - values

- **services**
  - overview
  - service1
  - service2
  - pricing

### Product Categories
Use the category field to organize products:
- web-design
- ecommerce
- branding
- marketing

## Caching Recommendations

For better performance, implement caching:

```javascript
// Simple cache implementation
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchWithCache(url) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  cache.set(url, {
    data,
    timestamp: Date.now()
  });
  
  return data;
}
```

## Error Handling

Always implement proper error handling:

```javascript
async function safeApiCall(url, fallbackData = []) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    return fallbackData;
  }
}
```

## Deployment URLs

Once deployed, your API endpoints will be available at:
- Products: `https://your-admin-dashboard.pages.dev/api/public/products`
- Content: `https://your-admin-dashboard.pages.dev/api/public/content`

Replace `your-admin-dashboard.pages.dev` with your actual Cloudflare Pages domain.