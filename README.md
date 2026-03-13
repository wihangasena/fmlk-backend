# FMLK E-commerce Backend Server

A complete backend API server for an e-commerce platform built with Node.js, Express, MongoDB, and JWT authentication

## Features

- 🔐 JWT-based authentication with bcrypt password hashing
- 👤 User registration, login, and profile management
- 🛍️ Product catalog with filtering and search
- 🛒 Shopping cart management
- ❤️ Wishlist functionality
- 📦 Order placement and tracking
- 👨‍💼 Admin role for product and order management
- 🔒 Protected routes with role-based access control

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) account (or local MongoDB installation)
- npm or yarn package manager

## Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - The `.env` file has already been created with your MongoDB URI
   - **IMPORTANT:** Update the `JWT_SECRET` in `.env` to a secure random string before deploying to production
   - You can generate a secure secret with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

4. **Verify your .env file contains:**
   ```env
   MONGO_URI=mongodb+srv://pcwihanganimsara_db_user:RczoSIyXfRwamYmi@cluster0.zkbzzex.mongodb.net/?appName=Cluster0
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   PORT=5000
   JWT_EXPIRE=7d
   ```

## Running the Server

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── productController.js  # Product CRUD operations
│   ├── cartController.js     # Cart management
│   ├── wishlistController.js # Wishlist management
│   └── orderController.js    # Order processing
├── middleware/
│   ├── auth.js              # JWT verification & authorization
│   └── errorHandler.js      # Global error handling
├── models/
│   ├── User.js              # User schema
│   ├── Product.js           # Product schema
│   ├── Cart.js              # Cart schema
│   ├── Wishlist.js          # Wishlist schema
│   └── Order.js             # Order schema
├── routes/
│   ├── authRoutes.js        # Authentication endpoints
│   ├── productRoutes.js     # Product endpoints
│   ├── cartRoutes.js        # Cart endpoints
│   ├── wishlistRoutes.js    # Wishlist endpoints
│   └── orderRoutes.js       # Order endpoints
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
└── server.js               # Application entry point
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/updatedetails` - Update user details (Protected)
- `PUT /api/auth/updatepassword` - Update password (Protected)

### Products (`/api/products`)
- `GET /api/products` - Get all products (supports filtering)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart (`/api/cart`)
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:itemId` - Update cart item (Protected)
- `DELETE /api/cart/:itemId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Wishlist (`/api/wishlist`)
- `GET /api/wishlist` - Get user wishlist (Protected)
- `POST /api/wishlist/:productId` - Add to wishlist (Protected)
- `DELETE /api/wishlist/:productId` - Remove from wishlist (Protected)
- `DELETE /api/wishlist` - Clear wishlist (Protected)

### Orders (`/api/orders`)
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/pay` - Update order to paid (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

## Authentication

All protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Example Registration Request:
```json
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Example Login Request:
```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Example Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5f483f8d2e123abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

## Example API Usage

### Add Product to Cart:
```json
POST /api/cart
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "productId": "60d5f483f8d2e123abc123",
  "quantity": 2,
  "size": "M",
  "color": "Blue"
}
```

### Create Order:
```json
POST /api/orders
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "orderItems": [
    {
      "product": "60d5f483f8d2e123abc123",
      "name": "Summer Dress",
      "quantity": 1,
      "size": "M",
      "price": 49.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Colombo",
    "state": "Western",
    "zipCode": "00100",
    "country": "Sri Lanka"
  },
  "paymentMethod": "credit_card",
  "itemsPrice": 49.99,
  "taxPrice": 4.99,
  "shippingPrice": 5.00,
  "totalPrice": 59.98
}
```

## Security Best Practices

1. **Change JWT_SECRET**: Before deploying, change the `JWT_SECRET` in `.env` to a strong, unique value
2. **HTTPS**: Always use HTTPS in production
3. **Rate Limiting**: Consider adding rate limiting middleware
4. **Input Validation**: Add validation for all user inputs
5. **MongoDB Security**: Use strong passwords and IP whitelist for MongoDB Atlas

## Database Collections

The server creates the following MongoDB collections:
- `users` - User accounts
- `products` - Product catalog
- `carts` - Shopping carts
- `wishlists` - User wishlists
- `orders` - Order records

## Error Handling

All endpoints return responses in the following format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Development

To modify or extend the API:

1. **Add new models** in `/models`
2. **Create controllers** in `/controllers`
3. **Define routes** in `/routes`
4. **Add middleware** in `/middleware` if needed
5. **Register routes** in `server.js`

## Testing

You can test the API using:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)
- cURL commands

## Troubleshooting

### MongoDB Connection Issues:
- Verify your MongoDB URI in `.env`
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure MongoDB credentials are correct

### Port Already in Use:
- Change the PORT in `.env` file
- Or kill the process using port 5000: `npx kill-port 5000`

### Module Not Found:
- Run `npm install` to install all dependencies
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

## License

ISC

## Support

For issues or questions, please create an issue in the project repository.
