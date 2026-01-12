# 🚀 GearBazar  
### B2B Auto-Parts Marketplace (Backend-First Architecture)

GearBazar is a **B2B marketplace startup project** designed to connect **automobile spare-parts sellers** with **buyers such as workshops, garages, and mechanics**.

This project is being developed using a **backend-first, production-oriented approach**, focusing on **scalability, security, and real business workflows** before frontend integration.

> ⚠️ Status: **Actively under development (MVP Phase)**

---

## 🧠 Product Vision

Unlike generic e-commerce platforms, **GearBazar is inventory-driven and fitment-aware**.

### Core ideas:
- Role-based system: **Buyer / Seller / Admin**
- Admin-approved sellers & products (trust + quality control)
- Structured part numbers (OEM / Aftermarket)
- Vehicle-fitment based product modeling
- Sellers can also act as buyers (role flexibility)

This repository represents the **engineering foundation of a real startup**, not a demo project.

---

## 🧰 Tech Stack

### Backend (Implemented)
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Tokens)**
- **bcrypt**
- **Nodemailer (Mailtrap for email testing)**

### Frontend (Planned)
- React / Next.js  
- Tailwind CSS  

---

## 🏗️ Backend Architecture Highlights

- Clean **MVC architecture**
- Modular routes & controllers
- Centralized error handling
- Secure authentication & authorization
- Role-based access control (RBAC)
- Snapshot-based order modeling
- Soft-delete & audit-friendly design

---

## 🔐 Authentication & Security

- User registration & login with **hashed passwords**
- **JWT-based authentication**
- Role-based authorization middleware
- Password reset flow:
  - Secure reset token generation
  - Token hashing before DB storage
  - Email-based reset links (Mailtrap)
- Sensitive fields hidden using `select: false`

---

## 📦 Implemented Backend Features

### 👤 Users
- Register & login
- JWT authentication
- View & update own profile
- Change password
- Forgot / reset password via email

### 🧑‍💼 Sellers
- Seller profile management
- Admin-controlled approval workflow
- Seller-product ownership model

### 🛒 Products
- Seller/Admin product creation
- Admin approval & rejection
- Public product listing (no login required)
- Product visibility based on approval status
- Stock management
- Seller-specific dashboards

### 📑 Orders
- Buyer creates orders
- Role-based order views:
  - Buyer → own orders
  - Seller → orders for own products
  - Admin → all orders (including soft-deleted)
- Order lifecycle:
  - CREATED → CONFIRMED → DELIVERED
  - Cancellation with stock restoration
- Product & buyer snapshots for consistency

---

## 🌐 API Overview

Base URL: `/api`

### Auth APIs
| Method | Endpoint |
|------|---------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| POST | `/api/auth/forgot-password` |
| PUT | `/api/auth/reset-password/:token` |

### User APIs
| Method | Endpoint |
|------|---------|
| GET | `/api/users/me` |
| PUT | `/api/users/me` |

### Seller APIs
| Method | Endpoint |
|------|---------|
| GET | `/api/sellers` |
| GET | `/api/sellers/:id` |
| PUT | `/api/sellers/:id` |
| DELETE | `/api/sellers/:id` |

### Product APIs
| Method | Endpoint |
|------|---------|
| GET | `/api/products` |
| GET | `/api/products/:id` |
| POST | `/api/products` |
| PUT | `/api/products/:id/approve` |
| PUT | `/api/products/:id/reject` |
| PUT | `/api/products/:id/stock` |

### Order APIs
| Method | Endpoint |
|------|---------|
| POST | `/api/orders` |
| GET | `/api/orders` |
| PUT | `/api/orders/:id/confirm` |
| PUT | `/api/orders/:id/cancel` |
| PUT | `/api/orders/:id/deliver` |

> All APIs are tested using **Postman** with real JWT flows.

---

## 🛠️ Local Development Setup

### Clone repository
```bash
git clone https://github.com/Khan30-ai/Gear-Bazar.git
```
### Navigate to backend 
```bash
cd GearBazar/server
```
### Install dependencies
```bash
npm install
```
## Environment variables
create a .env file locally inside server/
#### Required variables (example)
```bash
PORT = PORT_NUMBER
MOPMGODB_URI = MONGODB_URI
JWT_SECRET= jwtsecretkey
```
### Start development server
```bash
npm run dev
```
### 🗺️ Roadmap
 #### ✅ Completed
- Backend architecture
- Authentication & authorizaton
- Product & order systems
- Role based access control
- Password reset workflow

 #### 🔜 Planned
 - Frontend(React.js + Tailwind)
 - Search and filtering (part number ,fitment)
 - Seller onboarding improvements
 - Admin dashboard
 - Payments & logistic integration


## 👨‍💻 Author

**Md Arshi Khan**  
Founder & Developer – GearBazar  
Full-Stack Developer (MERN)





