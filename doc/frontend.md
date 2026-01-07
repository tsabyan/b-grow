# Frontend Architecture
## LifeGrow - Self Improvement App

---

## 1. Frontend Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | Next.js 14+ | React with App Router, SSR, RSC |
| UI Library | React 18.2 | Component-based UI |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS 3.x | Utility-first CSS |
| Components | shadcn/ui | Accessible component primitives |
| State Management | Zustand | Lightweight global state |
| Forms | React Hook Form | Form handling & validation |
| Charts | Recharts | Data visualization |
| Icons | Lucide React | Icon system |
| Animations | Framer Motion | Smooth animations |
| Date Picker | react-day-picker | Calendar selection |

---

## 2. Component Architecture

### Component Organization

```
components/
├── ui/                           # Base UI Components (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── modal.tsx
│   ├── dialog.tsx
│   ├── tabs.tsx
│   ├── toast.tsx
│   ├── progress.tsx
│   ├── badge.tsx
│   └── skeleton.tsx
│
├── layout/                       # Layout Components
│   ├── header.tsx                # Top navigation
│   ├── sidebar.tsx               # Desktop sidebar
│   ├── bottom-nav.tsx            # Mobile bottom navigation
│   ├── dashboard-shell.tsx       # Dashboard wrapper
│   └── page-header.tsx           # Page title + actions
│
├── habits/                       # Habit Module Components
│   ├── habit-card.tsx            # Single habit display
│   ├── habit-form.tsx            # Create/edit habit form
│   ├── habit-list.tsx            # List of habits
│   ├── habit-calendar.tsx        # Calendar view of completions
│   ├── streak-badge.tsx          # Streak counter display
│   ├── habit-stats.tsx           # Statistics cards
│   └── quick-complete.tsx        # Quick complete button
│
├── cashflow/                     # Cashflow Module Components
│   ├── transaction-form.tsx      # Add transaction form
│   ├── transaction-list.tsx      # Transaction history
│   ├── transaction-item.tsx      # Single transaction
│   ├── category-picker.tsx       # Category selector
│   ├── category-badge.tsx        # Category chip
│   ├── budget-card.tsx           # Budget progress card
│   ├── budget-form.tsx           # Set budget form
│   ├── monthly-summary.tsx       # Income/expense summary
│   ├── spending-chart.tsx        # Pie/bar chart
│   └── goal-progress.tsx         # Savings goal tracker
│
├── fitness/                      # Fitness Module Components
│   ├── weight-chart.tsx          # Weight trend line chart
│   ├── weight-form.tsx           # Log weight form
│   ├── weight-stats.tsx          # BMI, change stats
│   ├── workout-card.tsx          # Workout summary card
│   ├── workout-form.tsx          # Log workout form
│   ├── exercise-list.tsx         # Exercise selector
│   ├── meal-entry.tsx            # Log meal form
│   ├── macro-display.tsx         # Protein/carbs/fats display
│   ├── progress-photo.tsx        # Photo upload/gallery
│   └── goal-setter.tsx           # Set fitness goals
│
├── wellness/                     # Wellness Module Components
│   ├── daily-checkin.tsx         # Daily check-in form
│   ├── mood-picker.tsx           # Mood selector (1-10)
│   ├── energy-slider.tsx         # Energy level slider
│   ├── stress-slider.tsx         # Stress level slider
│   ├── sleep-log.tsx             # Log sleep form
│   ├── sleep-chart.tsx           # Sleep duration chart
│   ├── wellness-score.tsx        # Circular progress score
│   ├── wellness-breakdown.tsx    # Score component breakdown
│   ├── meditation-timer.tsx      # Meditation countdown
│   └── gratitude-journal.tsx     # Journal entry
│
├── dashboard/                    # Dashboard Components
│   ├── quick-actions.tsx         # FAB-style quick actions
│   ├── today-habits.tsx          # Today's habit checklist
│   ├── stats-cards.tsx           # Key metric cards
│   ├── insight-card.tsx          # AI insight display
│   ├── recent-transactions.tsx   # Latest transactions
│   └── weekly-summary.tsx        # Week overview
│
├── gamification/                 # Gamification Components
│   ├── points-display.tsx        # Points counter
│   ├── level-badge.tsx           # Current level
│   ├── progress-bar.tsx          # XP to next level
│   ├── achievement-card.tsx      # Achievement display
│   ├── achievement-modal.tsx     # Unlock celebration
│   └── leaderboard.tsx           # (Future) Friend rankings
│
└── shared/                       # Shared Components
    ├── date-picker.tsx           # Calendar date picker
    ├── time-picker.tsx           # Time input
    ├── icon.tsx                  # Icon wrapper
    ├── loading.tsx               # Loading states
    ├── empty-state.tsx           # No data placeholder
    ├── error-boundary.tsx        # Error handling
    ├── confirm-dialog.tsx        # Confirmation modal
    └── page-loader.tsx           # Page transition loader
```

---

## 3. Design System

### Color Palette

```css
:root {
  /* Primary Colors */
  --primary: 263 70% 50%;      /* Purple */
  --primary-foreground: 0 0% 100%;

  /* Secondary Colors */
  --secondary: 220 13% 91%;
  --secondary-foreground: 220 9% 46%;

  /* Accent Colors */
  --accent-success: 142 71% 45%;  /* Green */
  --accent-warning: 38 92% 50%;   /* Orange */
  --accent-danger: 0 72% 51%;     /* Red */
  --accent-info: 217 91% 60%;     /* Blue */

  /* Module Colors */
  --habits-color: 263 70% 50%;     /* Purple */
  --cashflow-color: 142 71% 45%;   /* Green */
  --fitness-color: 0 72% 51%;      /* Red */
  --wellness-color: 217 91% 60%;   /* Blue */

  /* Neutral Colors */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --muted: 210 40% 96%;
  --border: 214 32% 91%;
}

.dark {
  --background: 222 47% 11%;
  --foreground: 213 31% 91%;
  --muted: 223 47% 16%;
  --border: 216 34% 17%;
}
```

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | Inter | 2rem (32px) | 700 |
| H2 | Inter | 1.5rem (24px) | 600 |
| H3 | Inter | 1.25rem (20px) | 600 |
| Body | Inter | 1rem (16px) | 400 |
| Small | Inter | 0.875rem (14px) | 400 |
| Caption | Inter | 0.75rem (12px) | 400 |

### Spacing Scale

Using Tailwind's default spacing scale (4px base):
- xs: 0.5rem (8px)
- sm: 0.75rem (12px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

---

## 4. State Management

### Zustand Stores

#### Auth Store
```typescript
interface AuthStore {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  signIn: (email, password) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (data) => Promise<void>
}
```

#### UI Store
```typescript
interface UIStore {
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  activeModal: string | null
  toggleSidebar: () => void
  setTheme: (theme) => void
  openModal: (modalId) => void
  closeModal: () => void
}
```

#### App Store
```typescript
interface AppStore {
  selectedDate: Date
  setSelectedDate: (date) => void
  filters: FilterState
  setFilters: (filters) => void
}
```

### Server State

Using Next.js Server Components and Server Actions for data fetching:
- No client-side data fetching library needed
- React Server Components fetch data on server
- Server Actions handle mutations
- Optimistic updates with `useOptimistic` hook

---

## 5. Responsive Design

### Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1536px | Extra large |

### Layout Strategy

- **Mobile First**: Design for mobile, enhance for desktop
- **Bottom Navigation**: Mobile uses bottom nav for main sections
- **Sidebar**: Desktop uses persistent sidebar
- **Cards**: Grid layout adapts to screen size (1-2-3 columns)
- **Forms**: Full-width on mobile, max-width on desktop

### Touch Targets

Minimum touch target size: 44x44px (Apple Standard)

---

## 6. Form Handling

### React Hook Form Integration

All forms use React Hook Form with Zod validation:
- Type-safe form data
- Real-time validation
- Error messaging
- Optimistic UI updates

### Form Patterns

#### Quick Entry Forms
Optimized for <30 second entry:
- Pre-filled defaults (today's date, last category)
- Minimal required fields
- Keyboard shortcuts
- Auto-focus on open

#### Multi-Step Forms
For complex flows (onboarding, goal setting):
- Progress indicator
- Save draft between steps
- Skip optional steps

---

## 7. Data Visualization

### Chart Components

| Chart Type | Use Case | Library |
|------------|----------|---------|
| Line Chart | Weight trends, sleep patterns | Recharts |
| Bar Chart | Monthly spending, weekly habits | Recharts |
| Pie Chart | Budget categories, time allocation | Recharts |
| Area Chart | Cumulative progress | Recharts |
| Radial Chart | Wellness score breakdown | Recharts |
| Calendar Heatmap | Habit completion calendar | Custom |

---

## 8. Progressive Web App (PWA)

### PWA Features

- **Installable**: Add to home screen
- **Offline Support**: Service worker for core features
- **Push Notifications**: Habit reminders, budget alerts
- **Background Sync**: Sync data when back online
- **Share Target**: Share expenses/meals to app

### Manifest Configuration

```json
{
  "name": "LifeGrow",
  "short_name": "LifeGrow",
  "theme_color": "#7c3aed",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/dashboard"
}
```

---

## 9. Accessibility (a11y)

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: All features keyboard accessible
- **Screen Readers**: ARIA labels on all interactive elements
- **Color Contrast**: 4.5:1 minimum ratio
- **Focus Indicators**: Visible focus states
- **Alt Text**: Images have descriptive alt text
- **Form Labels**: All inputs properly labeled

### Accessibility Features

- Skip to main content link
- Reduced motion support (`prefers-reduced-motion`)
- High contrast mode
- Text scaling support
- Semantic HTML structure

---

## 10. Performance Optimization

### Techniques

| Technique | Implementation |
|-----------|----------------|
| Code Splitting | Dynamic imports for heavy components |
| Image Optimization | Next.js Image component, WebP format |
| Lazy Loading | Below-the-fold components lazy load |
| Memoization | React.memo for expensive components |
| Virtual Lists | Virtual scrolling for long lists |
| Debouncing | Search inputs, auto-save |
| Prefetching | Next.js Link prefetch |

### Loading States

- Skeleton screens for data loading
- Optimistic UI for instant feedback
- Streaming for progressive rendering
- Fallback UI for Suspense boundaries

---

## 11. Animation & Micro-interactions

### Animation Library

**Framer Motion** for:
- Page transitions
- Modal enter/exit
- List item animations
- Drag & drop
- Gesture recognition

### Micro-interactions

- Habit completion: Confetti animation
- Level up: Badge flip animation
- Achievement unlock: Modal with celebration
- Streak milestone: Flame effect
- Budget exceeded: Shake animation
- Form success: Checkmark animation

---

## 12. Mobile Optimization

### Mobile-Specific Features

- **Pull to Refresh**: Refresh data on pull-down
- **Swipe Actions**: Swipe to complete habit, delete transaction
- **FAB (Floating Action Button)**: Quick add actions
- **Bottom Sheet**: Mobile-friendly modals
- **Haptic Feedback**: Vibration on actions (iOS/Android)
- **Safe Area Insets**: Respect device notches

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-07 | Design Team | Initial frontend architecture |
