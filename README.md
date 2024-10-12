# Blog APIs

This is a backend API for a blog platform built using Node.js, Express.js, MongoDB, and Cloudinary for image uploads. The APIs support user authentication, post creation, post management, and reactions to posts.

## Features

- User authentication (registration, login, account activation)
- CRUD operations for blog posts
- Uploading post images to Cloudinary
- Reacting to blog posts (like, dislike, etc.)
- Fetching user-specific and all posts
- Secure routes using JWT authentication

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js for routing and middleware support.
- **MongoDB**: NoSQL database for storing user and blog data.
- **Mongoose**: ODM library for MongoDB, used for schema-based solutions.
- **Cloudinary**: Cloud service for image and media management.
- **JWT (JSON Web Token)**: Token-based authentication for securing routes.
- **Multer**: Middleware for handling `multipart/form-data` for image uploads.

## Installation

1. Clone the repository:

   ```bash
   git@github.com:marwanMagdy66/Blog-Apis.git
   cd blog


Install dependencies:
npm install


Create a .env file in the root directory and add the following environment variables:
PORT=your_port_number
TOKEN_KEY=your_jwt_secret_key
CONNECTION_URL=your_mongodb_connection_url
USER=your_email_service_user
PASS=your_email_service_password
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
IMAGES_FOLDER=your_cloudinary_folder_name


## API Endpoints
Authentication
Register a new user:
  POST /auth/register
Request body: { "name": "John Doe", "email": "john@example.com", "password": "123456" }
Description: Registers a new user and sends an account activation email.

Activate user account:
GET /auth/activate_account/:token

User login:
POST /auth/login
Request body: { "email": "john@example.com", "password": "123456" }
Description: Logs the user in and returns a JWT token.

## Posts
Create a new post (requires authentication):
POST /create
Middleware: isAuth, fileUpload().single("image")
Description: Creates a new post and uploads an image to Cloudinary.


Update a post (requires authentication):
PATCH /update/:id
URL params: id (Post ID)
Middleware: isAuth, fileUpload().single("image")
Description: Updates the content and image of an existing post.


Delete a post (requires authentication):
DELETE /delete/:id
URL params: id (Post ID)
Middleware: isAuth
Description: Deletes a post by ID.

Get all posts:
GET /allPosts

Get posts by the logged-in user (requires authentication):
GET /userPosts
Middleware: isAuth
Description: Fetches posts created by the logged-in user.

Get a single post by ID:
GET /:id


## Reactions
Create a reaction to a post (requires authentication):
POST /create-React
Middleware: isAuth
Description: Creates a new reaction (like, dislike) to a post.


Update a reaction (requires authentication):
PATCH /update-React/:id
URL params: id (Reaction ID)
Middleware: isAuth
Description: Updates an existing reaction.


Delete a reaction (requires authentication):
DELETE /delete-React/:id
URL params: id (Reaction ID)
Middleware: isAuth
Description: Deletes a reaction by ID.


## Environment Variables

The following environment variables must be set in the .env file:

PORT: The port number on which the server will run.
TOKEN_KEY: JWT secret key for signing tokens.
CONNECTION_URL: MongoDB connection URL.
USER: Email service username for sending account activation emails.
PASS: Email service password.
CLOUD_NAME: Cloudinary cloud name for media storage.
API_KEY: Cloudinary API key for authentication.
API_SECRET: Cloudinary API secret for authentication.
IMAGES_FOLDER: Folder name on Cloudinary where uploaded images will be stored.




