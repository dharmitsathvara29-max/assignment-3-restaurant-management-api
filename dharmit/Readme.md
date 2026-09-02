live link: https://assignment-3-restaurant-management-api-vmtd.onrender.com
Name - Dharmit Sathvara
# Restaurant Management API


A Node.js + Express + MongoDB REST API for managing restaurants and restaurant menu items with JWT-based authentication.

## Project Overview

This API allows users to:

- Register a new user
- Login and receive a JWT token
- View all restaurants
- View a single restaurant
- Add new restaurants
- Update restaurant details
- Delete restaurants
- View restaurant menu items
- Add menu items to a restaurant
- Update menu items
- Delete menu items

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- dotenv for environment configuration

## Project Structure

restaurantmanagementapi/
├── config/
│   └── db.js
├── model/
│   └── restaurant.js
├── router/
│   └── restaurantrouter.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md

## Installation

1. Open the project folder:

   ```bash
   cd restaurantmanagementapi
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following values:

   ```env
   MONGO_URI=mongodb://localhost:27017/authDB
   JWT_SECRET=myrestaurantsecret
   PORT=4000
   ```

   If you are using MongoDB Atlas instead of a local database, replace the `MONGO_URI` value with your Atlas connection string.

## Running the Server

Start the application:

```bash
node server.js
```

The server runs on:

```bash
http://localhost:4000
```

## API Endpoints

### Public Routes

#### GET /
Returns a welcome message.

#### POST /register
Registers a new user.

Request body:

```json
{
  "username": "kartik",
  "email": "kartik@example.com",
  "password": "123456"
}
```

#### POST /login
Logs in the user and returns a JWT token.

Request body:

```json
{
  "email": "kartik@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "<jwt_token>"
}
```

### Protected Routes

These routes require a JWT token in the `Authorization` header.

Format:

```http
Authorization: Bearer <your_token>
```

#### GET /restaurants
Returns all restaurants.

#### GET /restaurants/top
Returns the top 5 restaurants sorted by rating descending.

#### GET /restaurants/:id
Returns one restaurant by id.

#### POST /restaurants
Creates a new restaurant.

Request body example:

```json
{
  "name": "Royal Palace",
  "city": "Bhubaneswar",
  "address": "Near City Center",
  "cuisine": "Indian",
  "rating": 4.8
}
```

#### PUT /restaurants/:id
Updates a restaurant by id.

#### DELETE /restaurants/:id
Deletes a restaurant by id.

#### GET /restaurants/:id/menu
Returns all menu items for a restaurant.

#### POST /restaurants/:id/menu
Adds a menu item to a restaurant.

Request body example:

```json
{
  "name": "Butter Chicken",
  "price": 250,
  "isAvailable": true
}
```

#### PUT /menu/:id
Updates a menu item by id.

#### DELETE /menu/:id
Deletes a menu item by id.

## Authentication Flow

1. User sends email and password to `/login`.
2. Server checks user credentials in MongoDB.
3. Server generates a JWT using `JWT_SECRET`.
4. Client stores the token.
5. Client sends the token in the `Authorization` header for protected routes.
6. Server verifies the token before allowing access.

## MongoDB Models

### Restaurant Model

Fields:

- `name`
- `city`
- `address`
- `cuisine`
- `rating`

### Menu Model

Fields:

- `restaurantId` (Reference to Restaurant)
- `name`
- `price`
- `isAvailable`

### User Model

Fields:

- `username`
- `email`
- `password`

## Important Notes

- Passwords are encrypted using `bcryptjs` before saving.
- JWT tokens are used for route protection.
- `Authorization` must be sent in the format `Bearer <token>`.
- Make sure the `.env` file is not committed to Git.

## Example Login Request

```bash
curl -X POST http://localhost:4000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "pratik@example.com",
    "password": "123456"
  }'
```

## Example Protected Request

```bash
curl http://localhost:4000/restaurants \
  -H "Authorization: Bearer <your_token>"
```

## License

This project is for learning and personal development purposes.

## Developer Notes

This API is a basic backend project designed to practice:
