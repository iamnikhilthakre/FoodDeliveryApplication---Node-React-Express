# 🍔 Food Delivery App

A full-stack Food Delivery Application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The project allows users to browse food items, manage their cart, place orders, and track order status, while admins can manage restaurants, food items, and customer orders.

## 🚀 Features

### User Features
- User Registration & Login
- JWT Authentication
- Browse Restaurants & Food Items
- Search Food Items
- Add/Remove Items from Cart
- Place Orders
- View Order History
- Track Order Status

### Admin Features
- Admin Dashboard
- Add/Edit/Delete Food Items
- Manage Restaurants
- Manage Orders
- View Users

### Additional Features
- Role-Based Access Control
- Secure Password Hashing with bcrypt
- RESTful API Architecture
- MongoDB Atlas Integration
- Responsive UI
- Redux Toolkit State Management
- Socket.IO Ready for Real-Time Updates

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- Socket.IO

---

## 📁 Project Structure

```text
FoodDeliveryApp/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── socket/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/food-delivery-app.git
cd food-delivery-app
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

---

## 📡 API Modules

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`

### Food
- GET `/api/foods`
- POST `/api/foods`

### Orders
- GET `/api/orders`
- POST `/api/orders`

### Restaurants
- GET `/api/restaurants`
- POST `/api/restaurants`

---

## 🔐 Authentication

The application uses JSON Web Tokens (JWT) for authentication.

After login:

1. User receives a JWT token.
2. Token is stored on the client side.
3. Protected routes require a valid token.
4. Admin routes require both authentication and admin role verification.

---

## 🗄️ Database Models

### User
- Name
- Email
- Password
- Role

### Restaurant
- Name
- Image
- Address
- Rating

### Food
- Name
- Description
- Price
- Category
- Restaurant Reference

### Order
- User Reference
- Ordered Items
- Total Price
- Status

---

## 📈 Future Improvements

- Razorpay Payment Integration
- Google Maps Integration
- Live Delivery Tracking
- Push Notifications
- Reviews & Ratings
- Wishlist Feature
- Coupon System
- Email Notifications
- PDF Invoice Generation

---

## 🎯 Learning Outcomes

This project helped strengthen understanding of:

- REST API Development
- Authentication & Authorization
- MongoDB Relationships
- Redux State Management
- Frontend-Backend Integration
- Scalable Project Structure
- Deployment Workflows

---

## 🚀 Deployment

Frontend can be deployed on:
- Vercel

Backend can be deployed on:
- Render

Database:
- MongoDB Atlas

---

## 👨‍💻 Author

Developed as a full-stack MERN project for learning scalable application architecture, authentication, database design, and modern web development practices.
