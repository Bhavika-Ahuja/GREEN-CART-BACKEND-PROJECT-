# GreenCart API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

All authenticated endpoints require session cookies. Make sure to include `credentials: 'include'` in your fetch requests.

### Register
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "buyer", // or "seller"
  "city": "Portland",
  "businessName": "My Business", // required if role is "seller"
  "businessDescription": "Description" // optional for sellers
}

Response:
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "buyer",
    "city": "Portland"
  }
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "buyer",
    "city": "Portland"
  }
}
```

### Logout
```
POST /api/auth/logout

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Get Current User
```
GET /api/auth/me

Response:
{
  "id": "...",
  "name": "John Doe",
  "role": "buyer"
}
```

## Products

### Get All Products
```
GET /api/products?search=organic&category=Vegetables&tags=organic&page=1&limit=12

Response:
{
  "products": [...],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 50,
    "pages": 5
  }
}
```

### Get Single Product
```
GET /api/products/:id

Response:
{
  "product": {
    "id": "...",
    "name": "Organic Tomatoes",
    "description": "...",
    "price": 4.99,
    "category": "Vegetables",
    "sustainabilityTags": ["organic", "local"],
    "images": ["/uploads/..."],
    "seller": {
      "id": "...",
      "name": "Green Valley Farm",
      "rating": 4.5
    },
    ...
  },
  "reviews": [...]
}
```

### Add Product (Seller Only)
```
POST /api/products
Content-Type: multipart/form-data

Body (FormData):
- name: "Product Name"
- description: "Description"
- price: 9.99
- category: "Vegetables"
- sustainabilityTags: ["organic", "local"]
- stock: 100
- carbonFootprint: "Low"
- images: [File, File] // optional, max 5

Response:
{
  "success": true,
  "product": {...}
}
```

### Update Product (Seller Only)
```
PUT /api/products/:id
Content-Type: application/json

Body:
{
  "name": "Updated Name",
  "price": 12.99,
  "stock": 50
}

Response:
{
  "success": true,
  "product": {...}
}
```

### Delete Product (Seller Only)
```
DELETE /api/products/:id

Response:
{
  "success": true,
  "message": "Product deleted"
}
```

### Add Product Review
```
POST /api/products/:id/reviews
Content-Type: application/json

Body:
{
  "rating": 5,
  "comment": "Great product!"
}

Response:
{
  "success": true,
  "review": {...}
}
```

## Cart

### Get Cart
```
GET /api/cart

Response:
{
  "cart": [
    {
      "id": "...",
      "name": "Product Name",
      "price": 9.99,
      "quantity": 2,
      "image": "/uploads/..."
    }
  ],
  "total": 19.98
}
```

### Add to Cart
```
POST /api/cart/add
Content-Type: application/json

Body:
{
  "productId": "...",
  "quantity": 1
}

Response:
{
  "success": true,
  "cart": [...],
  "total": 19.98
}
```

### Update Cart Item
```
PUT /api/cart/update/:productId
Content-Type: application/json

Body:
{
  "quantity": 3
}

Response:
{
  "success": true,
  "cart": [...],
  "total": 29.97
}
```

### Remove from Cart
```
DELETE /api/cart/remove/:productId

Response:
{
  "success": true,
  "cart": [...],
  "total": 0
}
```

### Clear Cart
```
DELETE /api/cart/clear

Response:
{
  "success": true,
  "cart": [],
  "total": 0
}
```

### Checkout
```
POST /api/cart/checkout
Content-Type: application/json

Body:
{
  "street": "123 Main St",
  "city": "Portland",
  "zipCode": "97201",
  "paymentMethod": "mock-payment"
}

Response:
{
  "success": true,
  "order": {
    "id": "...",
    "total": 19.98,
    "status": "pending",
    ...
  }
}
```

## Sellers

### Get All Sellers
```
GET /api/sellers

Response:
{
  "sellers": [
    {
      "id": "...",
      "name": "Green Valley Farm",
      "businessName": "Green Valley Farm",
      "city": "Portland",
      "rating": 4.5,
      "totalRatings": 25
    }
  ]
}
```

### Get Seller Profile
```
GET /api/sellers/:id

Response:
{
  "seller": {...},
  "products": [...],
  "reviews": [...],
  "hasReviewed": false
}
```

### Add Seller Review
```
POST /api/sellers/:id/reviews
Content-Type: application/json

Body:
{
  "rating": 5,
  "comment": "Great seller!"
}

Response:
{
  "success": true,
  "message": "Review submitted"
}
```

### Get Seller Dashboard (Seller Only)
```
GET /api/sellers/dashboard/stats

Response:
{
  "products": [...],
  "orders": [...]
}
```

## Error Responses

All endpoints may return error responses in this format:
```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
