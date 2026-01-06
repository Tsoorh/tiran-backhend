# 🔌 Lighting Store E-Commerce Platform (Backend API)

This repository contains the **Server-side API** for a lighting retail e-commerce platform.
Built with **Node.js** and **TypeScript**, connected to a **MongoDB** database. The architecture focuses on RESTful principles, security, and scalability.

---

## 🔗 Related Repositories
This is the Backend repository. You can find the Client-side application here:
* **Frontend Repository:** https://github.com/Tsoorh/tiran-frontend-fixed

---

## 🛠 Tech Stack

* **Runtime:** Node.js
* **Language:** TypeScript
* **Framework:** Express.js
* **Database:** MongoDB
* **Testing:** Jest
* **DevOps tools:** Docker
* **Authentication:** JSON Web Tokens (JWT) & Bcrypt
* **Environment:** Dotenv

---

## 🚀 Key Features

* **RESTful Architecture:** Organized controller-service-repository structure (Separation of Concerns).
* **Type Safety:** Full TypeScript integration with Mongoose schemas and strict typing for request/response objects.
* **Authentication & Authorization:** Secure middleware protecting private routes (Admin/User roles).
* **Advanced Querying:** Support for filtering, sorting, and pagination for products (Lighting fixtures).
* **Error Handling:** Centralized error handling mechanism.
* **Security:** Implemented CORS and secure HTTP headers.

---

## 📂 Project Structure

```bash
src/
```bash
.
├── api/          # API Routes & Controller logic
├── config/       # Application configuration & Environment setup
├── middlewares/  # Custom middleware (Auth, Validation, Error handling)
├── model/        # Mongoose Schemas & Data Models
├── services/     # Business Logic & Service Layer
├── test/         # Unit & Integration tests (Jest)
├── logs/         # Application logs
├── server.ts     # Application entry point
├── Dockerfile    # Docker container configuration
└── jest.config.js # Testing configuration
