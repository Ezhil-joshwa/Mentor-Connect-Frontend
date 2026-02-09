
# 🚀 Full Stack Mentor Connect System - Developer Setup Guide

This project is a complete full stack web application designed for managing mentorship programs, including Admin, Mentor, and Student roles.

## 🏗️ Architecture

- **Frontend**: React.js with Vite, TailwindCSS (in `src/`)
- **Backend**: Python Flask REST API (in `backend/`)
- **Database**: SQLite (Development) / PostgreSQL (Production)
- **Authentication**: JWT (JSON Web Tokens) with Role-Based Access Control (RBAC)

## 🛠️ Prerequisites

- Node.js (v18+)
- Python (3.9+)
- pip (Python Package Manager)

---

## 🟢 Backend Setup (Python Flask)

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # Mac/Linux:
   source venv/bin/activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize Database and Create Admin**:
   The application automatically creates the database and a default admin user on first run.
   
5. **Run the Server**:
   ```bash
   python app.py
   ```
   > Server will start at `http://localhost:5000`
   > **Default Admin Credentials:**
   > - Username: `admin`
   > - Password: `admin123`

---

## 🔵 Frontend Setup (React)

1. **Navigate to the root directory** (where `package.json` is located).

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   > Frontend will start at `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
SECRET_KEY=your-super-secret-key-change-this
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URL=sqlite:///mentor_connect.db
```

---

## 🐳 Docker Deployment (Bonus)

To run the entire stack with Docker Compose (ensure Docker is installed):

1. Create a `Dockerfile` in `backend/` and `Dockerfile` in root for frontend.
2. Run:
   ```bash
   docker-compose up --build
   ```

---

## 🛡️ Security Features implemented

- **Bcrypt Hashing**: Passwords are never stored in plain text.
- **JWT Tokens**: Stateless authentication for API request.
- **RBAC**: Middleware ensures Students cannot access Admin routes.
- **Input Validation**: API validates request structures.

---

## 🚀 Quick Access URLs

Use these links to interact with your running application:

- **Frontend Application**: [http://localhost:5173/mentor-connect-hub/](http://localhost:5173/mentor-connect-hub/)
- **Admin Database Viewer**: [http://127.0.0.1:5000/admin/](http://127.0.0.1:5000/admin/)
- **Backend API Root**: [http://127.0.0.1:5000/](http://127.0.0.1:5000/)
- **API Health Check**: [http://127.0.0.1:5000/health](http://127.0.0.1:5000/health)

> **⚠️ IMPORTANT:** ensure you have the backend running in a separate terminal (`python app.py`) for these to work!

	
