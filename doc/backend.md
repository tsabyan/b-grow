# Backend Architecture
## LifeGrow - Self Improvement App

---

## 1. Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Runtime | Node.js 20 LTS | JavaScript runtime |
| Framework | Next.js 14+ | Full-stack React framework with App Router |
| Language | TypeScript 5.x | Type safety and developer experience |
| Database | PostgreSQL 15+ | Primary relational database |
| BaaS Platform | Supabase | Backend-as-a-Service (Auth, DB, Storage, Realtime) |
| ORM | Drizzle ORM | Type-safe database queries |
| Validation | Zod 3.x | Runtime schema validation |
| State Management | Zustand 4.x | Lightweight client state |
| Date Utilities | date-fns 3.x | Date manipulation |
| Charts | Recharts 2.x | Data visualization |
| Icons | Lucide React | Icon library |

---

## 2. Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   │
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   ├── page.tsx              # Dashboard home/overview
│   │   │
│   │   ├── habits/               # Habit tracking module
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   └── [id]/
│   │   │
│   │   ├── cashflow/             # Financial management module
│   │   │   ├── page.tsx          # Transactions list
│   │   │   ├── budgets/
│   │   │   ├── categories/
│   │   │   └── goals/
│   │   │
│   │   ├── fitness/              # Fitness tracking module
│   │   │   ├── page.tsx          # Weight tracker
│   │   │   ├── workouts/
│   │   │   ├── nutrition/
│   │   │   └── progress/
│   │   │
│   │   ├── wellness/             # Wellness tracking module
│   │   │   ├── page.tsx          # Daily check-in
│   │   │   ├── sleep/
│   │   │   ├── mood/
│   │   │   └── meditation/
│   │   │
│   │   ├── insights/             # Cross-module insights
│   │   │   └── page.tsx
│   │   │
│   │   ├── profile/              # User profile & settings
│   │   │   ├── page.tsx
│   │   │   └── settings/
│   │   │
│   │   └── achievements/         # Gamification
│   │       └── page.tsx
│   │
│   ├── api/                      # API Routes (see api.md)
│   │   ├── habits/
│   │   ├── transactions/
│   │   ├── fitness/
│   │   ├── wellness/
│   │   └── insights/
│   │
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
│
├── components/                   # React Components (see frontend.md)
│   ├── ui/                       # Base UI components
│   ├── habits/                   # Habit-specific components
│   ├── cashflow/                 # Cashflow components
│   ├── fitness/                  # Fitness components
│   ├── wellness/                 # Wellness components
│   └── shared/                   # Shared components
│
├── lib/                          # Core Libraries & Utilities
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client
│   │   ├── server.ts             # Server Supabase client
│   │   ├── middleware.ts         # Auth middleware
│   │   └── admin.ts              # Admin client (service role)
│   │
│   ├── db/
│   │   ├── index.ts              # Drizzle instance
│   │   ├── schema/               # Database schemas (Drizzle)
│   │   │   ├── users.ts
│   │   │   ├── habits.ts
│   │   │   ├── transactions.ts
│   │   │   ├── fitness.ts
│   │   │   ├── wellness.ts
│   │   │   └── index.ts
│   │   └── migrations/           # SQL migrations
│   │
│   ├── validations/              # Zod validation schemas
│   │   ├── habit.ts
│   │   ├── transaction.ts
│   │   ├── fitness.ts
│   │   ├── wellness.ts
│   │   └── user.ts
│   │
│   ├── utils/                    # Utility functions
│   │   ├── date.ts               # Date helpers
│   │   ├── format.ts             # Number/text formatting
│   │   ├── calculations.ts       # BMI, wellness score, etc.
│   │   └── cn.ts                 # classNames utility
│   │
│   └── constants/                # App constants
│       ├── categories.ts         # Default categories
│       ├── achievements.ts       # Achievement definitions
│       └── config.ts             # App configuration
│
├── services/                     # Business Logic Layer
│   ├── habits/
│   │   ├── habit.service.ts      # Habit CRUD operations
│   │   ├── streak.service.ts     # Streak calculations
│   │   └── habit.types.ts        # Type definitions
│   │
│   ├── cashflow/
│   │   ├── transaction.service.ts # Transaction management
│   │   ├── budget.service.ts     # Budget tracking & alerts
│   │   ├── category.service.ts   # Category management
│   │   └── cashflow.types.ts
│   │
│   ├── fitness/
│   │   ├── weight.service.ts     # Weight logging & trends
│   │   ├── workout.service.ts    # Workout logging
│   │   ├── nutrition.service.ts  # Meal & macro tracking
│   │   └── fitness.types.ts
│   │
│   ├── wellness/
│   │   ├── checkin.service.ts    # Daily check-in
│   │   ├── sleep.service.ts      # Sleep tracking
│   │   ├── mood.service.ts       # Mood logging
│   │   └── wellness.types.ts
│   │
│   ├── gamification/
│   │   ├── points.service.ts     # Point system & levels
│   │   ├── achievement.service.ts # Achievement tracking
│   │   └── level.service.ts      # Level progression
│   │
│   └── insights/
│       ├── correlation.service.ts # Cross-module correlations
│       └── recommendation.service.ts # AI recommendations
│
├── actions/                      # Next.js Server Actions
│   ├── habits.ts                 # Habit actions
│   ├── transactions.ts           # Transaction actions
│   ├── fitness.ts                # Fitness actions
│   ├── wellness.ts               # Wellness actions
│   └── user.ts                   # User profile actions
│
├── hooks/                        # Custom React Hooks
│   ├── use-auth.ts               # Authentication hook
│   ├── use-habits.ts             # Habits data hook
│   ├── use-transactions.ts       # Transactions data hook
│   ├── use-weight.ts             # Weight data hook
│   ├── use-wellness.ts           # Wellness data hook
│   └── use-debounce.ts           # Debounce utility hook
│
├── store/                        # Zustand Global State
│   ├── auth.store.ts             # Auth state
│   ├── app.store.ts              # App-wide state
│   └── ui.store.ts               # UI state (modals, sidebar, etc.)
│
└── types/                        # TypeScript Type Definitions
    ├── database.types.ts         # Supabase auto-generated types
    ├── habit.types.ts
    ├── transaction.types.ts
    ├── fitness.types.ts
    ├── wellness.types.ts
    └── common.types.ts
```

---

## 3. Service Layer Architecture

### Service Responsibilities

Each service module is responsible for:
- **Data Access**: CRUD operations via Drizzle ORM
- **Business Logic**: Calculations, validations, rules
- **Side Effects**: Point awards, notifications, alerts
- **Data Transformation**: Converting DB records to domain models

### Service Organization

| Service | Responsibilities |
|---------|------------------|
| **Habit Service** | Create habits, track completions, calculate streaks, manage schedules |
| **Streak Service** | Streak calculations, milestone detection, streak recovery logic |
| **Transaction Service** | Log income/expense, categorization, recurring transactions |
| **Budget Service** | Budget creation, spending tracking, alert triggers (80%, 100%) |
| **Category Service** | Category CRUD, default categories, icon management |
| **Weight Service** | Weight logging, BMI calculation, trend analysis, goal tracking |
| **Workout Service** | Exercise logging, progressive overload tracking |
| **Nutrition Service** | Meal logging, macro calculations, calorie tracking |
| **Check-in Service** | Daily check-in processing, mood/energy/stress tracking |
| **Sleep Service** | Sleep duration/quality tracking, pattern analysis |
| **Wellness Service** | Wellness score calculation (weighted algorithm) |
| **Points Service** | Point awards, level progression, XP calculation |
| **Achievement Service** | Achievement unlocking, progress tracking |
| **Correlation Service** | Cross-module pattern detection |
| **Recommendation Service** | AI-powered suggestions based on user data |

---

## 4. Business Logic Highlights

### Streak Calculation
- Consecutive day counting from completion history
- Handles skipped days and streak breaks
- Updates longest streak records
- Triggers milestone achievements (7, 30, 100 days)

### Wellness Score Algorithm
Weighted 100-point scoring system:
- **Sleep Quality**: 25% (duration + quality rating)
- **Mood**: 20% (1-10 scale)
- **Stress**: 15% (inverted 1-10 scale)
- **Physical Activity**: 20% (steps, workouts)
- **Hydration**: 10% (water intake vs. 8 glasses)
- **Habit Completion**: 10% (daily completion rate)

### Budget Alert System
- Tracks spending per category per month
- Sends alerts at 80% and 100% of budget
- Alert flags prevent duplicate notifications
- Recalculates on each transaction

### Point System
Point values:
- Habit completion: 10 pts
- 7-day streak: 50 pts
- 30-day streak: 200 pts
- Transaction log: 5 pts
- Budget adherence: 100 pts
- Weight log: 10 pts
- Workout: 25 pts
- Daily check-in: 15 pts

Level progression: Beginner → Novice → Intermediate → Advanced → Expert → Master → Legend

---

## 5. Data Flow

### Request Flow
1. **Client** → Server Action or API Route
2. **Validation** → Zod schema validation
3. **Authentication** → Supabase Auth check
4. **Authorization** → RLS policies (database level)
5. **Service Layer** → Business logic execution
6. **Database** → Drizzle ORM query
7. **Response** → Data transformation & return

### State Management Flow
- **Server State**: React Server Components + Server Actions
- **Client State**: Zustand for UI state, auth state
- **Optimistic Updates**: Client updates before server confirmation
- **Revalidation**: `revalidatePath()` after mutations

---

## 6. Dependencies

### Core Dependencies
```
next@^14.0.0
react@^18.2.0
@supabase/supabase-js@^2.39.0
@supabase/ssr@^0.1.0
drizzle-orm@^0.29.0
zod@^3.22.0
zustand@^4.4.0
date-fns@^3.0.0
recharts@^2.10.0
lucide-react@^0.300.0
```

### Development Dependencies
```
typescript@^5.3.0
drizzle-kit@^0.20.0
tailwindcss@^3.4.0
eslint@^8.0.0
prettier@^3.0.0
```

---

## 7. Environment Configuration

Required environment variables:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
DATABASE_URL (optional, for direct connection)
NEXT_PUBLIC_APP_URL
```

---

## 8. Performance Considerations

- **Server Components**: Use RSC for data fetching where possible
- **Streaming**: Leverage Next.js streaming for faster page loads
- **Database Indexes**: Optimized indexes on frequently queried columns
- **Caching**: React cache() for deduplication, Next.js cache for CDN
- **Code Splitting**: Dynamic imports for heavy components
- **Image Optimization**: Next.js Image component

---

## 9. Testing Strategy

| Type | Coverage Target | Tools |
|------|----------------|-------|
| Unit Tests (Services) | 80% | Vitest |
| Integration Tests (API) | 70% | Vitest + Supabase |
| E2E Tests | Critical flows | Playwright |
| Component Tests | 60% | React Testing Library |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-07 | Engineering | Initial architecture |
| 1.1 | 2026-01-07 | Engineering | Refactored, removed code examples |
