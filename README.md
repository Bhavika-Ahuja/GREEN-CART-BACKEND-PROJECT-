# 🌱 GreenCart - Sustainable Marketplace

<div align="center">

![GreenCart Logo](https://img.shields.io/badge/GreenCart-Sustainable%20Living-10b981?style=for-the-badge&logo=leaf)

**A full-stack eco-commerce platform connecting local sustainable sellers with conscious buyers**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)

[Features](#features) • [Demo](#demo) • [Installation](#installation) • [Tech Stack](#tech-stack) • [API Docs](#api-documentation)

</div>

---

## 📸 Screenshots

![Home Page](https://via.placeholder.com/800x400/10b981/ffffff?text=GreenCart+Home+Page)
*Beautiful gradient design with featured products and bestsellers*

---

## ✨ Features

### 🛍️ **For Buyers**
- Browse 70+ sustainable products across 7 categories
- Filter by sustainability tags (organic, handmade, recycled, local, etc.)
- Advanced search and category filtering
- Shopping cart with session management
- Mock checkout process
- Rate and review products
- Rate and review sellers
- View seller profiles and ratings

### 🏪 **For Sellers**
- Create seller profile with business details
- Add products with multiple images (up to 5)
- Set sustainability tags and carbon footprint
- Manage inventory and stock
- View orders and sales
- Build reputation through customer reviews
- Seller dashboard with analytics

### 🎨 **Design Features**
- Modern glassmorphism UI
- Gradient backgrounds and smooth animations
- Mobile-responsive design
- Lucide React icons
- Beautiful product cards with hover effects
- Bestsellers section with top-rated products

---

## 🚀 Demo

**Live Demo:** [Coming Soon]

**Test Credentials:**
- **Seller Account:**
  - Email: `sarah@greenvalleyfarm.com`
  - Password: `password123`
- **Buyer Account:** Register your own!

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **multer** - File uploads
- **cors** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Context API** - State management

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/greencart-marketplace.git
cd greencart-marketplace
```

### 2. Backend Setup
```bash
# Install backend dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/greencart
# or use MongoDB Atlas connection string

# Seed the database with sample data
node seed.js

# Start backend server
npm start
```

Backend will run on `http://localhost:3000`

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start frontend development server
npm run dev
```

Frontend will run on `http://localhost:5174`

### 4. Access the Application
- **Frontend:** http://localhost:5174
- **Backend API:** http://localhost:3000
- **API Test:** http://localhost:5174/test

---

## 📁 Project Structure

```
greencart-marketplace/
├── backend/
│   ├── models/              # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   └── SellerReview.js
│   ├── routes/
│   │   ├── api/            # REST API routes
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   ├── cart.js
│   │   │   └── sellers.js
│   │   └── [web routes]    # Legacy EJS routes
│   ├── middleware/
│   │   └── auth.js         # Authentication middleware
│   ├── config/
│   │   └── multer.js       # File upload config
│   ├── public/
│   │   ├── uploads/        # Product images
│   │   └── images/         # Static assets
│   ├── server.js           # Entry point
│   ├── seed.js             # Database seeding
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   ├── context/        # Context providers
    │   ├── services/       # API services
    │   └── App.jsx
    ├── public/
    └── package.json
```

---

## 🔌 API Documentation

### Authentication
```http
POST /api/auth/register    # Register new user
POST /api/auth/login       # Login user
POST /api/auth/logout      # Logout user
GET  /api/auth/me          # Get current user
```

### Products
```http
GET    /api/products           # Get all products (with filters)
GET    /api/products/:id       # Get single product
POST   /api/products           # Add product (seller only)
PUT    /api/products/:id       # Update product (seller only)
DELETE /api/products/:id       # Delete product (seller only)
POST   /api/products/:id/reviews  # Add review
```

### Cart
```http
GET    /api/cart              # Get cart
POST   /api/cart/add          # Add to cart
PUT    /api/cart/update/:id   # Update quantity
DELETE /api/cart/remove/:id   # Remove item
DELETE /api/cart/clear        # Clear cart
POST   /api/cart/checkout     # Checkout
```

### Sellers
```http
GET  /api/sellers              # Get all sellers
GET  /api/sellers/:id          # Get seller profile
POST /api/sellers/:id/reviews  # Add seller review
GET  /api/sellers/dashboard/stats  # Seller dashboard (auth)
```

Full API documentation: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🌱 Database Seeding

The project includes a seeding script that populates the database with:
- **7 Sellers** with complete profiles
- **70 Products** across 7 categories (10 each)
- Random ratings and reviews

```bash
node seed.js
```

**Categories:**
- Vegetables
- Fruits
- Personal Care
- Home & Garden
- Clothing
- Food & Beverages
- Other

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/greencart
# or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/greencart

# Server
PORT=3000
SESSION_SECRET=your-secret-key-change-in-production

# Frontend (for CORS)
FRONTEND_URL=http://localhost:5174
```

---

## 🧪 Testing

### Test API Connection
Visit: http://localhost:5174/test

This page will show:
- API connection status
- Number of products loaded
- Number of sellers loaded

### Manual Testing
1. Register as a buyer
2. Browse products and add to cart
3. Complete checkout
4. Register as a seller
5. Add products with images
6. View seller dashboard

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/YOUR_PROFILE)

---

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Inspired by sustainable living initiatives
- Built with ❤️ for a greener future

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Read [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

<div align="center">

**Made with 🌱 for a sustainable future**

⭐ Star this repo if you find it helpful!

</div>
