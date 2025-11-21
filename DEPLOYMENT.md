# 🚀 Deployment Guide

## Deploy to Heroku

### Backend Deployment

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create greencart-api
```

4. **Add MongoDB Atlas**
```bash
heroku addons:create mongolab:sandbox
```

5. **Set Environment Variables**
```bash
heroku config:set SESSION_SECRET=your-secret-key
heroku config:set FRONTEND_URL=https://your-frontend-url.com
```

6. **Deploy**
```bash
git push heroku main
```

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Navigate to frontend**
```bash
cd frontend
```

3. **Deploy**
```bash
vercel
```

4. **Update API URL**
Update `frontend/src/services/api.js`:
```javascript
const API_URL = 'https://your-heroku-app.herokuapp.com/api';
```

---

## Deploy to Railway

### Backend

1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Add environment variables
5. Deploy!

### Frontend

1. Deploy to Vercel or Netlify
2. Update API URL in `api.js`

---

## Deploy to DigitalOcean

### Using App Platform

1. Create account on DigitalOcean
2. Go to App Platform
3. Connect GitHub repository
4. Configure build settings
5. Add environment variables
6. Deploy

---

## Environment Variables for Production

```env
# Backend
MONGODB_URI=your-mongodb-atlas-uri
PORT=3000
SESSION_SECRET=strong-random-secret
FRONTEND_URL=https://your-frontend-domain.com

# Frontend
VITE_API_URL=https://your-backend-domain.com/api
```

---

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Test user registration/login
- [ ] Test product creation
- [ ] Test cart functionality
- [ ] Test checkout process
- [ ] Test image uploads
- [ ] Verify CORS settings
- [ ] Check mobile responsiveness
- [ ] Run seed script on production DB
- [ ] Set up monitoring (optional)
- [ ] Configure custom domain (optional)

---

## Troubleshooting

### CORS Issues
Make sure `FRONTEND_URL` in backend `.env` matches your frontend domain.

### Database Connection
Use MongoDB Atlas for production. Local MongoDB won't work on hosted platforms.

### File Uploads
Consider using cloud storage (AWS S3, Cloudinary) for production image uploads.

### Session Issues
Make sure `SESSION_SECRET` is set and secure in production.
