# DoseGuard Deployment Guide

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn package manager

## Local Development Setup

### 1. Install Dependencies

```bash
cd DoseGuard
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 2. Configure Environment

Create a `.env` file in the `backend` directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doseguard
JWT_SECRET=doseguard-secret-key-2026
```

### 3. Start MongoDB

```bash
mongod
```

### 4. Start the Application

```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Production Deployment

### Option 1: Deploy to Heroku

1. **Create a Heroku app**:
```bash
heroku create doseguard
```

2. **Add MongoDB Atlas** (cloud MongoDB):
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Copy the connection string

3. **Set environment variables**:
```bash
heroku config:set MONGODB_URI=your-mongodb-connection-string
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set NODE_ENV=production
```

4. **Deploy**:
```bash
git push heroku main
```

### Option 2: Deploy to Render

1. **Create a new Web Service** on https://render.com
2. **Connect your GitHub repository**
3. **Set environment variables**:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV
4. **Set build command**:
   ```
   cd frontend && npm install && npm run build
   ```
5. **Set start command**:
   ```
   cd backend && node server.js
   ```

### Option 3: Deploy to Railway

1. **Create a new project** on https://railway.app
2. **Connect your GitHub repository**
3. **Add MongoDB** from the marketplace
4. **Set environment variables**:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV
5. **Deploy**

### Option 4: Docker Deployment

Create a `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install dependencies
RUN npm install
RUN cd backend && npm install
RUN cd frontend && npm install

# Copy source code
COPY . .

# Build frontend
RUN cd frontend && npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy from builder
COPY --from=builder /app .

# Install MongoDB CLI for health check
RUN apk add --no-cache curl

# Expose port
EXPOSE 5000

# Start backend
CMD ["node", "backend/server.js"]
```

Build and run:
```bash
docker build -t doseguard .
docker run -p 5000:5000 doseguard
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doseguard
JWT_SECRET=your-jwt-secret-key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Security Considerations

### For Production Deployment

1. **Environment Variables**:
   - Use strong JWT secrets
   - Never commit .env files to git
   - Use environment-specific configs

2. **HTTPS**:
   - Enable HTTPS in production
   - Use certificates from Let's Encrypt or similar

3. **CORS**:
   - Configure CORS to only allow your domain
   - Example:
     ```javascript
     app.use(cors({
       origin: 'https://yourdomain.com',
       credentials: true
     }));
     ```

4. **Rate Limiting**:
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   app.use(limiter);
   ```

5. **Input Validation**:
   - Use middleware like `express-validator`
   - Sanitize all user inputs

6. **MongoDB Security**:
   - Use MongoDB Atlas with proper security settings
   - Enable authentication
   - Use strong passwords
   - Restrict IP access

7. **HIPAA Compliance** (for US deployment):
   - Sign BAA with MongoDB Atlas
   - Enable encryption at rest
   - Enable encryption in transit
   - Implement audit logging
   - Regular security assessments

## Monitoring and Logging

### Add Logging
```bash
npm install morgan
```

### Add Error Tracking
```bash
npm install sentry
```

## Database Management

### Create Admin User
```javascript
use doseguard
db.createUser({
  user: "admin",
  pwd: "your-strong-password",
  roles: ["readWrite", "dbAdmin"]
})
```

### Backup Database
```bash
mongodump --db doseguard --out ./backup
```

### Restore Database
```bash
mongorestore --db doseguard ./backup/doseguard
```

## Scaling

### Horizontal Scaling
1. Use MongoDB Atlas with replica sets
2. Deploy multiple backend instances
3. Use a load balancer (nginx, AWS ELB)
4. Use Redis for session storage

### Database Optimization
1. Add indexes to frequently queried fields
2. Use pagination for large datasets
3. Implement caching where appropriate

## Update and Maintenance

### Update Dependencies
```bash
npm update
cd frontend && npm update
cd ../backend && npm update
```

### Check for Vulnerabilities
```bash
npm audit
npm audit fix
```

### Restart Application
```bash
# If using PM2
pm2 restart doseguard

# If using systemd
sudo systemctl restart doseguard
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <pid>
```

### MongoDB Connection Failed
- Verify MongoDB is running
- Check connection string
- Verify firewall settings

### Frontend Build Failed
- Clear cache: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Check Node.js version

## Support

For issues, check:
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)