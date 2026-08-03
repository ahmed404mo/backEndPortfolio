<h1 align="center">Portfolio Backend API</h1>

<p align="center">
  The <strong>REST API</strong> powering the Ahmed Mokhtar portfolio — content management, authentication & contact notifications.
  <br />
  Node.js + Express 5 · MongoDB (Mongoose 9) · JWT · Cloudinary uploads · Nodemailer email alerts.
</p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" />
  <img alt="JWT" src="https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white" />
  <img alt="Cloudinary" src="https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white" />
  <img alt="Nodemailer" src="https://img.shields.io/badge/Nodemailer-Email-EA4335?logo=gmail&logoColor=white" />
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-Deploy-000000?logo=vercel&logoColor=white" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

**Portfolio Backend API** is the server side of a developer portfolio. It exposes a clean **REST API** that the frontend uses to:

- Serve **profile, about, projects, skills & certificates** publicly
- Accept **contact messages** from visitors — and instantly **email** the owner via Nodemailer
- Let the owner **authenticate** (JWT) and manage all content through protected endpoints
- **Upload images** to Cloudinary

It runs as a single Express app on **Node.js** with **MongoDB/Mongoose**, and is configured for **Vercel** serverless deployment via `vercel.json`.

---

## Features

### Content Management 🗂️
- **Profile** — single-record header/home data (name, headline, bio, avatar, resume, social links)
- **About** — single-record "about" section
- **Projects** — CRUD (title, description, image, links, tags)
- **Skills** — add/remove skills (public read)
- **Certificates** — CRUD (title, issuer, date, image, link)

### Contact & Notifications 📬
- **Contact messages** — visitors submit name/email/subject/message
- **Email alert** — every message triggers a branded HTML email to the owner (Nodemailer + Gmail)
- **Admin inbox** — protected endpoints to read/delete messages

### Auth & Security 🔐
- **Admin setup** — `POST /auth/setup` creates the first admin from env credentials (bcrypt/argon2 hashed)
- **JWT login** — `POST /auth/login` returns a signed Bearer token
- **Protected routes** — `authMiddleware` guards all mutating endpoints
- **Image uploads** — multer (memory storage) + Cloudinary, returns the public URL

### API Design 🧱
- Centralized **success / error response** wrappers
- Global **error-handling middleware** + 404 handler
- Per-request **DB connection check** before routing
- `/keep-alive` & `/ping` health checks (keeps MongoDB awake on free tiers)

---

## Architecture

```
        ┌────────────────────────────────────────────────────────────┐
 Client │  GET  /profile /about /project /skills /certificates      │
────────┼  POST /message (contact form)                              │
        │  POST /auth/setup · /auth/login → JWT                      │
        │  PUT/DELETE ... (Bearer token protected)                   │
        └──────────────────────┬─────────────────────────────────────┘
                               │ Express app (bootstrap.app.js)
                               │  ├── cors · json · urlencoded
                               │  ├── DB check per request
                               │  ├── module routers (/auth /project /message
                               │  │      /profile /skills /about /certificates)
                               │  └── global error handler + 404
                               ▼
                        ┌─────────────┐
                        │   MongoDB   │  ← Mongoose models
                        └──────┬──────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
              Cloudinary            Nodemailer (Gmail)
            (image uploads)         (message notifications)
```

---

## Tech Stack

| Layer       | Technology                                              |
|-------------|---------------------------------------------------------|
| Runtime     | Node.js 18+ (ESM, `type: module`)                       |
| Framework   | Express 5                                               |
| Database    | MongoDB + Mongoose 9 (Atlas or local)                   |
| Auth        | JWT (`jsonwebtoken`), bcrypt + argon2 hashing           |
| Media       | Cloudinary (`cloudinary` v2) + multer                   |
| Email       | Nodemailer (Gmail SMTP)                                 |
| Uploads     | multer (in-memory buffer → Cloudinary)                  |
| HTTP        | CORS, express.json (50mb)                               |
| Deployment  | Vercel (`vercel.json` → `src/main.js`)                  |

---

## Project Structure

```text
config/
└── config.service.js              # Loads env vars (dotenv → config/.env.dev)

src/
├── main.js                        # Entry point (exports the app for Vercel)
├── bootstrap.app.js               # Express app — middleware, routers, errors
├── DB/
│   ├── connection.db.js           # MongoDB connect + authenticateDB()
│   ├── database.repository.js     # Shared CRUD helpers
│   └── models/                    # user · profile · about · certificate ·
│                                  # project · skill · message
├── modules/                       # Feature modules (controller + service)
│   ├── auth/                      # setup + login (JWT)
│   ├── profile/                   # get / update
│   ├── about/                     # get / update
│   ├── project/                   # CRUD (protected)
│   ├── skill/                     # get / add / delete
│   ├── certificate/               # CRUD
│   └── message/                   # create (email alert) / list / delete
├── middleware/
│   └── auth.middleware.js         # Bearer-token guard
└── common/utils/
    ├── cloudinary.config.js       # multer + uploadToCloudinary()
    ├── email/sendEmail.js         # Nodemailer HTML template
    ├── response/                  # success.response · error.response
    └── security/                  # hash · compare · token helpers
```

---

## Data Model

> Full definitions in `src/DB/models/` (Mongoose).

| Model | Purpose |
|---|---|
| `User` | Admin account (unique email + hashed password) |
| `Profile` | Header/home data (name, headline, bio, avatar, resume, social links) |
| `About` | About-section content |
| `Project` | Portfolio project (title, description, image, tags, links) |
| `Skill` | Skill (category, name, level) |
| `Certificate` | Credential (title, issuer, date, image, link) |
| `Message` | Contact submission (name, email, subject, message) |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **MongoDB** (Atlas or local)
- **Cloudinary** account for image uploads
- Optional **Gmail** app-password for email notifications

### Installation

```bash
# 1. Clone & install
git clone https://github.com/ahmed404mo/backEndPortfolio.git
cd backEndPortfolio
npm install

# 2. Configure environment
cp .env.example config/.env.dev    # config.service loads from config/.env.dev

# 3. Start in development (auto-reload)
npm run start:dev
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `DB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `EMAIL` | Admin email used by `/auth/setup` |
| `PASSWORD` | Admin password used by `/auth/setup` |
| `SALT_ROUND` | bcrypt salt rounds (default `10`) |
| `PORT` | Local port (default `3000`) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `GMAIL_USER` | Gmail address (sender for notifications) |
| `GMAIL_PASSWORD` | Gmail app-password |
| `TOKEN_SIGNATURE` | Optional secondary token signature |

> ⚠️ Never commit real secrets. `.gitignore` already excludes `.env*` and `config/.env.dev`. On Vercel, set these in the dashboard instead.

---

## Running the App

```bash
# Development (watch mode)
npm run start:dev

# Production
npm start
```

---

## API Reference

### Base & Health

| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Welcome message |
| `GET` | `/ping` | Health check + DB_URI status |
| `GET` | `/keep-alive` | Pings MongoDB (keeps it awake) |
| `POST` | `/upload` | Upload image (field `image`) → Cloudinary URL |

### Auth

| Method | Route | Protected | Description |
|---|---|---|---|
| `POST` | `/auth/setup` | — | Create the first admin from `EMAIL`/`PASSWORD` |
| `POST` | `/auth/login` | — | Login → returns JWT token |

### Content

| Method | Route | Protected | Description |
|---|---|---|---|
| `GET` | `/profile` | — | Get profile |
| `PUT` | `/profile` | ✅ | Update profile |
| `GET` | `/about` | — | Get about content |
| `PUT` | `/about` | ✅ | Update about |
| `GET` | `/project` | — | List projects |
| `POST` | `/project` | ✅ | Create project |
| `PUT` | `/project/:id` | ✅ | Update project |
| `DELETE` | `/project/:id` | ✅ | Delete project |
| `GET` | `/skills` | — | List skills |
| `POST` | `/skills` | ✅ | Add skill |
| `DELETE` | `/skills/:id` | ✅ | Delete skill |
| `GET` | `/certificates` | — | List certificates |
| `POST` | `/certificates` | — | Add certificate |
| `PUT` | `/certificates/:id` | — | Update certificate |
| `DELETE` | `/certificates/:id` | — | Delete certificate |

### Messages

| Method | Route | Protected | Description |
|---|---|---|---|
| `POST` | `/message` | — | Send a contact message (emails the owner) |
| `GET` | `/message` | ✅ | List all messages |
| `DELETE` | `/message/:id` | ✅ | Delete a message |

---

## Authentication

Protected routes require a Bearer token:

```http
Authorization: Bearer <token>
```

Obtain the token by logging in:

```bash
curl -X POST https://<host>/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your-password"}'
```

---

## Deployment

Deploy on **Vercel** (Node.js runtime):

1. Import the repo in [Vercel](https://vercel.com/new) — `vercel.json` routes everything to `src/main.js`.
2. Add all environment variables in the dashboard.
3. Optionally add a cron to hit `/keep-alive` so the MongoDB Atlas free tier doesn't sleep.

---

## License

ISC
