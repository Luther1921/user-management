# User Management System

## 📌 Project Overview
This is a **User Management System** built with **Node.js, TypeScript, Express, Prisma ORM, and SQLite**. It includes user authentication, user profiles, address management, and post creation.

## 🚀 Features
- User Registration & Authentication
- Address Management (One-to-One Relationship with User)
- Post Management (One-to-Many Relationship with User)
- Error Handling with Custom Errors
- Prisma ORM for Database Interaction
- Validation with Fast Validator
- Graceful Shutdown Handling

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone <repository-url>
cd user-management
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the project root and configure it:
```env
PORT=5000
DATABASE_URL="file:./dev.db"
```

### 4️⃣ Migrate the Database
Run Prisma migrations to set up the database schema:
```sh
npx prisma migrate dev --name init
```

### 5️⃣ Start the Server
```sh
npm run dev
```
The server will run on `http://localhost:5000`.

---

## 📌 API Endpoints

### 🟢 User Endpoints
#### ✅ Register a User
```http
POST /users
```
**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "phoneNumber": "1234567890"
}
```

#### ✅ Get Users (Paginated)
```http
GET /users?page=1&pageSize=10
```

---

### 🟢 Post Endpoints
#### ✅ Create a Post
```http
POST /posts
```
**Request Body:**
```json
{
  "title": "My First Post",
  "body": "This is the content of the post.",
  "userId": 1
}
```

#### ✅ Get Posts by User (Using Query Parameters)
```http
GET /posts?userId=1
```

---

## 🔥 Additional Notes
- **Graceful Shutdown**: The server handles termination signals (`SIGINT`, `SIGTERM`) to close database connections properly.
- **Validation**: Fast Validator is used for input validation.
- **Error Handling**: Custom error classes ensure consistent error responses.

---

## 📌 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request 🎉

---

## 📜 License
This project is open-source and available under the **MIT License**.

