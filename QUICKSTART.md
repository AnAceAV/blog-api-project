# Quick Start Guide - Step by Step

## ✅ Prerequisites Installed?
- [ ] Node.js (check: `node -v`)
- [ ] PostgreSQL (check: open pgAdmin)

---

## 🔥 QUICK START (Copy-Paste Commands)

### **Step 1: Setup PostgreSQL Database**

Open **pgAdmin** (comes with PostgreSQL):
1. Create Database: right-click "Databases" → "Create" → "Database" → name: `blog_db`
2. Remember your PostgreSQL password from installation

### **Step 2: Navigate to Project**

```bash
cd d:\projects\blog API Project
```

### **Step 3: Install Dependencies**

```bash
npm install
```

### **Step 4: Setup React App**

```bash
npm create vite@latest client -- --template react
cd client
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
cd ..
```

### **Step 5: Configure Database Password**

Edit `index.js` line 13:
```javascript
password: "your_password",  // ← CHANGE THIS to your PostgreSQL password
```

### **Step 6: Copy React Components**

1. Create folder: `client/src/components/`
2. Copy these files into it:
   - `PostList.jsx` (from project root)
   - `CreatePost.jsx` (from project root)
   - `EditPost.jsx` (from project root)

### **Step 7: Update Files**

1. Replace `client/src/App.jsx` with content from `App.jsx` (project root)
2. Update `client/src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Copy `vite.config.js.template` as `client/vite.config.js`

---

## 🚀 RUN THE APPLICATION

### **Terminal 1: Start API Backend**

```bash
npm run api
```

Wait until you see:
```
API is running at http://localhost:4000
Database initialized
```

### **Terminal 2: Start React Frontend**

```bash
cd client
npm run dev
```

Wait until you see:
```
  VITE v... ready in ... ms

  ➜  Local:   http://localhost:5173/
```

### **Step 3: Open Browser**

Visit: **http://localhost:5173**

---

## 🎯 Test It

1. Click **"New Post"**
2. Fill: Title, Author, Content
3. Click **"Create Post"**
4. See post appear in list
5. Click **"Edit"** → modify → **"Update Post"**
6. Click **"Delete"** → confirm

---

## 📁 Final Project Structure

```
d:\projects\blog API Project\
├── index.js (PostgreSQL API Backend)
├── server.js (Proxy server)
├── package.json (Dependencies)
├── client/
│   ├── src/
│   │   ├── App.jsx (Main React component)
│   │   ├── index.css (Tailwind styles)
│   │   └── components/
│   │       ├── PostList.jsx
│   │       ├── CreatePost.jsx
│   │       └── EditPost.jsx
│   ├── package.json
│   └── vite.config.js
├── SETUP_GUIDE.md (Full documentation)
└── public/ (Static files)
```

---

## 🐛 Having Issues?

### PostgreSQL Connection Error
- Check: `password: "your_password"` matches your PostgreSQL password in `index.js`
- Verify PostgreSQL is running

### Port 4000 Already in Use
```bash
# Find process
netstat -ano | findstr :4000

# Kill it (replace PID)
taskkill /PID <PID> /F
```

### React Components Not Found
- Check: `client/src/components/` folder exists
- Check: All 3 files copied (PostList.jsx, CreatePost.jsx, EditPost.jsx)

### Still Stuck?
Read full documentation: [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

**Enjoy your modern blog app! 🚀**
