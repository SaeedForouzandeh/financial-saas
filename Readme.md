# 💰 Financial SaaS - Smart Financial Management Software | نرم‌افزار مدیریت مالی هوشمند

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Electron](https://img.shields.io/badge/electron-27.1.3-9cf)
![React](https://img.shields.io/badge/react-18.3.1-61dafb)
![NestJS](https://img.shields.io/badge/nestjs-10.2.8-ea2845)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## 📋 Table of Contents | فهرست مطالب

- [English](#english)
- [فارسی](#فارسی)

---

# English

## 🌟 Introduction

**Financial SaaS** is a professional and comprehensive financial management software built with modern technologies. This software can be used as a desktop application (with Electron) and web-based, providing complete features for managing finances of companies and businesses.

## ✨ Features

### 🎨 UI/UX
- ✅ **Dark/Light theme** with instant switching
- ✅ **Glassmorphism UI** inspired by macOS
- ✅ **Full Persian & English support** (RTL/LTR)
- ✅ **Smooth animations** with Framer Motion
- ✅ **Floating windows** with minimize/maximize/close
- ✅ **macOS-style Dock** at the bottom

### 🔐 Authentication & Security
- ✅ **Login/Register system** with username and password
- ✅ **Default user:** `admin / admin`
- ✅ **Role-based route protection**
- ✅ **Session storage** in localStorage

### 💼 Financial Management
- ✅ **Professional dashboard** with interactive charts
- ✅ **Product management** (add/edit/delete)
- ✅ **Company & employee management** with salary tracking
- ✅ **Invoice system** with PDF/Excel export
- ✅ **Automatic tax & discount calculation**
- ✅ **Financial reports** (profit/loss, balance sheet, etc.)

### 📊 Analytics & Business Intelligence
- ✅ **Advanced charts** with Recharts
- ✅ **Profit/Loss analysis** (numerical & graphical)
- ✅ **Smart suggestions** based on financial data
- ✅ **Sales forecast** (monthly & quarterly)

### 🖥️ Tech Stack

#### Frontend (Electron + React)
| Technology | Purpose |
|-----------|---------|
| React 18 | Core library |
| TypeScript | Type safety |
| Electron | Desktop app |
| Vite | Builder & dev server |
| TailwindCSS | Styling |
| Framer Motion | Animations |
| Recharts | Charts |
| Lucide React | Icons |
| jsPDF | PDF export |

#### Backend (NestJS)
| Technology | Purpose |
|-----------|---------|
| NestJS | Backend framework |
| Prisma | ORM & database |
| PostgreSQL | Main database |
| Redis | Cache & session |
| JWT | Authentication |
| Passport | Auth strategies |
| bcrypt | Password hashing |

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- npm 8+
- Docker (optional)
- PostgreSQL (via Docker or local)

### Quick Start

#### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-repo/financial-saas.git
cd financial-saas
```

#### 2️⃣ Install dependencies
```bash
npm install
```

#### 3️⃣ Setup database with Docker (optional)
```bash
docker run -d --name financial-postgres -e POSTGRES_DB=financial_saas -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secure_password123 -p 5432:5432 postgres:15-alpine
```

#### 4️⃣ Configure environment
```bash
cd packages/backend
cp .env.example .env
# Edit .env file with your database info
```

#### 5️⃣ Run backend
```bash
cd packages/backend
npm run dev
# Backend runs on http://localhost:4000
```

#### 6️⃣ Run frontend
```bash
cd packages/frontend
npm run dev
# Frontend runs on http://localhost:3000
```

#### 7️⃣ Run Electron (Desktop app)
```bash
cd packages/frontend
npm run electron
```

#### 8️⃣ Run everything together
```bash
# From root folder
npm run dev
```

## 🔑 Default Users

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin |
| Regular User | user | user |

## 📁 Project Structure

```
financial-saas/
├── packages/
│   ├── backend/           # NestJS backend
│   │   ├── src/
│   │   │   ├── auth/      # Authentication
│   │   │   ├── prisma/    # Database models
│   │   │   ├── hr/        # Human resources
│   │   │   ├── payment/   # Payment
│   │   │   └── ai/        # AI analysis
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── package.json
│   │
│   └── frontend/          # React + Electron frontend
│       ├── src/
│       │   ├── components/
│       │   │   ├── auth/      # Login components
│       │   │   ├── Window.tsx # Main window
│       │   │   ├── Dock.tsx   # Bottom dock
│       │   │   ├── Dashboard.tsx
│       │   │   └── ...
│       │   ├── contexts/      # Context API
│       │   ├── utils/         # Helper functions
│       │   └── types/         # TypeScript types
│       ├── electron/          # Electron files
│       │   └── main.cjs
│       └── package.json
│
├── docker-compose.yml     # Docker config
└── package.json           # Root package
```

---

# فارسی

<div dir="rtl" align="right">

## 🌟 معرفی پروژه

**Financial SaaS** یک نرم‌افزار مدیریت مالی حرفه‌ای و کامل است که با استفاده از تکنولوژی‌های مدرن ساخته شده. این نرم‌افزار به صورت دسکتاپ (با Electron) و تحت وب قابل استفاده است و امکانات کاملی برای مدیریت امور مالی شرکت‌ها و کسب‌وکارها ارائه می‌دهد.

## ✨ امکانات پروژه

### 🎨 ظاهر و رابط کاربری
- ✅ **تم دارک و روشن** با قابلیت تغییر لحظه‌ای
- ✅ **رابط کاربری شیشه‌ای (Glassmorphism)** شبیه macOS
- ✅ **پشتیبانی کامل از زبان فارسی و انگلیسی** (RTL/LTR)
- ✅ **انیمیشن‌های نرم و حرفه‌ای** با Framer Motion
- ✅ **پنجره‌های شناور** با قابلیت بزرگ/کوچک کردن و بستن
- ✅ **منوی داک (Dock)** شبیه macOS در پایین صفحه

### 🔐 احراز هویت و امنیت
- ✅ **سیستم ورود و ثبت‌نام** با یوزرنیم و پسورد
- ✅ **کاربر پیش‌فرض:** `admin / admin`
- ✅ **محافظت از مسیرها** بر اساس نقش کاربر
- ✅ **ذخیره سشن** در localStorage

### 💼 مدیریت مالی
- ✅ **داشبورد حرفه‌ای** با نمودارهای تعاملی
- ✅ **مدیریت محصولات** با قابلیت افزودن/ویرایش/حذف
- ✅ **مدیریت شرکت‌ها و کارمندان** با ثبت حقوق
- ✅ **سیستم فاکتور** با خروجی PDF و Excel
- ✅ **محاسبه خودکار مالیات و تخفیف**
- ✅ **گزارشات مالی** متنوع (سود و زیان، ترازنامه و ...)

### 📊 تحلیل و هوش تجاری
- ✅ **نمودارهای پیشرفته** با Recharts
- ✅ **تحلیل سود و زیان** به صورت عددی و نموداری
- ✅ **پیشنهادات هوشمند** بر اساس داده‌های مالی
- ✅ **پیش‌بینی فروش** ماهانه و فصلی

### 🖥️ تکنولوژی‌های استفاده شده

#### فرانت‌اند (Electron + React)
| تکنولوژی | کاربرد |
|----------|--------|
| React 18 | کتابخانه اصلی |
| TypeScript | تایپ‌سیفتی |
| Electron | ساخت برنامه دسکتاپ |
| Vite | بیلدر و سرور توسعه |
| TailwindCSS | استایل‌دهی |
| Framer Motion | انیمیشن |
| Recharts | نمودارها |
| Lucide React | آیکون‌ها |
| jsPDF | خروجی PDF |

#### بک‌اند (NestJS)
| تکنولوژی | کاربرد |
|----------|--------|
| NestJS | فریمورک بک‌اند |
| Prisma | ORM و مدیریت دیتابیس |
| PostgreSQL | دیتابیس اصلی |
| Redis | کش و سشن |
| JWT | احراز هویت |
| Passport | استراتژی‌های احراز هویت |
| bcrypt | هش کردن رمز |

## 🚀 راه‌اندازی پروژه

### پیش‌نیازها
- Node.js 18+
- npm 8+
- Docker (اختیاری)
- PostgreSQL (با Docker یا نصب محلی)

### نصب و اجرا

#### 1️⃣ کلون کردن پروژه
```bash
git clone https://github.com/your-repo/financial-saas.git
cd financial-saas
```

#### 2️⃣ نصب وابستگی‌ها
```bash
npm install
```

#### 3️⃣ راه‌اندازی دیتابیس با Docker (اختیاری)
```bash
docker run -d --name financial-postgres -e POSTGRES_DB=financial_saas -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secure_password123 -p 5432:5432 postgres:15-alpine
```

#### 4️⃣ تنظیم محیط
```bash
cd packages/backend
cp .env.example .env
# ویرایش فایل .env با اطلاعات دیتابیس
```

#### 5️⃣ اجرای بک‌اند
```bash
cd packages/backend
npm run dev
# بک‌اند روی http://localhost:4000 اجرا می‌شود
```

#### 6️⃣ اجرای فرانت‌اند
```bash
cd packages/frontend
npm run dev
# فرانت‌اند روی http://localhost:3000 اجرا می‌شود
```

#### 7️⃣ اجرای Electron (برنامه دسکتاپ)
```bash
cd packages/frontend
npm run electron
```

#### 8️⃣ اجرای همزمان همه با هم
```bash
# از پوشه اصلی
npm run dev
```

## 🔑 کاربران پیش‌فرض

| نقش | یوزرنیم | رمز عبور |
|------|---------|----------|
| مدیر کل | admin | admin |
| کاربر عادی | user | user |

```

## 🛠️ عیب‌یابی مشکلات رایج

### ۱. خطای `Cannot find module`
```bash
npm install
```

### ۲. خطای اتصال به دیتابیس
```bash
# چک کنید دیتابیس روشن است
docker ps

# یا دیتابیس را ریستارت کنید
docker restart financial-postgres
```

### ۳. خطای `ERR_FILE_NOT_FOUND` در Electron
```bash
cd packages/frontend
npm run build
npm run electron
```

## 📜 مجوز

این پروژه تحت لیسانس MIT منتشر شده است.

## 👥 توسعه‌دهندگان

- تیم توسعه Financial SaaS

---

**نرم‌افزار حسابداری و مدیریت مالی هوشمند - ساخته شده با ❤️ در ایران**

</div>