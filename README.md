# Blogging Platform Backend

This project is a backend service for a blogging platform. It provides a secure and scalable architecture for managing blogs, users, and admins, using technologies like TypeScript, Node.js, Express.js, and MongoDB.

## Features

1. **User Management**
   - User Registration and Login (with JWT-based authentication)
   - Role-based Access Control (Admin and User roles)
   - User blocking by Admin
2. **Blog Management**
   - CRUD operations for blogs
   - Role restrictions to ensure Admin and Users have appropriate access levels
3. **Public Blog API**
   - Fetch blogs with support for search, sort, and filter
4. **Error Handling**
   - Zod validation errors
   - Authentication/Authorization errors
   - Generic server errors with detailed error responses
5. **Security**
   - Password encryption (e.g., bcrypt)
   - JWT-based user authentication

## Technologies Used

- **Programming Language**: TypeScript
- **Framework**: Node.js with Express.js
- **Database**: MongoDB (Mongoose for schema management)


## API Documentation

### 1. Authentication

#### 1.1 Register User
**POST** `/api/auth/register`

- Request Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "_id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```

#### 1.2 Login User
**POST** `/api/auth/login`

- Request Body:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "token": "string"
    }
  }
  ```

### 2. Blog Management

#### 2.1 Create Blog
**POST** `/api/blogs`

- Request Body:
  ```json
  {
    "title": "My First Blog",
    "content": "This is the content of my blog."
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "Blog created successfully",
    "data": {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": "object"
    }
  }
  ```

#### 2.2 Get All Blogs (Public API)
**GET** `/api/blogs`

- Query Parameters:
  - `search`: Filters blogs containing the specified text.
  - `sortBy`: Field to sort by, e.g., `title` `createdAt`.
  - `sortOrder`: `asc` or `desc`.
  - `filter`: Filter blogs by author ID.

- Example Request URL:
  `/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc`

- Response:
  ```json
  {
    "success": true,
    "message": "Blogs fetched successfully",
    "data": [
      {
        "_id": "string",
        "title": "string",
        "content": "string",
        "author": "object"
      }
    ]
  }
  ```

#### 2.3 Delete Blog
**DELETE** `/api/blogs/:id`

- Requires authentication with user roles.
- Response:
  ```json
  {
    "success": true,
    "message": "Blog deleted successfully"
  }
  ```

### 3. Admin Actions

#### 3.1 Block User
**PATCH** `/api/admin/users/:userId/block`

- Request:
  Admin token in headers.

- Response:
  ```json
  {
    "success": true,
    "message": "User blocked successfully"
  }
  ```

#### 3.2 Delete Blog
**DELETE** `/api/admin/blogs/:id`

- Request:
  Admin token in headers.

- Response:
  ```json
  {
    "success": true,
    "message": "Blog deleted successfully"
  }
  ```

## Deployment

The server is deployed at: **https://blogproject-swart-beta.vercel.app/**

## Additional Resources

- Admin Credentials:
  - Email: `sujon@gmail.com`
  - Password: `securepassword`

- Project Video Overview: https://drive.google.com/file/d/1uM3VNZ7ON0t6QhliOrGpm2KT2XG_GQc-/view
