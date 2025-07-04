# Chatty

This is a real-time chat application built with the MERN stack.

## Features

  * **User Authentication:** Secure user signup and login functionality.
  * **Real-time Chat:** Instant messaging between users powered by Socket.IO.
  * **Online Status:** See which users are currently online.
  * **Image Sharing:** Share images within your conversations.
  * **Profile Customization:** Users can update their profile pictures.
  * **Responsive Design:** A clean and modern UI that works on various screen sizes.

## Tech Stack

### Frontend

  * **React:** A JavaScript library for building user interfaces.
  * **Vite:** A fast build tool and development server for modern web projects.
  * **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
  * **DaisyUI:** A component library for Tailwind CSS.
  * **Zustand:** A small, fast, and scalable state-management solution.
  * **Axios:** A promise-based HTTP client for making requests to the backend.
  * **React Router:** For declarative routing in the application.

### Backend

  * **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
  * **Express:** A minimal and flexible Node.js web application framework.
  * **MongoDB:** A NoSQL database for storing application data.
  * **Mongoose:** An elegant mongodb object modeling for node.js.
  * **Socket.IO:** Enables real-time, bidirectional and event-based communication.
  * **JSON Web Tokens (JWT):** For securing the application and authenticating users.
  * **Cloudinary:** A cloud-based image and video management service for storing user profile pictures and shared images.
  * **bcrypt:** A library for hashing passwords.
  * **cors:** For enabling Cross-Origin Resource Sharing.

## Getting Started

### Prerequisites

  * Node.js (v18 or higher recommended)
  * npm
  * MongoDB instance (local or cloud-based)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/S-Bhargavii/chat-app.git
    cd chat-app
    ```

2.  **Install dependencies:**
    The root `package.json` file is configured to install dependencies for both the `frontend` and `backend` directories simultaneously.

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `backend` directory. You can use the `.env.example` as a template.

    ```
    PORT=5001
    MONGODB_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<your_cloudinary_api_key>
    CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
    ```

### Running the Application

1.  **Start the backend server:**
    This command will start the backend server, which will be accessible at `http://localhost:5001` by default.

    ```bash
    npm start
    ```

2.  **Start the frontend development server:**
    This command will start the Vite development server for the frontend, which will be accessible at `http://localhost:5173` by default.

    ```bash
    cd frontend
    npm run dev
    ```

## API Endpoints

### Auth Routes (`/api/auth`)

  * `POST /signup`: Register a new user.
  * `POST /login`: Log in an existing user.
  * `POST /logout`: Log out the current user.
  * `PUT /update-profile`: Update the profile of the authenticated user.
  * `GET /check-auth`: Check the authentication status of the user.

### Message Routes (`/api/message`)

  * `GET /users`: Get all users for the sidebar.
  * `GET /:id`: Get messages with a specific user.
  * `POST /send/:id`: Send a message to a specific user.

## Project Structure

```
chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── lib/              # Helper modules (DB, cloudinary, socket, utils)
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API routes
│   │   └── index.js          # Backend entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── lib/              # Helper modules (axios, utils)
│   │   ├── pages/            # Page components
│   │   ├── store/            # Zustand state management
│   │   ├── App.jsx           # Main App component
│   │   └── main.jsx          # Frontend entry point
│   └── package.json
└── package.json              # Root package.json
```

## License

This project is licensed under the ISC License. See the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.
