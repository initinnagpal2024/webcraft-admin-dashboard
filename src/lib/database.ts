export interface Product {
  id?: number;
  name: string;
  description?: string;
  price?: number;
  image_url?: string;
  category?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Content {
  id?: number;
  page: string;
  section: string;
  title?: string;
  content?: string;
  image_url?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID;

export async function queryDatabase(sql: string, params?: any[]) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${CLOUDFLARE_DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sql,
      params: params || []
    })
  });

  const data = await response.json();
  return data;
}

export async function getProducts(): Promise<Product[]> {
  const result = await queryDatabase('SELECT * FROM products ORDER BY created_at DESC');
  return result.result[0]?.results || [];
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
  const sql = `INSERT INTO products (name, description, price, image_url, category, status) 
               VALUES (?, ?, ?, ?, ?, ?) 
               RETURNING *`;
  const params = [product.name, product.description, product.price, product.image_url, product.category, product.status || 'active'];
  
  const result = await queryDatabase(sql, params);
  return result.result[0]?.results[0];
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  const sql = `UPDATE products SET 
               name = COALESCE(?, name),
               description = COALESCE(?, description),
               price = COALESCE(?, price),
               image_url = COALESCE(?, image_url),
               category = COALESCE(?, category),
               status = COALESCE(?, status),
               updated_at = CURRENT_TIMESTAMP
               WHERE id = ? 
               RETURNING *`;
  const params = [product.name, product.description, product.price, product.image_url, product.category, product.status, id];
  
  const result = await queryDatabase(sql, params);
  return result.result[0]?.results[0];
}

export async function deleteProduct(id: number): Promise<boolean> {
  const sql = 'DELETE FROM products WHERE id = ?';
  const result = await queryDatabase(sql, [id]);
  return result.success;
}

export async function getContent(): Promise<Content[]> {
  const result = await queryDatabase('SELECT * FROM content ORDER BY page, section');
  return result.result[0]?.results || [];
}

export async function createContent(content: Omit<Content, 'id' | 'created_at' | 'updated_at'>): Promise<Content> {
  const sql = `INSERT INTO content (page, section, title, content, image_url, status) 
               VALUES (?, ?, ?, ?, ?, ?) 
               RETURNING *`;
  const params = [content.page, content.section, content.title, content.content, content.image_url, content.status || 'active'];
  
  const result = await queryDatabase(sql, params);
  return result.result[0]?.results[0];
}

export async function updateContent(id: number, content: Partial<Content>): Promise<Content> {
  const sql = `UPDATE content SET 
               page = COALESCE(?, page),
               section = COALESCE(?, section),
               title = COALESCE(?, title),
               content = COALESCE(?, content),
               image_url = COALESCE(?, image_url),
               status = COALESCE(?, status),
               updated_at = CURRENT_TIMESTAMP
               WHERE id = ? 
               RETURNING *`;
  const params = [content.page, content.section, content.title, content.content, content.image_url, content.status, id];
  
  const result = await queryDatabase(sql, params);
  return result.result[0]?.results[0];
}