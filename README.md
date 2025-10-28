# 🧠 Login System — Fullstack Authentication (Next.js + NestJS + PostgreSQL + Docker)

ระบบจัดการผู้ใช้และ Authentication แบบ Full-stack  
พัฒนาโดยใช้ **Next.js (Frontend)** + **NestJS (Backend)** + **PostgreSQL (Database)**  
รองรับทั้งการใช้งานในเครื่อง (Dev) และบน Server (Production Docker)

---

## 🧩 Tech Stack Overview

| Layer | Tech | Notes |
|--------|------|-------|
| **Frontend** | Next.js (React) + Shadcn/UI + Tailwind CSS | SSR/SSG, modern UI, customizable component |
| **Backend** | NestJS (TypeScript, Node.js) | Modular, scalable, รองรับ REST/GraphQL, ใช้ Dependency Injection |
| **ORM / DB** | TypeORM + PostgreSQL | Type-safe query, auto schema sync |
| **Auth** | JWT (JSON Web Token) | Auth ระหว่าง Backend ↔ Frontend |
| **Infra** | Docker + Docker Compose | รัน environment เดียวกันทุกเครื่อง |
| **CI/CD** | GitHub Actions + Docker Hub *(optional)* | Build/test/deploy อัตโนมัติ |
| **Optional** | FastAPI (Python) | รองรับ microservice ด้าน ML / Data Processing |

---

## 📂 Project Structure

```

login-system/
├── backend/
│   ├── src/
│   │   ├── auth/              # JWT Auth module
│   │   ├── users/             # User CRUD module
│   │   ├── app.module.ts      # Root Nest module
│   │   ├── main.ts            # Entry point
│   │   └── ...
│   ├── .env.production
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── login/             # Login page
│   │   ├── register/          # Register page
│   │   ├── (protected)/       # Dashboard pages
│   │   └── layout.tsx
│   ├── components/ui/         # Reusable UI (shadcn/ui)
│   ├── lib/                   # Utilities & API calls
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.prod.yml
└── README.md

````

---

## ⚙️ Setup Guide

### 🧑‍💻 สำหรับนักพัฒนา (Local Development)

#### 1️⃣ Clone โปรเจกต์
```bash
git clone https://github.com/kbtsaharat/login-system.git
cd login-system
````

#### 2️⃣ ตั้งค่า Environment

**สร้างไฟล์ `backend/.env.development`**

```env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_NAME=my_app_db
JWT_SECRET=mySuperSecretKey123
JWT_EXPIRES_IN=1d
PORT=3000
```

**สร้างไฟล์ `frontend/.env.development`**

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

#### 3️⃣ รันด้วย Docker

```bash
docker compose -f docker-compose.yml up -d --build
```

ระบบที่ได้:

| Service            | URL                                            |
| ------------------ | ---------------------------------------------- |
| Frontend (Next.js) | [http://localhost:5173](http://localhost:5173) |
| Backend (NestJS)   | [http://localhost:3000](http://localhost:3000) |
| pgAdmin            | [http://localhost:5050](http://localhost:5050) |
| PostgreSQL         | localhost:5432                                 |

> pgAdmin login: **[admin@local.com](mailto:admin@local.com) / admin123**

---

### 🚀 สำหรับ Deploy (Production)

> ใช้ `docker-compose.prod.yml` ซึ่งรวม backend + frontend + db + pgAdmin

#### 1️⃣ ตรวจสอบ environment

**`backend/.env.production`**

```env
NODE_ENV=production
DB_HOST=postgres-db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_NAME=my_app_db
JWT_SECRET=mySuperSecretKey123
JWT_EXPIRES_IN=1d
```

**`frontend/.env.production`**

```env
NEXT_PUBLIC_API_URL=http://nest-backend:3000
```

#### 2️⃣ รัน production

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

#### 3️⃣ ตรวจสอบผลลัพธ์

| Container       | Port | Description |
| --------------- | ---- | ----------- |
| `next-frontend` | 5173 | Web UI      |
| `nest-backend`  | 3000 | REST API    |
| `postgres-db`   | 5432 | Database    |
| `pgadmin`       | 5050 | DB UI       |

> เข้าผ่านเบราเซอร์:
> 🌐 [http://localhost:5173/register](http://localhost:5173/register) → สมัครสมาชิก
> 🌐 [http://localhost:5050](http://localhost:5050) → จัดการฐานข้อมูลผ่าน pgAdmin

---

## 🧪 API Endpoints

| Method | Endpoint         | Description                     |
| ------ | ---------------- | ------------------------------- |
| POST   | `/auth/register` | สมัครสมาชิก                     |
| POST   | `/auth/login`    | เข้าสู่ระบบ                     |
| GET    | `/users/profile` | ดึงข้อมูลผู้ใช้ (JWT Protected) |

---

## 🔑 Environment Variables Explained

| Key                           | Description                                     |
| ----------------------------- | ----------------------------------------------- |
| `DB_HOST`                     | Host ของฐานข้อมูล (ใช้ `postgres-db` ใน Docker) |
| `DB_PORT`                     | Port ของ PostgreSQL                             |
| `DB_USERNAME` / `DB_PASSWORD` | บัญชีเชื่อมต่อ DB                               |
| `DB_NAME`                     | ชื่อ Database                                   |
| `JWT_SECRET`                  | คีย์สำหรับเข้ารหัส JWT                          |
| `JWT_EXPIRES_IN`              | อายุ token เช่น `1d`                            |
| `NEXT_PUBLIC_API_URL`         | URL ของ backend (frontend ใช้อ้างอิง)           |

---

## 🧰 Useful Commands

| คำสั่ง                                         | ใช้ทำอะไร                |
| ---------------------------------------------- | ------------------------ |
| `docker ps`                                    | ดู container ที่รันอยู่  |
| `docker logs nest-backend`                     | ดู log ของ backend       |
| `docker exec -it postgres-db psql -U postgres` | เข้าฐานข้อมูล            |
| `docker compose down -v`                       | หยุดและลบ volume ทั้งหมด |

---

## 🧠 Roadmap (Next Steps)

* [ ] เพิ่ม CI/CD ผ่าน GitHub Actions
* [ ] แยก environment (staging / prod)
* [ ] เพิ่ม role-based auth (Admin/User)
* [ ] เพิ่ม FastAPI microservice (optional)

---

## 🧑‍💻 ผู้พัฒนา

**KBT-Saharat**
📧 [saharatchanachai@outlook.com](mailto:saharatchanachai@outlook.com)
🌐 [https://github.com/kbtsaharat](https://github.com/kbtsaharat)

---

> 💬 *Project นี้สร้างขึ้นเพื่อศึกษาและพัฒนา Authentication system
> ด้วย Next.js + NestJS + PostgreSQL + Docker*