# 🚀 Fullstack Post App with C++ Integration

A fully functional full-stack application built using **Next.js**, **Tailwind CSS**, **PostgreSQL**, and a Dockerized **C++ backend**. This app demonstrates core full-stack development, C++ integration, and database persistence.

---

## ✅ Features Implemented

- 🌐 **Frontend**:
  - Built with Next.js and Tailwind CSS
  - Landing page with a paginated table of posts
  - Post detail page with editable title
  - Create new post using modal dialog
  - Responsive and mobile-optimized UI

- ⚙️ **Backend (API Routes)**:
  - `/api/posts` (GET, POST) to interact with PostgreSQL
  - POST route accepts data and saves it with analysis

- 🧠 **C++ Logic Integration**:
  - Dockerized Crow-based C++ API (`/analyze`)
  - Performs real-time word count on post body
  - Returns JSON to Next.js backend

- 💾 **Database**:
  - PostgreSQL database set up locally
  - Prisma ORM with `Post` model (`title`, `body`, `wordCount`, `createdAt`)
  - Connected via `.env` configuration

- 🖥️ **Working End-to-End**:
  - Posts fetched from DB on load
  - New posts analyzed by C++ and saved
  - UI updates immediately (optimistic)

---

## 🖼 Architecture Diagram



---

## 🛠 Local Setup

```bash
git clone https://github.com/yourusername/fullstack-post-app.git
cd fullstack-post-app
npm install
Configure Environment
Create .env with:

env
Copy
Edit
DATABASE_URL="postgresql://youruser:yourpass@localhost:5432/yourdb?schema=public"
Set Up Database
bash
Copy
Edit
npx prisma db push
npx prisma generate
Start C++ Backend
bash
Copy
Edit
cd cpp-backend
docker build -t cpp-api .
docker run -p 8080:8080 cpp-api
Start Next.js App
bash
Copy
Edit
npm run dev
📁 Folder Structure
bash
Copy
Edit
/pages
  /index.tsx         ← Landing page with post list
  /post/[id].js      ← Post detail & analysis
  /api/posts         ← API route to DB
/components
  /CreatePostModal   ← Modal for new post
/lib
  /prisma.js         ← Prisma client setup
/cpp-backend
  /main.cpp          ← Crow API server (word count)
  /Dockerfile        ← Build and run C++ service
/prisma
  /schema.prisma     ← Postgres DB schema
✨ Tech Used
Frontend: Next.js, Tailwind CSS, React

Backend: Node.js API Routes (Next.js)

Database: PostgreSQL, Prisma ORM

C++ API: Crow Framework, Docker

