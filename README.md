# 🔗 Authenticated URL Shortener

An authenticated URL Shortener application built with **NestJS**, **React**, **TypeScript**, and **MongoDB**.

The application allows users to register, log in securely, create shortened URLs, manage their URLs, and redirect shortened URLs to their original destinations.

---

## 🚀 Features

### Authentication

- User Registration
- User Login
- User Logout
- Password Hashing using bcrypt
- JWT-based Authentication
- Refresh Token Authentication
- HttpOnly Cookie-based Token Storage
- Protected Routes
- Authentication Persistence on Page Refresh

### URL Management

- Create Short URLs
- View User URLs
- Copy Short URL to Clipboard
- Delete URLs
- Redirect Short URLs to Original URLs

### Frontend Features

- React + TypeScript
- Zustand State Management
- React Hook Form
- Zod Validation
- Axios API Integration
- Tailwind CSS
- Toast Notifications
- Route Protection

---

## 🛠️ Tech Stack

### Backend

- NestJS
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt

### Frontend

- React
- TypeScript
- Vite
- Zustand
- React Hook Form
- Zod
- Axios
- Tailwind CSS
- React Hot Toast

---

## 📂 Project Structure

```text
Url-shortner/
│
├── backend/
│   ├── src/
│   ├── README.md
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── README.md
│   └── ...
│
└── README.md
```

---

## 🔐 Authentication Flow

### Registration

```text
User Registration
        ↓
Input Validation
        ↓
Password Hashing
        ↓
User Stored in MongoDB
```

### Login

```text
User Login
      ↓
Credential Validation
      ↓
Generate Access Token
      ↓
Generate Refresh Token
      ↓
Store Tokens in HttpOnly Cookies
```

### Protected Routes

```text
User Request
      ↓
Access Token Validation
      ↓
Authorized Access
```

### Refresh Token Flow

```text
Access Token Expired
          ↓
/auth/refresh
          ↓
New Access Token Generated
          ↓
User Remains Logged In
```

---

## 🔗 URL Shortening Flow

```text
Authenticated User
        ↓
Create Short URL
        ↓
Generate Unique Short Code
        ↓
Store URL in Database
        ↓
Return Short URL
```

### Redirection

```text
User Opens Short URL
          ↓
Lookup Original URL
          ↓
Redirect to Original Destination
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/auth/register` | Register User |
| POST | `/auth/login` | Login User |
| POST | `/auth/logout` | Logout User |
| POST | `/auth/refresh` | Refresh Access Token |
| GET | `/auth/me` | Get Current User |

### URL Management

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/urls` | Create Short URL |
| GET | `/urls` | Get User URLs |
| DELETE | `/urls/:id` | Delete URL |

### Redirect

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/:shortCode` | Redirect to Original URL |

---

## ⚙️ Backend Setup

### Navigate to Backend

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=3000

MONGODB_URI=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### Start Development Server

```bash
npm run start:dev
```

---

## ⚙️ Frontend Setup

### Navigate to Frontend

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_SHORT_URL_BASE=http://localhost:3000
```

### Start Development Server

```bash
npm run dev
```

---

## 🧪 Testing Checklist

### Authentication

- [x] Register User
- [x] Login User
- [x] Logout User
- [x] Refresh Token Flow
- [x] Protected Routes

### URL Management

- [x] Create URL
- [x] Retrieve URLs
- [x] Copy URL
- [x] Delete URL
- [x] Redirect URL

---

## 📸 Demo Flow

```text
Register
    ↓
Login
    ↓
Dashboard
    ↓
Create Short URL
    ↓
Copy Short URL
    ↓
Open Short URL
    ↓
Redirect to Original URL
    ↓
Delete URL
    ↓
Logout
```

---

## 🤖 AI Assistance Disclosure

This project was developed with assistance from ChatGPT.

ChatGPT was used for:

- Architecture discussions
- Authentication flow guidance
- State management discussions
- Form validation integration
- Debugging assistance
- Refactoring suggestions
- Code review support

All implementation, testing, debugging, and final technical decisions were performed manually.

---

## 👨‍💻 Author

Rahul R
