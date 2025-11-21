# GreenCart Troubleshooting Guide

## ✅ Current Status

### Backend (Port 3000)
- ✅ Running on http://localhost:3000
- ✅ MongoDB connected
- ✅ API endpoints working
- ✅ 70 products in database
- ✅ 7 sellers in database

### Frontend (Port 5174)
- ✅ Running on http://localhost:5174
- ✅ Beautiful new design applied
- ✅ Bestsellers section added
- ✅ API connection configured

## 🔍 If Products/Sellers Not Showing

### Step 1: Test API Connection
Visit: http://localhost:5174/test

This will show:
- API connection status
- Number of products found
- Number of sellers found

### Step 2: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors
4. Common errors:
   - CORS errors → Backend not running
   - Network errors → Wrong port
   - 404 errors → API route issue

### Step 3: Verify Backend is Running
```bash
curl http://localhost:3000/api/products
curl http://localhost:3000/api/sellers
```

Should return JSON with products/sellers

### Step 4: Check MongoDB Data
```bash
# In your backend directory
node seed.js
```

This will re-seed the database with 70 products and 7 sellers

## 🐛 Common Issues

### Issue: "No products available"
**Solution:**
1. Make sure backend is running: `npm start` in backend directory
2. Check MongoDB connection in backend console
3. Re-run seed script: `node seed.js`

### Issue: CORS Error
**Solution:**
- Backend must be running on port 3000
- Frontend must be running on port 5173 or 5174
- Check `.env` file has: `FRONTEND_URL=http://localhost:5173`

### Issue: Products show but images don't load
**Solution:**
- Images are served from backend
- Check image URLs start with `http://localhost:3000`
- Fallback to `/images/no-image.svg` if image fails

### Issue: Cart not working
**Solution:**
- Session cookies must be enabled
- API calls must include `credentials: 'include'`
- Check `api.js` has `withCredentials: true`

## 📊 Database Contents

After running `node seed.js`, you should have:

### Products (70 total):
- 10 Vegetables
- 10 Fruits
- 10 Personal Care
- 10 Home & Garden
- 10 Clothing
- 10 Food & Beverages
- 10 Other

### Sellers (7 total):
- Green Valley Farm (Portland)
- EcoSoap Co. (Seattle)
- Sustainable Living (San Francisco)
- Organic Harvest (Austin)
- Green Stitch (Denver)
- Earth Roots (Portland)
- Nature's Garden (Seattle)

## 🔧 Quick Fixes

### Restart Everything
```bash
# Terminal 1 - Backend
cd backend-projet
npm start

# Terminal 2 - Frontend
cd backend-projet/frontend
npm run dev
```

### Clear Browser Cache
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

### Check Ports
```bash
# Check if ports are in use
netstat -ano | findstr :3000
netstat -ano | findstr :5173
netstat -ano | findstr :5174
```

## 📱 Features Working

✅ Home page with hero section
✅ Featured products (6 items)
✅ Bestsellers section (8 items)
✅ Products page with filters
✅ Sellers page
✅ Product detail page
✅ Seller profile page
✅ Shopping cart
✅ Checkout
✅ User authentication
✅ Product reviews
✅ Seller reviews

## 🎨 Design Features

✅ Glassmorphism navbar
✅ Gradient backgrounds
✅ Lucide React icons
✅ Hover animations
✅ Mobile responsive
✅ Modern color scheme (emerald/green)
✅ Rounded corners
✅ Shadow effects

## 📞 Still Having Issues?

1. Check both terminals are running
2. Visit http://localhost:5174/test
3. Check browser console for errors
4. Verify MongoDB is connected (check backend terminal)
5. Try re-seeding database: `node seed.js`
