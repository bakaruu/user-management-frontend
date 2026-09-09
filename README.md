# 🧩 User Management Frontend

Angular frontend for the User Management API.

A minimal but functional SPA that demonstrates end-to-end integration with a secured Spring Boot REST API using JWT authentication and role-based access control.

> 🧠 **Note:** This frontend is intentionally simple — the focus of this project is the backend architecture. The UI exists to demonstrate that the API works correctly end-to-end.

---

## ⚙️ Technologies Used

| | Technology |
|--|------------|
| 🅰️ | Angular 19 |
| 🔷 | TypeScript |
| 🔐 | JWT Authentication |
| 🛡️ | Route Guards |
| 🔄 | HTTP Interceptors |

---

## ✨ Features

| | Feature |
|--|---------|
| 🔐 | Login and registration |
| 👤 | User profile view and edit |
| 🧑‍💼 | Admin dashboard — list, suspend, delete users |
| 🛡️ | Route protection by role (USER / ADMIN) |
| 🔄 | JWT automatically attached to every request |
| ♻️ | Silent access-token refresh on expiry — no re-login required mid-session |

---

## 🔗 Related Repository

This frontend consumes the User Management API: 👉 [user-management-api](https://github.com/bakaruu/user-management-api)

⚠️ `API_URL` is currently hardcoded in `src/app/services/auth.service.ts` and `src/app/services/user.service.ts`. To run against your own local backend instead, change it to `http://localhost:8080` in both files.

---

## 🚀 Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/bakaruu/user-management-frontend.git
cd user-management-frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the application**
```bash
ng serve
```

**4. Open in browser**
http://localhost:4200

---

## 📡 Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/login` | Public | Login form |
| `/register` | Public | Registration form |
| `/profile` | USER | View and edit own profile |
| `/dashboard` | ADMIN | User management panel |

---

## 🔑 Test Credentials

To test the admin dashboard, use the following credentials:

| Role | Email | Password |
|------|-------|----------|
| ADMIN | admin@test.com | password123 |

> ⚠️ **Note:** The `/auth/register` endpoint always creates `USER`-role accounts by design — there's no privilege-escalation path through the API. The first admin account is seeded directly into the database, a one-time bootstrap step for any system with role-based access control.
