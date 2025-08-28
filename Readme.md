# Chat App

A full-stack real-time chat application built with React, Redux, Node.js, Express, MongoDB, and Socket.IO. Users can sign up, log in, add friends, and chat with each other in real time. Image sharing and friend management features are included.

## Features

- User authentication (signup, login)
- Real-time messaging with Socket.IO
- Add and manage friends
- Image sharing in chat
- Responsive UI with React and Tailwind CSS
- Conversation history and infinite scroll
- Avatar and profile management

## Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS, Socket.IO Client
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.IO
- **Cloud Storage:** Cloudinary (for image uploads)

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create a .env file with your MongoDB URI, JWT secret, and Cloudinary credentials
   npm start
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the `backend` directory with:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

## Usage

- Visit `http://localhost:5173` in your browser.
- Sign up or log in.
- Add friends by username or email.
- Start chatting and share images!

## Folder Structure

```
chat-app/
  ├── backend/
  │   ├── src/
  │   └── ...
  ├── frontend/
  │   ├── src/
  │   └── ...
  └── Readme.md
```

## License

MIT

## Author