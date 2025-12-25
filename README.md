# GearBazar  
### B2B Marketplace (Under Development)

GearBazar is a **B2B startup project** aimed at building a marketplace where sellers can list and sell **spare parts and auto-electrical components** directly to buyers.

The application is currently **under construction** and is being developed in **phases**, starting with a scalable backend architecture.

---

## 🚧 Project Status

> **Under Development**  
> This repository currently contains the **backend foundation** of the GearBazar platform.

---

## 🧰 Tech Stack

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  

### Frontend (Planned)
- React  
- Tailwind CSS  

---

## ⚙️ Current Backend Features

- Seller data modeling using **Mongoose**
- Seller **registration and login**
- Secure password hashing using **bcrypt**
- CRUD APIs for seller management
- Modular **MVC architecture**
- API testing via **Postman / Thunder Client**

## API Overview (Current Phase)

Base URL: /api

### Seller APIs

| Method | Endpoint              | Description                  |
|------- |----------------------|------------------------------|
| POST   | /api/sellers/register | Register a new seller        |
| POST   | /api/sellers/login    | Authenticate seller          |
| GET    | /api/sellers          | Fetch all sellers            |
| GET    | /api/sellers/:id      | Fetch seller by ID           |
| PUT    | /api/sellers/:id      | Update seller details        |
| DELETE | /api/sellers/:id      | Delete seller                |

> APIs tested using Postman. Authentication currently uses hashed passwords.


---

## 🔗 API Endpoints (Seller Module)

**Base URL (local):**


---

## 🛠️ Local Setup (Backend)

```bash
cd server
npm install
npm run dev
```

Create a .env file inside server/:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gearbazar
```
# 🗺️ Roadmap

- JWT-based authentication
- Product listing module
- Order management
- Seller approval system
- Frontend integration
- Admin dashboard

---

## 📖 About the Startup

GearBazar is being developed as a real startup idea and not just a demo project. This repository represents the technical foundation of the platform.

---

## 👨‍💻 Author

**Md Arshi Khan**  
Founder & Developer – GearBazar  
Full-Stack Developer (MERN)




