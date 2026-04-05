# Portfolieo Backend

This repository contains the backend API for the Portfolieo project. It is built with Node.js, Express, and MongoDB, and it is configured to run on Vercel using the `src/main.js` entry point.

## Features

- Authentication with admin setup and JWT login
- Protected routes using Bearer token authorization
- CRUD APIs for projects, skills, profile, about, certificates, and messages
- Image upload support using Cloudinary
- MongoDB connection via Mongoose
- Centralized error handling and success response formatting

## Getting Started

### Prerequisites

- Node.js 18+ / 20+
- npm
- MongoDB database (Atlas or local)
- Cloudinary account for image upload

### Install dependencies

```bash
npm install
```

### Environment Variables

Copy `config/.env.dev` to a local `.env` file or set the variables in your environment.

Required variables:

- `DB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `EMAIL` - Admin email for initial setup
- `PASSWORD` - Admin password for initial setup
- `SALT_ROUND` - bcrypt salt rounds (default: `10`)
- `PORT` - local development port
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

Optional email configuration (used by mail features if available):

- `GMAIL_USER`
- `GMAIL_PASSWORD`
- `TOKEN_SIGNATURE`

### Run locally

```bash
npm run start:dev
```

This will start the app using `node --watch ./src/main.js` while not in production.

### Production

```bash
npm start
```

## Vercel Configuration

The `vercel.json` file directs all incoming requests to `src/main.js`, so the app is served as a single Node.js server entrypoint.

## API Endpoints

### Public

- `GET /` - Welcome message
- `GET /ping` - Health check and DB status
- `POST /upload` - Upload an image file to Cloudinary with field `image`

### Auth

- `POST /auth/setup` - Create the first admin user from `EMAIL` and `PASSWORD` env values
- `POST /auth/login` - Login and receive a JWT token

Request body for login:

```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

### Projects

- `GET /project` - Get all projects
- `POST /project` - Create a new project (protected)
- `PUT /project/:id` - Update a project by ID (protected)
- `DELETE /project/:id` - Delete a project by ID (protected)

### Messages

- `POST /message` - Send a new message
- `GET /message` - Get all messages (protected)
- `DELETE /message/:id` - Delete a message by ID (protected)

### Profile

- `GET /profile` - Get profile data
- `PUT /profile` - Update profile data (protected)

### Skills

- `GET /skills` - Get all skills
- `POST /skills` - Create a new skill (protected)
- `DELETE /skills/:id` - Delete a skill by ID (protected)

### About

- `GET /about` - Get about page data
- `PUT /about` - Update about page data (protected)

### Certificates

- `GET /certificates` - Get all certificates
- `POST /certificates` - Add a certificate
- `PUT /certificates/:id` - Update a certificate by ID
- `DELETE /certificates/:id` - Delete a certificate by ID

## Authentication

Protected routes require the Authorization header with a Bearer token:

```http
Authorization: Bearer <token>
```

The token is returned from `POST /auth/login`.

## Notes

- `src/main.js` starts the Express app and attaches all route modules.
- The database connection is authenticated on each request before routing.
- Error handling is centralized using `globalErrorHandling`.
- `config/.env.dev` contains a sample environment configuration, but secrets should never be committed to source control.

## Project Structure

- `src/main.js` - application entry point
- `src/bootstrap.app.js` - exports the Express app for serverless / testing usage
- `src/modules` - API modules and route controllers
- `src/DB` - database connection and Mongoose models
- `src/common/utils` - response helpers, security utilities, Cloudinary config
- `config/config.service.js` - environment configuration loader

## License

This project uses the `ISC` license.
