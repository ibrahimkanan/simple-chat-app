# Simple Chat App

A full-stack real-time chat application built with the **MERN** stack (MongoDB, Express, React, Node.js) and **Socket.io**.

## Features

- **Authentication & Authorization** using JSON Web Tokens (JWT)
- **Real-time Messaging** with Socket.io
- **Online User Status** dynamically updated
- **Modern UI** built with TailwindCSS and DaisyUI components
- **Global State Management** using Zustand
- **Lightning Fast Frontend** powered by Vite
- **Production Ready** setup suitable for platforms like Render

## Tech Stack

**Frontend:**
- React (Vite)
- TailwindCSS & DaisyUI
- Zustand
- React Hot Toast (Notifications)
- Socket.io-client

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- Socket.io
- JSON Web Tokens (JWT) & bcryptjs for security

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB URI (local or MongoDB Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ibrahimkanan/simple-chat-app.git
   cd simple-chat-app
   ```

2. **Install dependencies:**
   The project has a built-in script that installs both backend and frontend dependencies.
   ```bash
   npm run build
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5003
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=development
   ```

4. **Run the Application:**
   For local development (starts both frontend and backend):
   ```bash
   npm start
   # and in a separate terminal:
   cd frontend
   npm run dev
   ```

## Deployment

This app is configured to be easily deployed on platforms like [Render](https://render.com/). 
The `npm run build` script automatically installs all dependencies and builds the Vite frontend for production, while `npm start` serves the optimized frontend directly from the Express backend.
