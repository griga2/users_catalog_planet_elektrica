# API Documentation

## Base URL

```
VITE_SERVER_HOST: http://localhost:3000
```

## Authentication Endpoints

### Login

**POST** `/auth/loginUser`

**Request Body:**
```json
{
  "login": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "access_token": "string"
}
```

### Get User Data

**POST** `/auth/getUserDate`

**Headers:**
- Authorization: Bearer {token}

**Response:**
```json
{
  "name": "string",
  "role": "string",
  "id": number
}
```

## Catalog Endpoints

### Update Bio

**PUT** `/catalog/updateBio`

**Request Body:**
```json
{
  "userId": number,
  "bio": "string"
}
```

## Time Management Endpoints

### Edit Time (Pending Implementation)

**PUT** `/time/edit`

### Work Time (Pending Implementation)

**GET** `/time/work`

## Organization Endpoints

### Get Structure

**GET** `/org/structure`

**Response:**
```json
{
  "branches": [
    {
      "id": number,
      "name": "string",
      "parent": number | null,
      "workers": [
        {
          "id": number,
          "name": "string",
          "role": "string"
        }
      ]
    }
  ]
}
```

### Update Structure

**PUT** `/org/structure`

**Request Body:**
```json
{
  "branches": [...]
}
```

## Role Management Endpoints

### Get Roles

**GET** `/roles`

**Response:**
```json
{
  "roles": [
    {
      "id": number,
      "name": "string",
      "permissions": ["string"]
    }
  ]
}
```

### Create Role

**POST** `/roles`

**Request Body:**
```json
{
  "name": "string",
  "permissions": ["string"]
}
```

### Update Role

**PUT** `/roles/:id`

**Request Body:**
```json
{
  "name": "string",
  "permissions": ["string"]
}
```

### Delete Role

**DELETE** `/roles/:id`

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

## Rate Limiting

- Max requests: 100 per minute
- Headers:
  - `X-RateLimit-Limit: 100`
  - `X-RateLimit-Remaining: 95`
  - `X-RateLimit-Reset: 1640995200`

## CORS Policy

- Origins: `*` (development), specific domains (production)
- Methods: `GET, POST, PUT, DELETE, OPTIONS`
- Headers: `Content-Type, Authorization`

---

*API documentation for frontend integration*
