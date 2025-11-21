# React Frontend Integration Guide

## Backend Setup (Already Done ✅)

Your backend now has REST API endpoints at `/api/*` that work with React.

### API Endpoints Available:
- `/api/auth/*` - Authentication
- `/api/products/*` - Products
- `/api/cart/*` - Shopping cart
- `/api/sellers/*` - Sellers

## Create React Frontend

### 1. Create React App (in a new folder)

```bash
# In your project root, create a new React app
npx create-vite@latest greencart-frontend --template react
cd greencart-frontend
npm install
```

### 2. Install Required Packages

```bash
npm install axios react-router-dom
```

### 3. Update .env in Backend

Add to your backend `.env` file:
```
FRONTEND_URL=http://localhost:5173
```

### 4. Create API Service (src/services/api.js)

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for session cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me')
};

export const products = {
  getAll: (params) => api.get('/products', { params }),
  getOne: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  addReview: (id, data) => api.post(`/products/${id}/reviews`, data)
};

export const cart = {
  get: () => api.get('/cart'),
  add: (productId, quantity) => api.post('/cart/add', { productId, quantity }),
  update: (productId, quantity) => api.put(`/cart/update/${productId}`, { quantity }),
  remove: (productId) => api.delete(`/cart/remove/${productId}`),
  clear: () => api.delete('/cart/clear'),
  checkout: (data) => api.post('/cart/checkout', data)
};

export const sellers = {
  getAll: () => api.get('/sellers'),
  getOne: (id) => api.get(`/sellers/${id}`),
  addReview: (id, data) => api.post(`/sellers/${id}/reviews`, data),
  getDashboard: () => api.get('/sellers/dashboard/stats')
};

export default api;
```

### 5. Example React Component (src/pages/Products.jsx)

```javascript
import { useState, useEffect } from 'react';
import { products } from '../services/api';

function Products() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    tags: []
  });

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await products.getAll(filters);
      setProductList(response.data.products);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await cart.add(productId, 1);
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="products-page">
      <h1>Products</h1>
      
      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
        
        <select
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
        >
          <option value="">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Personal Care">Personal Care</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {productList.map(product => (
          <div key={product._id} className="product-card">
            <img src={`http://localhost:3000${product.images[0]}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product._id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
```

### 6. Example Login Component (src/pages/Login.jsx)

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.login(formData);
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
```

### 7. App Router Setup (src/App.jsx)

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Sellers from './pages/Sellers';
import SellerProfile from './pages/SellerProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/sellers/:id" element={<SellerProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## Running Both Servers

### Terminal 1 - Backend
```bash
cd backend-projet
npm start
# Runs on http://localhost:3000
```

### Terminal 2 - Frontend
```bash
cd greencart-frontend
npm run dev
# Runs on http://localhost:5173
```

## Important Notes

1. **CORS is enabled** - Backend accepts requests from `http://localhost:5173`
2. **Credentials are included** - Session cookies work across domains
3. **Images** - Prepend `http://localhost:3000` to image URLs
4. **File uploads** - Use FormData for product images

## Example File Upload

```javascript
const handleAddProduct = async (formData) => {
  const data = new FormData();
  data.append('name', formData.name);
  data.append('description', formData.description);
  data.append('price', formData.price);
  
  // Add images
  formData.images.forEach(image => {
    data.append('images', image);
  });

  try {
    await products.create(data);
  } catch (error) {
    console.error(error);
  }
};
```

## Testing the API

You can test endpoints using:
- Postman
- Thunder Client (VS Code extension)
- Browser fetch/axios

Example test:
```javascript
fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(data => console.log(data));
```
