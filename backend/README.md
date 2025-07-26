# Clothing Store Backend API

A comprehensive REST API for a clothing store e-commerce platform built with Express.js, Sequelize ORM, and MySQL.

## Features

- 🔐 **Authentication & Authorization** - JWT-based user authentication
- 👤 **User Management** - Registration, login, profile management
- 🛍️ **Product Management** - CRUD operations for products with categories
- ❤️ **Favorites System** - Users can favorite/unfavorite products
- 🛒 **Shopping Cart** - Full cart management functionality
- 📂 **Category Management** - Hierarchical product categories
- 🔍 **Search & Filtering** - Product search with various filters
- 📱 **CORS Enabled** - Ready for frontend integration
- 🛡️ **Security** - Rate limiting, helmet, input validation
- 📊 **Database Seeding** - Pre-populated with sample data

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Authentication:** JWT (jsonwebtoken)
- **Security:** Helmet, CORS, Rate Limiting
- **Validation:** Express Validator
- **Password Hashing:** bcryptjs

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   cd Clothing_Store_Website/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=clothing_store_db
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   
   FRONTEND_URL=http://localhost:3000
   ```

4. **Create MySQL Database**
   ```sql
   CREATE DATABASE clothing_store_db;
   ```

5. **Run Database Migrations & Seeding**
   ```bash
   npm run seed
   ```

6. **Start the Server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| GET | `/profile` | Get user profile | Yes |

### Product Routes (`/api/products`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all products (with filters) | No |
| GET | `/:id` | Get single product by ID/slug | No |
| POST | `/` | Create new product | Yes |

### Category Routes (`/api/categories`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all categories | No |
| GET | `/:id` | Get single category by ID/slug | No |
| POST | `/` | Create new category | Yes |

### Favorites Routes (`/api/favorites`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user's favorites | Yes |
| POST | `/` | Add product to favorites | Yes |
| POST | `/toggle` | Toggle favorite status | Yes |
| DELETE | `/:productId` | Remove from favorites | Yes |

### Cart Routes (`/api/cart`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user's cart | Yes |
| POST | `/` | Add item to cart | Yes |
| PUT | `/:id` | Update cart item quantity | Yes |
| DELETE | `/:id` | Remove item from cart | Yes |
| DELETE | `/` | Clear entire cart | Yes |

## Request/Response Examples

### User Registration
```bash
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "mobileNumber": "1234567890",
  "password": "password123",
  "gender": "Male",
  "country": "Cambodia",
  "city": "Phnom Penh"
}
```

### User Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "telephone": "john@example.com",
  "password": "password123"
}
```

### Get Products with Filters
```bash
GET /api/products?category=1&search=shirt&minPrice=10&maxPrice=50&page=1&limit=20
```

### Add to Cart
```bash
POST /api/cart
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2,
  "selectedColor": "blue",
  "selectedSize": "M"
}
```

## Database Schema

### Users Table
- id, firstName, lastName, email, mobileNumber
- password (hashed), gender, country, city
- isActive, lastLogin, createdAt, updatedAt

### Products Table
- id, name, slug, description, originalPrice, salePrice
- discount, image, colors (JSON), sizes (JSON)
- categoryId, stock, sku, isActive, isFeatured
- tags (JSON), weight, dimensions (JSON)

### Categories Table
- id, name, slug, description, parentId
- isActive, sortOrder, createdAt, updatedAt

### Favorites Table
- id, userId, productId, createdAt, updatedAt

### CartItems Table
- id, userId, productId, quantity
- selectedColor, selectedSize, priceAtTime
- createdAt, updatedAt

## Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **Rate Limiting** - Prevents API abuse
- **CORS Protection** - Configurable cross-origin requests
- **Input Validation** - Comprehensive request validation
- **SQL Injection Protection** - Sequelize ORM prevents SQL injection

## Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Run database seeder

### Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/             # Route controllers
├── middleware/              # Custom middleware
├── models/                  # Sequelize models
├── routes/                  # API routes
├── utils/                   # Utility functions
├── server.js               # Main server file
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
