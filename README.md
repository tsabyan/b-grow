# LifeGrow - Self Improvement Platform

A comprehensive self-improvement platform built with Next.js 14+, Supabase, and TypeScript. Track habits, manage finances, monitor fitness, and improve wellness all in one place.

## 🚀 Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL via Supabase
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS 4.x
- **State Management**: Zustand
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 20 LTS or higher
- pnpm (recommended) or npm
- Supabase account ([sign up here](https://supabase.com))
- Git

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/tsabyan/b-grow.git
cd b-grow
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Update the `.env.local` file with your Supabase credentials:

```env
# Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database connection (optional, for Drizzle migrations)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

**How to get Supabase credentials:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select existing one
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon/public** key
5. Copy the **service_role** key (keep this secret!)

### 4. Database Setup

Run Drizzle migrations to set up your database schema:

```bash
pnpm drizzle-kit push
```

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── habits/            # Habit tracking components
│   ├── cashflow/          # Financial components
│   ├── fitness/           # Fitness components
│   └── wellness/          # Wellness components
├── lib/                   # Core libraries
│   ├── supabase/         # Supabase client configuration
│   ├── db/               # Drizzle ORM setup
│   ├── validations/      # Zod schemas
│   └── utils/            # Utility functions
├── services/              # Business logic layer
├── actions/               # Next.js Server Actions
├── hooks/                 # Custom React hooks
├── store/                 # Zustand state management
└── types/                 # TypeScript type definitions
```

## 🧪 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
```

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.example`
5. Deploy!

Vercel will automatically deploy on every push to the `main` branch.

## 📚 Documentation

- [Product Requirements](./doc/PRD.md)
- [Architecture](./doc/architecture.md)
- [Backend Documentation](./doc/backend.md)
- [Frontend Documentation](./doc/frontend.md)
- [Database Schema](./doc/database.md)
- [Security Policies](./doc/security.md)
- [API Documentation](./doc/api.md)

## 🎯 Features

- **Habit Tracking**: Build and maintain positive habits with streak tracking
- **Cashflow Management**: Track income, expenses, and budgets
- **Fitness Tracking**: Monitor weight, workouts, and nutrition
- **Wellness Monitoring**: Daily check-ins, sleep, and mood tracking
- **Gamification**: Points, levels, and achievements
- **Cross-Module Insights**: AI-powered correlations and recommendations

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or issues, contact the development team.
