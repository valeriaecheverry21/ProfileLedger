# Profile Ledger API

Backend API for the "My Profile" section of a Marketplace. This service integrates user personal information, points system, and detailed transaction history.

## Features

- **User Profile**: Retrieve user information including name, email, points level (Gold, Silver, Bronze), and account restrictions
- **Purchase History**: Paginated list of user purchases with product details
- **Purchase Detail**: Extended information including seller name, payment status, and shipping status

## Tech Stack

- Node.js
- Express.js
- Layered Architecture (Routes → Controllers → Services)
- In-memory JSON data storage

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd profileleadger
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode (development/production) | development |
| `PORT` | Server port | 3000 |

## API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

---

### Get User Profile
Returns user profile with points level and account restrictions.

**Endpoint:** `GET /users/:userId/profile`

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| userId | integer | User ID |

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Ana García",
    "email": "ana.garcia@email.com",
    "pointsLevel": "Gold",
    "accountRestrictions": {
      "hasDebt": false,
      "isBlocked": false,
      "blockReason": null
    }
  }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid user ID
- `404 Not Found` - User not found

---

### Get Purchase History (Paginated)
Returns paginated list of user purchases.

**Endpoint:** `GET /users/:userId/purchases`

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| userId | integer | User ID |

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | integer | 1 | Page number (must be > 0) |
| limit | integer | 10 | Items per page (1-100) |

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 16,
      "date": "2024-03-25T09:15:00Z",
      "product": "Desk Lamp",
      "quantity": 1,
      "totalPrice": 34.99
    },
    {
      "id": 5,
      "date": "2024-03-01T11:00:00Z",
      "product": "Mechanical Keyboard",
      "quantity": 1,
      "totalPrice": 159.99
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 6,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid user ID, page, or limit
- `404 Not Found` - Page not found

---

### Get Purchase by ID
Returns basic purchase information.

**Endpoint:** `GET /purchases/:purchaseId`

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| purchaseId | integer | Purchase ID |

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "userId": 1,
    "date": "2024-01-15T10:30:00Z",
    "product": "Wireless Headphones",
    "quantity": 1,
    "totalPrice": 129.99
  }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid purchase ID
- `404 Not Found` - Purchase not found

---

### Get Purchase Detail
Returns extended purchase information including seller, payment status, and shipping status.

**Endpoint:** `GET /purchases/:purchaseId/detail`

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| purchaseId | integer | Purchase ID |

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "purchaseId": 1,
    "sellerName": "TechStore Official",
    "paymentStatus": "Approved",
    "shippingStatus": "Delivered"
  }
}
```

**Possible Payment Statuses:**
- `Pending`
- `Approved`
- `Rejected`

**Possible Shipping Statuses:**
- `Preparing`
- `In Transit`
- `Delivered`

**Error Responses:**
- `400 Bad Request` - Invalid purchase ID
- `404 Not Found` - Purchase detail not found

---

## Project Structure

```
src/
├── app.js                 # Express app configuration
├── server.js              # Entry point
├── data/
│   └── data.json          # Mock data (users, purchases, details)
├── routes/
│   └── apiRoutes.js       # API route definitions
├── controllers/
│   ├── userController.js
│   ├── purchaseController.js
│   └── purchaseDetailController.js
├── services/
│   ├── userService.js
│   ├── purchaseService.js
│   └── purchaseDetailService.js
├── middleware/
│   ├── errorHandler.js    # Global error handling
│   └── notFound.js        # 404 handler
└── utils/
    └── appError.js        # Custom error class
```

## Data Models

### User
```json
{
  "id": 1,
  "name": "string",
  "email": "string",
  "pointsLevel": "Gold|Silver|Bronze",
  "accountRestrictions": {
    "hasDebt": "boolean",
    "isBlocked": "boolean",
    "blockReason": "string|null"
  }
}
```

### Purchase
```json
{
  "id": 1,
  "userId": 1,
  "date": "ISO 8601 date string",
  "product": "string",
  "quantity": "integer",
  "totalPrice": "number"
}
```

### Purchase Detail
```json
{
  "purchaseId": 1,
  "sellerName": "string",
  "paymentStatus": "Pending|Approved|Rejected",
  "shippingStatus": "Preparing|In Transit|Delivered"
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

## Development

### Adding New Data
Edit `src/data/data.json` to add new users, purchases, or purchase details.

### Architecture
This project follows a layered architecture:
- **Routes**: Define endpoints and HTTP methods
- **Controllers**: Handle HTTP requests/responses, validate input
- **Services**: Contain business logic and data manipulation

## License

ISC