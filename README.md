# arsalan-ayaz-mern-10pshine: NoteKro - A MERN Stack Note App

[![NoteKro Demo]](Link to Live Demo if available)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repo-blue?style=for-the-badge&logo=github)](https://github.com/arsalan-ayaz-mern-10pshine)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blueviolet?style=for-the-badge)](https://www.mongodb.com/mern-stack)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-007ACC?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## 📝 About NoteKro

**NoteKro** is a modern, full-stack note-taking and productivity application built using the **MERN Stack** (MongoDB, Express, React, Node.js).

It provides a secure and fast experience for users to create, edit, store, and organize notes with a **Rich Text Editor**. The project demonstrates **full-stack development best practices**, including a scalable backend structure, robust authentication, clean component architecture, and comprehensive code quality tooling (SonarQube, Jest).

> **Vision:** NoteKro aims to provide a minimal yet feature-rich note-keeping system that students and professionals can rely on for daily productivity, without unnecessary complexity.

## ✨ Key Features & Best Practices

The application is structured to showcase high-quality development across the backend, frontend, and development lifecycle.

### 🛡️ Backend Features (Node.js/Express)
| Feature Category | Features |
| :--- | :--- |
| **Authentication & Security** | * User Authentication with **JWT & Secure Cookies** |
| | * **Password Reset with Email Verification** |
| | * **Protected Routes & Role-Based Middleware** |
| | * **Helmet + CORS + Rate Limiting** Security Applied |
| **Data & API** | * Notes **CRUD** (Create, Read, Update, Delete) with **Rich Text Support** |
| | * MongoDB + **Mongoose Models with Validation** |
| | * **Error Handling & Response Standardization** |

### 🎨 Frontend Features (React/TypeScript)
| Feature Category | Features |
| :--- | :--- |
| **User Experience** | * **React + TypeScript + Tailwind UI** for a modern, responsive design |
| | * **Rich Text Notes Editor** for detailed note-taking |
| | * **Toast Notifications & Smooth UI Animations** |
| **Architecture** | * **Protected Routing & State Persistence** |
| | * Reusable Components & **Clean Folder Structure** |
| | * Responsive Dashboard Layout with Side Navbar |
| **Integration** | * **API Integration with Axios Interceptors** (for token management) |

### 🛠️ Development & Quality Assurance
| Feature Category | Features |
| :--- | :--- |
| **Testing** | * **Jest & React Testing Library** for Unit + UI Tests |
| **Code Quality** | * **SonarQube Integration** for Code Quality & Bug Detection |
| | * **ESLint & Prettier** Configured for Code Consistency |
| **Version Control** | * GitHub Version Control & **Branching Strategy** followed |

---

## 🔒 Security & Data Protection

NoteKro places a strong emphasis on security by:
* Implementing **JWT Secured Authentication** via HTTP-only cookies.
* Storing user passwords as **encrypted hashes**.
* Utilizing **protected API routes** to ensure authorized access.
* Enforcing server-side **input validation** for all incoming data.
* Applying security headers and policies using **Helmet & CORS** middleware.

---

## 🚀 Getting Started

Instructions on how to set up and run the project locally.

### Prerequisites

* Node.js (v18+)
* MongoDB Instance (Local or Cloud)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/arsalan-ayaz-mern-10pshine/NoteKro.git](https://github.com/arsalan-ayaz-mern-10pshine/NoteKro.git)
    cd NoteKro
    ```

2.  **Install dependencies for both frontend and backend:**
    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `backend` folder and add your configuration (e.g., `MONGO_URI`, `JWT_SECRET`, `EMAIL_HOST`, etc.).

4.  **Run the application:**
    ```bash
    # In the backend directory:
    npm start # or npm run dev

    # In the frontend directory:
    npm run dev
    ```

The application should now be running on your local machine.

---

## 👨‍💻 Author

**Arsalan Ayaz** - MERN Stack Developer | 10Pearl Shine 

---