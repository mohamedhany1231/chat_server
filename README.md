# 💬 Chat Server Backend

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)  
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)  
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

> **Backend API for a real-time chat application** with user authentication, Prisma ORM, and Socket.IO for instant messaging.

---

## 📋 Overview

This project is a **real-time chat server** built with TypeScript and Express. It supports multiple users, rooms, and instant messaging using Socket.IO. Prisma ORM handles database interactions for user and chat data.

---

## ✨ Key Features

### 🔐 Authentication & Security
- JWT-based authentication  
- Role-based access (optional)  
- Password hashing with bcrypt  
- Input validation and sanitization  

### 💬 Real-Time Chat
- **Socket.IO integration** for instant messaging  
- Multiple rooms / channels support  
- User presence and typing indicators  
- Message broadcasting and private messaging  

### 🗄️ Database & ORM
- Prisma ORM for database modeling  
- PostgreSQL / SQLite support (configurable)  
- User, message, and room models  

### 🧩 Utilities
- Error handling with centralized middleware  
- Async wrapper for controller functions  
- Structured project architecture for scalability  

---

## 🏗️ Project Structure

```bash
chat_server/
├── controllers/       # Business logic
├── routes/            # API endpoints
├── prisma/            # Prisma schema & client
├── utils/             # Helper functions & middleware
├── app.ts             # Express app initialization
├── server.ts          # HTTP server & Socket.IO setup
├── socket.ts          # Socket.IO event handlers
├── peerServer.ts      # Peer server integration (if used)
├── tsconfig.json      # TypeScript config
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+  
- PostgreSQL or SQLite  
- npm or yarn  

### Installation
1. Clone the repository
```bash
git clone https://github.com/mohamedhany1231/chat_server.git
cd chat_server
```

2. Install dependencies
```bash
npm install
```

3. Set up `.env` file
```env
DATABASE_URL=your_database_url_here
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Run Prisma migrations
```bash
npx prisma migrate dev
```

5. Start the server
```bash
# Development with hot reload
npm run dev

# Production
npm start
```

---

## 🔌 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user |

### 💬 Chat
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/api/rooms`          | List all chat rooms |
| POST   | `/api/rooms`          | Create a new room |
| GET    | `/api/messages/:roomId` | Fetch messages for a room |

### 🧠 Socket.IO Events
| Event | Description |
|-------|-------------|
| `connect` | Establish connection |
| `message` | Send message to room |
| `joinRoom` | Join a specific room |
| `leaveRoom` | Leave room |
| `typing` | Typing indicator |

---

## 🧩 Data Models

### 👤 User
```ts
{
  id: string,
  name: string,
  email: string,
  password: string,
  createdAt: Date
}
```

### 💬 Message
```ts
{
  id: string,
  roomId: string,
  senderId: string,
  content: string,
  timestamp: Date
}
```

### 🏠 Room
```ts
{
  id: string,
  name: string,
  members: [User references]
}
```

---

## 👥 Team
- **Backend & Web Development:** Mohamed Hany ([GitHub](https://github.com/mohamedhany1231))  

---

## 🔒 Security Features
- JWT authentication  
- Password hashing with bcrypt  
- Input sanitization and validation  
- Rate limiting (optional)  

---

## 📈 Performance & Monitoring
- Real-time message delivery via Socket.IO  
- User presence tracking  
- Scalable architecture for multiple rooms and users  

---

<div align="center">
**Real-Time Chat Server – Backend Service** © 2025
</div>
