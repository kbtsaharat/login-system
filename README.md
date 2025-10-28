
# 🧠 Login System (NestJS + PostgreSQL + React)

ระบบจัดการผู้ใช้งานแบบ Full-stack ที่พัฒนาเพื่อสาธิตการเชื่อมต่อระหว่าง **Frontend (React)** และ **Backend (NestJS)**  
พร้อมระบบ **Authentication (JWT)** และฐานข้อมูล **PostgreSQL**

---

## 🚀 Features

### 🖥️ Backend (NestJS)
- ลงทะเบียนผู้ใช้ใหม่ (`/auth/register`)
- เข้าสู่ระบบด้วย JWT (`/auth/login`)
- ดึงข้อมูลโปรไฟล์ (`/users/profile`)
- ใช้ **TypeORM** เชื่อมต่อกับ PostgreSQL
- ใช้ **bcrypt** สำหรับเข้ารหัสรหัสผ่าน
- ปลอดภัยด้วย **Passport JWT Strategy**

### 💡 Frontend (React)
- แบบฟอร์มสมัครสมาชิกและเข้าสู่ระบบ
- จัดการ Token ที่ได้จาก Backend
- แสดงข้อมูลผู้ใช้เมื่อเข้าสู่ระบบสำเร็จ

---

## 🧰 Tech Stack

| ส่วน | เทคโนโลยี |
|------|-------------|
| Frontend | React, Axios, Tailwind CSS |
| Backend | NestJS, TypeORM, Passport, JWT |
| Database | PostgreSQL |
| Tools | Git, Postman, VS Code |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone โปรเจกต์นี้
```bash
git clone https://github.com/kbtsaharat/login-system.git
cd login-system
````

### 2️⃣ ตั้งค่า Backend

```bash
cd backend
npm install
```

สร้างไฟล์ `.env`

```env
# ==== Database Config ====
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=postgres

# ==== JWT Config ====
JWT_SECRET=mySuperSecretKey123
JWT_EXPIRES_IN=1d

# ==== App Config ====
PORT=3000
NODE_ENV=development
```

เริ่มเซิร์ฟเวอร์

```bash
npm run start:dev
```

---

### 3️⃣ ตั้งค่า Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 ทดสอบ API

ใช้ Postman เพื่อเรียก endpoint ต่อไปนี้

| Method | Endpoint         | Description                    |
| ------ | ---------------- | ------------------------------ |
| POST   | `/auth/register` | สมัครสมาชิก                    |
| POST   | `/auth/login`    | เข้าสู่ระบบ                    |
| GET    | `/users/profile` | ดูข้อมูลผู้ใช้ (ต้องส่ง Token) |

---

## 📸 ตัวอย่างการทำงาน

* ✅ ลงทะเบียนผู้ใช้ใหม่
* ✅ เข้าสู่ระบบและได้ JWT Token
* ✅ ใช้ Token เพื่อเข้าถึงข้อมูลโปรไฟล์

---

## 🧑‍💻 ผู้พัฒนา

**KBT-Saharat**
📧 [saharatchanachai@outlook.com](mailto:saharatchanachai@outlook.com)
🌐 [https://github.com/kbtsaharat](https://github.com/kbtsaharat)

---

> 💬 *Project นี้ถูกพัฒนาขึ้นเพื่อศึกษาการทำระบบ Authentication ด้วย NestJS และ React ไม่ได้ใช้ในเชิงพาณิชย์*

````

