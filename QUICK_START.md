# Quick Start Guide - DoseGuard

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn package manager

## Installation (5 minutes)

### Step 1: Install Dependencies

Open your terminal and run:

```bash
cd DoseGuard
npm install
cd frontend && npm install
cd ../backend && npm install
```

### Step 2: Configure MongoDB

Make sure MongoDB is running. On Windows, you can:

1. Open Services (Win+R, type `services.msc`)
2. Find "MongoDB"
3. Right-click and select "Start"

Or run in a separate terminal:
```bash
mongod
```

### Step 3: Start the Application

```bash
npm run dev
```

Or start servers individually:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Step 4: Open Browser

Visit: http://localhost:3000

## Quick Demo (1 minute)

1. Click **"Try Demo Patient"** button on the landing page
2. Review the patient profile
3. View safety signals
4. Check the discussion list

## What You'll See

### Demo Patient
- **Name**: Ananya Rao
- **Medications**: 5 medicines
- **Safety Signals**: 2 items (1 duplicate therapy, 1 interaction)
- **Discussion Questions**: 4 questions

### Features to Try
1. **Prescription Upload** - Drag and drop test
2. **Safety Check** - View flagged items
3. **Timeline** - Medication history
4. **Reports** - Generate doctor summary
5. **Settings** - Change preferences

## Troubleshooting

### MongoDB Connection Failed
- Make sure MongoDB is running
- Check connection in `backend/.env`

### Port Already in Use
- Backend: Change PORT in `backend/.env`
- Frontend: React uses 3000 by default

### Dependencies Not Installing
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Next Steps

1. Read [README.md](README.md) for full project overview
2. Read [TESTING_GUIDE.md](TESTING_GUIDE.md) for testing scenarios
3. Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for production deployment

## Quick Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm run dev:backend` | Start backend only |
| `npm run dev:frontend` | Start frontend only |
| `npm test` | Run tests |
| `npm run build` | Build for production |

## Support

- **Issues**: Check [TESTING_GUIDE.md](TESTING_GUIDE.md)
- **Deployment**: See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Architecture**: Read [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

**Status**: ✅ Ready for Demo
**Demo Time**: 2 minutes
**Setup Time**: 5 minutes