# 📝 Blog API Project

A modern, full-stack blog application built with **React**, **Node.js/Express**, and **PostgreSQL**.

> **Transformed from old EJS templates to a contemporary React SPA with a robust PostgreSQL backend.**

---

## 🎯 Features

✅ **Modern React Frontend** - Fast, responsive Single Page Application  
✅ **RESTful API Backend** - Express.js with PostgreSQL  
✅ **Persistent Database** - All posts saved in PostgreSQL  
✅ **Tailwind CSS Styling** - Professional, modern UI  
✅ **Full CRUD Operations** - Create, Read, Update, Delete posts  
✅ **Responsive Design** - Works on mobile, tablet, desktop  
✅ **Real-time Updates** - Instant post creation/editing without page reload  
✅ **Error Handling** - Comprehensive error messages and loading states  

---

## 📚 Project Structure

```
blog-api-project/
├── index.js                    # PostgreSQL REST API (port 4000)
├── package.json                # Root dependencies
├── client/                      # React Frontend (port 5173)
│   ├── src/
│   │   ├── App.jsx             # Main app component
│   │   ├── components/
│   │   │   ├── PostList.jsx    # Display all posts
│   │   │   ├── CreatePost.jsx  # Create new post form
│   │   │   └── EditPost.jsx    # Edit existing post
│   │   ├── index.css           # Tailwind CSS
│   │   └── main.jsx            # React entry point
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind configuration
│   └── package.json            # Client dependencies
├── QUICKSTART.md               # Quick setup guide
├── SETUP_GUIDE.md              # Detailed setup guide
└── README.md                   # This file
```

---

## Quick Start

### **Prerequisites**
- **Node.js** v16+ - [Download](https://nodejs.org)
- **PostgreSQL** v12+ - [Download](https://www.postgresql.org/download)
- **Git** - [Download](https://git-scm.com)

### **1. Clone Repository**
```bash
git clone https://github.com/AnAceAV/blog-api-project.git
cd blog-api-project
```

### **2. Setup PostgreSQL Database**

**In pgAdmin:**
1. Right-click "Databases" → "Create" → "Database"
2. Name: `Blogsite` (or your preferred name)
3. Note your PostgreSQL password

**In Query Tool, run:**
```sql
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **3. Install Backend Dependencies**
```bash
npm install
```

### **4. Configure Database Connection**

Edit `index.js` line 13:
```javascript
const pool = new Pool({
  user: "postgres",
  password: "YOUR_PASSWORD",  // ← Your PostgreSQL password
  host: "localhost",
  port: 5432,
  database: "Blogsite",        // ← Your database name
});
```

### **5. Install Frontend Dependencies**
```bash
cd client
npm install
cd ..
```

### **6. Run the Application**

**Terminal 1 - Start API:**
```bash
npm run api
```

Wait for: `API is running at http://localhost:4000`

**Terminal 2 - Start React App:**
```bash
cd client
npm run dev
```

### **7. Open Browser**
Visit: **http://localhost:5173** ✅

---

## 📖 How It Works

### **Frontend (React)**
- Built with **Vite** for fast development
- **Tailwind CSS** for styling
- **Axios** for API calls
- Components:
  - `PostList`: Display all blog posts with edit/delete buttons
  - `CreatePost`: Form to create new posts
  - `EditPost`: Form to modify existing posts

### **Backend (Node.js/Express)**
- RESTful API on port 4000
- PostgreSQL for persistent data storage
- CORS enabled for frontend communication
- Auto-creates tables on startup

### **Database (PostgreSQL)**
- Stores all blog posts
- Timestamps for created_at and updated_at
- ACID compliance ensures data integrity

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Get all posts |
| GET | `/posts/:id` | Get single post by ID |
| POST | `/posts` | Create new post |
| PATCH | `/posts/:id` | Update post |
| DELETE | `/posts/:id` | Delete post |

### **Example POST Request**
```bash
curl -X POST http://localhost:4000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is a great post!",
    "author": "John Doe"
  }'
```

---

## 🛠️ Development Commands

### **Backend Only**
```bash
npm run api              # Start PostgreSQL API server
```

### **Frontend Only**
```bash
cd client
npm run dev             # Start React dev server
```

### **Build React for Production**
```bash
cd client
npm run build           # Creates optimized build in dist/
```

---

## 🔒 Environment Variables

Create `.env` file in root (optional, for production):
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=Blogsite
```

---

## 📦 Dependencies

### **Backend**
- `express` - Web framework
- `pg` - PostgreSQL client
- `body-parser` - Parse request body
- `cors` - Enable cross-origin requests
- `axios` - HTTP client

### **Frontend**
- `react` - UI library
- `axios` - API calls
- `vite` - Build tool
- `tailwindcss` - CSS framework
- `postcss` & `autoprefixer` - CSS processing

---

## 🐛 Troubleshooting

### **PostgreSQL Connection Error**
- Ensure PostgreSQL is running
- Check password in `index.js`
- Verify database name matches

### **Port Already in Use**
```bash
# Find process on port 4000
netstat -ano | findstr :4000

# Kill it
taskkill /PID <PID> /F
```

### **React Module Not Found**
```bash
cd client
npm install
```

### **Tailwind Not Working**
```bash
cd client
npm install -D tailwindcss postcss autoprefixer --legacy-peer-deps
npm run dev
```

---

## 🚀 Future Improvements

### **Short Term**
- [ ] Add user authentication (JWT)
- [ ] Search/filter posts by title/author
- [ ] Pagination for post list
- [ ] Post categories/tags
- [ ] Comments on posts

### **Medium Term**
- [ ] User profiles
- [ ] Like/vote system
- [ ] Rich text editor (markdown support)
- [ ] Image upload functionality
- [ ] Draft/published post status
- [ ] Email notifications

### **Long Term**
- [ ] Deployment to cloud (Heroku, Vercel, AWS)
- [ ] Social media sharing
- [ ] Analytics dashboard
- [ ] Full-text search
- [ ] API rate limiting
- [ ] Caching strategy
- [ ] Mobile app (React Native)

---

## 📝 What Changed from Original

### **Removed**
❌ EJS templates (server-side rendering)  
❌ In-memory data storage  
❌ Basic CSS styling  

### **Added**
✅ React SPA (Single Page Application)  
✅ PostgreSQL database  
✅ Tailwind CSS (modern styling)  
✅ Error handling & loading states  
✅ Validation & confirmation dialogs  
✅ Responsive mobile design  

---

## 💡 Learning Resources

- **React**: https://react.dev
- **Express.js**: https://expressjs.com
- **PostgreSQL**: https://www.postgresql.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **Vite**: https://vitejs.dev

---

## 📄 License

ISC License - Feel free to use this project!

---

## 👤 Author

Created by **AnAceAV**

---

## 🤝 Contributing

Feel free to fork and submit pull requests for improvements!

---

## 📮 Support

Issues? Check [QUICKSTART.md](QUICKSTART.md) or [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

**Happy Blogging! 🎉**
