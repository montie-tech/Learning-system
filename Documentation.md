📘 DOCUMENTATION.md — Nexus Learning System
# 🧾 Nexus Learning System — Full Documentation

## 🏫 Project Overview

**Nexus Learning System (NLS)** is an innovative e-learning platform built to make **coding and digital education accessible to all**.  
It integrates **learning materials, student dashboards, instructor controls, and job opportunities** into one unified web platform.

This documentation provides an in-depth technical explanation for setting up, managing, and contributing to Nexus.

---

## 🧱 System Architecture

Nexus is a **full-stack web application** structured in **two major layers**:

### 1️⃣ Frontend
- Built using **HTML, CSS, and JavaScript (Vanilla)**.
- Handles all **UI interactions** for login, signup, student dashboards, and settings.
- Uses **Fetch API** to communicate with backend REST endpoints.
- Stores login data and authentication tokens in **localStorage**.

### 2️⃣ Backend
- Built using **Node.js + Express.js**.
- Provides RESTful API endpoints for **authentication, role management, and data retrieval**.
- Uses **MongoDB** for persistent data storage.
- Implements **JWT (JSON Web Token)** for secure authentication and authorization.

---

## ⚙️ Core Functionalities

| Feature | Description |
|----------|--------------|
| **User Authentication** | Secure signup and login for students, admins, and instructors using JWT tokens. |
| **Role-based Routing** | Users are redirected to different dashboards based on role: `student`, `admin`, or `instructor`. |
| **Material Uploads** | Instructors can upload course files and materials to MongoDB collections. |
| **Profile Settings** | Users can update their name, email, and theme preference. |
| **Announcements & Notifications** | Static dashboard cards simulate academic updates and progress. |
| **Theming System** | Users can toggle between light/dark mode stored in localStorage. |

---
Repo: https://github.com/sesco001/fina.git

## 🗂️ Folder Structure



Nexus-Learning-System/
│
├── frontend/
│ ├── index.html # Student dashboard
│ ├── login.html # Login page
│ ├── signup.html # Signup/registration page
│ ├── settings.html # User settings and profile page
│ ├── materials.html # Course content display
│ ├── assignments.html # Assignment submissions
│ └── assets/ # CSS, JS, icons, and media files
│
├── backend/
├── server.js
├── .env
├── package.json
├── uploads/                   # uploaded files (assignments, notes, results)
├── routes/
│   ├── auth.js
│   ├── teacher.js
│   ├── student.js
│   ├── admin.js
│   └── files.js
├── controllers/
│   ├── authController.js
│   ├── teacherController.js
│   ├── studentController.js
│   └── adminController.js
├── models/
│   ├── User.js
│   ├── Course.js
│   ├── Assignment.js
│   ├── Submission.js
│   ├── Note.js
│   ├── PastPaper.js
│   ├── Result.js
│   └── Payment.js
├── middleware/
│   ├── auth.js
│   └── roles.js
└── utils/
    └── sendEmail.js
└── README.md


---

## 💾 Database Schema (MongoDB)

### Collection: `users`

| Field | Type | Description |
|-------|------|--------------|
| `_id` | ObjectId | Unique identifier |
| `name` | String | User’s full name |
| `email` | String | Unique email used for login |
| `password` | String (hashed) | Encrypted password |
| `role` | String | One of: `student`, `instructor`, `admin` |
| `createdAt` | Date | Account creation date |

Example user document:
```json
{
  "_id": "6719c5404c1f3e95a8fa67b1",
  "name": "Alex Ndung’u",
  "email": "alex@example.com",
  "password": "$2b$10$Kf2...",
  "role": "student",
  "createdAt": "2025-10-20T14:11:00Z"
}

🔐 Authentication Flow
Signup Flow

User fills signup form on signup.html.

Data is sent via POST /api/auth/signup to backend.

Password is hashed using bcrypt.

User is saved to MongoDB.

JWT token is generated and returned.

Login Flow

User submits credentials on login.html.

Request sent to POST /api/auth/login.

Backend verifies email and password.

If valid, JWT token + role returned.

Frontend saves token and redirects user:

student → /frontend/index.html

admin → /frontend/admin.html

instructor → /frontend/instructor.html

🧩 API Reference
Method	Endpoint	Description	Auth Required
POST	/api/auth/signup	Register a new user	❌
POST	/api/auth/login	Authenticate existing user	❌
GET	/api/users/:id	Get user info	✅
PUT	/api/users/:id	Update user profile	✅

Example Login Response:

{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "user": {
    "name": "Alex makau",
    "email": "alex@example.com",
    "role": "student"
  }
}

🧠 Frontend Logic Summary
1️⃣ Login Page (login.html)

Handles user login with Fetch API.

On success, saves user data and token in localStorage.

Redirects based on role.

2️⃣ Dashboard (index.html)

Displays user details (fetched from localStorage).

Shows academic summary, schedule, and announcements.

3️⃣ Settings Page (settings.html)

Loads user data dynamically.

Allows theme switching between dark/light.

Persists preference in localStorage.

4️⃣ Materials & Assignments

Will dynamically load data from future API endpoints (currently mock data).

🧰 Backend Setup Guide
1️⃣ Install Dependencies
cd backend
npm install

2️⃣ Create .env File
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

3️⃣ Run Development Server
npm start


Access backend on http://localhost:5000

💻 Frontend Usage

Open the frontend/login.html file in your browser.

Register or log in using existing credentials.

You’ll be redirected to a personalized dashboard.

Access course materials, assignments, and settings.

🌐 Deployment Guide
Option 1 — Render / Railway (Backend)

Connect GitHub repo.

Add MONGO_URI and JWT_SECRET in Environment Variables.

Deploy automatically.

Option 2 — GitHub Pages (Frontend)

Push /frontend folder to main branch.

Enable GitHub Pages under repository settings.


🧑‍💻 Contribution Guidelines

Fork the repository.

Create a new branch for your feature:

git checkout -b feature-new-function


Make changes and commit:

git commit -m "Added new student feature"


Push and create a Pull Request:

git push origin feature-new-function

🛡️ Security Practices

Passwords hashed using bcrypt before saving.

JWT tokens expire for enhanced security.

API endpoints protected with middleware authentication.

No sensitive credentials stored client-side in plaintext.

🚀 Future Improvements
Feature	Description
AI Tutor Integration	An AI assistant to guide students through coding exercises.
Material Upload via Cloud	Instructors can upload learning materials via Cloudinary.
Gamified Learning	Add points, badges, and leaderboards.
Chat Support	Real-time discussion forum between students and mentors.
Mobile App	Lightweight version for offline access.
🌍 SDG Alignment Summary

Nexus Learning System directly supports SDG 4 — Quality Education by:

Providing equal access to coding and digital education.

Building capacity for teachers through online tools.

Offering job connections and digital inclusion pathways.

“We don’t just teach code — we teach opportunity.”

🧑‍💼 Author & Maintainer

Meshack Matheka
Mordechai Carmon
Founder & Lead Developer — Nexus Learning System
📧 Email: [heliumcarmon@gmail.com
]
📧 Email: [marcasmatheka@gmail.com
]
🌍 GitHub: github.com/sesco001
🌍 GitHub: github.com/Montie-tech

📜 License

This project is licensed under the MIT License — open for use, improvement, and educational deployment.
