# Blog API Project - Complete Setup Guide

## 🎯 New Architecture

**Frontend**: React + Vite (Modern SPA)  
**Backend**: Node.js + Express (REST API)  
**Database**: PostgreSQL (External)  
**Removed**: EJS templates (outdated)

---

## 📋 Prerequisites

1. **Node.js** (v16+) - [Download](https://nodejs.org)
2. **PostgreSQL** (v12+) - [Download](https://www.postgresql.org/download)
3. **Git** (optional)

---

## 🚀 Setup Steps

### **STEP 1: Install PostgreSQL Database**

#### **Windows:**
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run installer, set password for `postgres` user (remember this!)
3. Default port: `5432`
4. Complete installation

#### **Create Database:**
Open **pgAdmin** (comes with PostgreSQL) or use terminal:

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE blog_db;

-- Connect to database
\c blog_db

-- Tables will be created automatically by the Node.js app
```

---

### **STEP 2: Install Backend Dependencies**

```bash
# Go to project root
cd d:\projects\blog API Project

# Install dependencies
npm install

# This installs: express, body-parser, pg, axios, cors
```

---

### **STEP 3: Configure Database Connection**

Edit [index.js](index.js#L12-L17):

```javascript
const pool = new Pool({
  user: "postgres",           // Default PostgreSQL user
  password: "your_password",  // YOUR PostgreSQL password (set during install)
  host: "localhost",
  port: 5432,
  database: "blog_db",
});
```

**Example if your password is `admin123`:**
```javascript
password: "admin123",
```

---

### **STEP 4: Create React Frontend**

Open terminal in project root:

```bash
# Create Vite React app
npm create vite@latest client -- --template react

# Enter the directory
cd client

# Install dependencies
npm install axios react-router-dom

# Install Tailwind CSS (optional but recommended for better UI)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

### **STEP 5: Add React Components**

Copy these files from project root into `client/src/components/`:

```
client/src/components/
├── PostList.jsx
├── CreatePost.jsx
└── EditPost.jsx
```

Replace [client/src/App.jsx](App.jsx):
- Copy content of [App.jsx](App.jsx) from project root

Update [client/src/index.css](index.css):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}
```

Update [client/vite.config.js](vite.config.js):
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      }
    }
  }
})
```

---

## 🏃 Running the Application

### **Terminal 1: Start PostgreSQL API Server**

```bash
npm run api
# Runs on: http://localhost:4000
```

**Output should show:**
```
API is running at http://localhost:4000
Database initialized
```

### **Terminal 2: Start React Dev Server**

```bash
cd client
npm run dev
# Runs on: http://localhost:5173
```

### **Open Browser**

Visit: http://localhost:5173

---

## 🎨 Features

✅ **Create** new blog posts  
✅ **Read** all posts with pagination  
✅ **Edit** existing posts  
✅ **Delete** posts  
✅ **Modern UI** with Tailwind CSS  
✅ **Persistent Database** (PostgreSQL)  
✅ **Responsive Design**  

---

## 📊 Database Schema

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Get all posts |
| GET | `/posts/:id` | Get single post |
| POST | `/posts` | Create new post |
| PATCH | `/posts/:id` | Update post |
| DELETE | `/posts/:id` | Delete post |

**Base URL**: http://localhost:4000

**Example POST request:**
```json
{
  "title": "My First Post",
  "content": "This is the content...",
  "author": "John Doe"
}
```

---

## 🛠️ Troubleshooting

### **Error: Cannot connect to PostgreSQL**
- Check PostgreSQL is running (Windows Services)
- Verify password in `index.js`
- Ensure `blog_db` database exists

### **Error: Port 4000 already in use**
```bash
# Find process on port 4000
netstat -ano | findstr :4000

# Kill it (replace PID)
taskkill /PID <PID> /F
```

### **React components not showing**
- Ensure `client/` folder created
- Components in `client/src/components/`
- Run `npm install` in both root and `client/` folders

---

## 📦 Build for Production

```bash
cd client
npm run build

# Output in: client/dist/
```

Deploy `dist/` contents to web server.

---

## 🗑️ Remove Old EJS Files

After confirming React works, delete:
- `views/` folder (contains index.ejs, modify.ejs)
- `ejs` dependency from package.json

---

## 💡 Next Steps

1. Add authentication (JWT tokens)
2. Add search/filter functionality
3. Add comments on posts
4. Deploy to Heroku, Vercel, or AWS
5. Add image uploads
6. Implement full-text search
7. Add user profiles

---

**Happy Blogging! 🎉**
