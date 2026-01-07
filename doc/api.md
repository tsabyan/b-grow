# API Documentation
## LifeGrow - Self Improvement App

---

## 1. API Overview

### API Architecture

- **Primary**: Next.js Server Actions (recommended for most operations)
- **Secondary**: REST API Routes (for webhooks, third-party integrations)
- **Transport**: HTTPS only
- **Format**: JSON
- **Authentication**: JWT via Supabase Auth

---

## 2. Authentication

### Headers

All authenticated requests require:

```
Authorization: Bearer <JWT_TOKEN>
```

### Getting Access Token

Client-side:
```typescript
const { data: { session } } = await supabase.auth.getSession()
const token = session?.access_token
```

### Error Responses

| Status Code | Meaning |
|-------------|---------|
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Valid token but insufficient permissions |

---

## 3. Habits API

### List Habits

**Endpoint**: `GET /api/habits`

**Query Parameters**:
- `status` (optional): `active` | `archived`
- `category` (optional): Category ID filter

**Response**:
```json
{
  "habits": [
    {
      "id": "uuid",
      "name": "Morning Exercise",
      "description": "30 min workout",
      "category": "health",
      "scheduleDays": [1, 2, 3, 4, 5],
      "currentStreak": 15,
      "longestStreak": 30,
      "isActive": true,
      "createdAt": "2026-01-01T00:00:00Z"
    }
  ],
  "total": 10
}
```

### Create Habit

**Endpoint**: `POST /api/habits`

**Request Body**:
```json
{
  "name": "Morning Exercise",
  "description": "30 min workout",
  "categoryId": "uuid",
  "scheduleType": "daily",
  "scheduleDays": [1, 2, 3, 4, 5],
  "reminderEnabled": true,
  "reminderTime": "07:00"
}
```

**Response**: `201 Created`
```json
{
  "habit": { /* habit object */ },
  "message": "Habit created successfully"
}
```

### Complete Habit

**Endpoint**: `POST /api/habits/:id/complete`

**Request Body**: None (uses current date)

**Response**: `200 OK`
```json
{
  "completion": {
    "id": "uuid",
    "habitId": "uuid",
    "completedDate": "2026-01-07"
  },
  "newStreak": 16,
  "pointsAwarded": 10
}
```

### Get Habit Statistics

**Endpoint**: `GET /api/habits/:id/stats`

**Response**:
```json
{
  "stats": {
    "totalCompletions": 150,
    "currentStreak": 15,
    "longestStreak": 30,
    "completionRate": 0.85,
    "completionsByMonth": {
      "2026-01": 25,
      "2025-12": 20
    }
  }
}
```

---

## 4. Transactions API

### List Transactions

**Endpoint**: `GET /api/transactions`

**Query Parameters**:
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string
- `type` (optional): `income` | `expense`
- `categoryId` (optional): Category filter
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50, max: 100)

**Response**:
```json
{
  "transactions": [
    {
      "id": "uuid",
      "amount": 50.00,
      "type": "expense",
      "description": "Groceries",
      "category": {
        "id": "uuid",
        "name": "Food",
        "icon": "🍔"
      },
      "transactionDate": "2026-01-07",
      "createdAt": "2026-01-07T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 250,
    "totalPages": 5
  }
}
```

### Create Transaction

**Endpoint**: `POST /api/transactions`

**Request Body**:
```json
{
  "amount": 50.00,
  "type": "expense",
  "categoryId": "uuid",
  "description": "Groceries",
  "transactionDate": "2026-01-07",
  "tags": ["grocery", "weekly"]
}
```

**Response**: `201 Created`

### Monthly Summary

**Endpoint**: `GET /api/transactions/summary`

**Query Parameters**:
- `month`: YYYY-MM format

**Response**:
```json
{
  "summary": {
    "income": 5000.00,
    "expense": 3500.00,
    "balance": 1500.00,
    "expenseByCategory": {
      "Food": 800.00,
      "Transport": 300.00,
      "Entertainment": 200.00
    }
  }
}
```

---

## 5. Budgets API

### List Budgets

**Endpoint**: `GET /api/budgets`

**Query Parameters**:
- `month`: YYYY-MM format

**Response**:
```json
{
  "budgets": [
    {
      "id": "uuid",
      "category": {
        "id": "uuid",
        "name": "Food"
      },
      "amount": 1000.00,
      "spent": 650.00,
      "remaining": 350.00,
      "percentUsed": 65,
      "month": "2026-01"
    }
  ]
}
```

### Set Budget

**Endpoint**: `POST /api/budgets`

**Request Body**:
```json
{
  "categoryId": "uuid",
  "amount": 1000.00,
  "month": "2026-01"
}
```

**Response**: `201 Created` or `200 OK` if updating existing

---

## 6. Fitness API

### Log Weight

**Endpoint**: `POST /api/fitness/weight`

**Request Body**:
```json
{
  "weight": 75.5,
  "unit": "kg",
  "logDate": "2026-01-07",
  "notes": "Morning weight"
}
```

**Response**: `201 Created`

### Weight History

**Endpoint**: `GET /api/fitness/weight`

**Query Parameters**:
- `startDate` (optional): ISO date
- `endDate` (optional): ISO date
- `limit` (optional): Number of records (default: 30)

**Response**:
```json
{
  "weights": [
    {
      "id": "uuid",
      "weight": 75.5,
      "unit": "kg",
      "logDate": "2026-01-07",
      "bmi": 24.2
    }
  ],
  "trend": {
    "change": -2.5,
    "percentChange": -3.2,
    "direction": "down"
  }
}
```

### Log Workout

**Endpoint**: `POST /api/fitness/workouts`

**Request Body**:
```json
{
  "name": "Upper Body Strength",
  "workoutType": "strength",
  "durationMinutes": 45,
  "caloriesBurned": 250,
  "workoutDate": "2026-01-07",
  "exercises": [
    {
      "name": "Bench Press",
      "sets": 3,
      "reps": 10,
      "weight": 60
    }
  ]
}
```

**Response**: `201 Created`

### Log Meal

**Endpoint**: `POST /api/fitness/meals`

**Request Body**:
```json
{
  "mealType": "lunch",
  "mealDate": "2026-01-07",
  "calories": 650,
  "protein": 35,
  "carbs": 70,
  "fats": 20,
  "description": "Chicken rice bowl",
  "foods": [
    { "name": "Chicken breast", "quantity": "200g" },
    { "name": "Brown rice", "quantity": "1 cup" }
  ]
}
```

**Response**: `201 Created`

---

## 7. Wellness API

### Daily Check-in

**Endpoint**: `POST /api/wellness/checkin`

**Request Body**:
```json
{
  "checkinDate": "2026-01-07",
  "mood": 8,
  "energy": 7,
  "stress": 3,
  "steps": 8500,
  "waterIntake": 8,
  "exerciseMinutes": 30,
  "gratitude": "Completed project deadline",
  "notes": "Good productive day"
}
```

**Response**: `201 Created`

### Get Wellness Score

**Endpoint**: `GET /api/wellness/score`

**Query Parameters**:
- `date` (optional): ISO date (default: today)

**Response**:
```json
{
  "score": {
    "total": 82,
    "breakdown": {
      "sleep": 20,
      "mood": 16,
      "stress": 13,
      "activity": 18,
      "hydration": 8,
      "habits": 7
    },
    "date": "2026-01-07"
  },
  "trend": {
    "change": 5,
    "average7Days": 78,
    "average30Days": 75
  }
}
```

### Log Sleep

**Endpoint**: `POST /api/wellness/sleep`

**Request Body**:
```json
{
  "sleepDate": "2026-01-06",
  "bedtime": "2026-01-06T22:30:00Z",
  "wakeTime": "2026-01-07T06:30:00Z",
  "durationHours": 8,
  "quality": 8,
  "interruptions": 1,
  "notes": "Slept well"
}
```

**Response**: `201 Created`

---

## 8. Insights API

### Get Correlations

**Endpoint**: `GET /api/insights/correlations`

**Response**:
```json
{
  "insights": [
    {
      "id": "uuid",
      "type": "correlation",
      "title": "Exercise improves sleep quality",
      "description": "Your sleep quality is 30% better on days when you exercise",
      "correlation": 0.65,
      "modules": ["fitness", "wellness"],
      "actionable": true,
      "recommendation": "Try to exercise at least 4 times per week"
    }
  ]
}
```

### Get Recommendations

**Endpoint**: `GET /api/insights/recommendations`

**Response**:
```json
{
  "recommendations": [
    {
      "id": "uuid",
      "type": "habit_suggestion",
      "title": "Add a morning routine",
      "reason": "Based on your productivity patterns",
      "priority": "high",
      "module": "habits"
    }
  ]
}
```

---

## 9. Achievements API

### Get User Achievements

**Endpoint**: `GET /api/achievements`

**Response**:
```json
{
  "earned": [
    {
      "achievement": {
        "id": "uuid",
        "name": "Habit Hero",
        "description": "30-day streak",
        "icon": "🔥",
        "points": 200
      },
      "earnedAt": "2026-01-05T10:00:00Z"
    }
  ],
  "available": [
    {
      "id": "uuid",
      "name": "Weight Warrior",
      "description": "Reach your weight goal",
      "icon": "⚖️",
      "progress": 0.65,
      "progressText": "13 of 20 kg lost"
    }
  ]
}
```

---

## 10. Rate Limiting

### Limits

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| General API | 100 requests | 15 minutes |
| Mutations (POST/PUT/DELETE) | 30 requests | 15 minutes |
| Heavy endpoints (exports, reports) | 10 requests | 15 minutes |

### Rate Limit Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 85
X-RateLimit-Reset: 1704633600
```

### Rate Limit Response

**Status**: `429 Too Many Requests`
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 300
}
```

---

## 11. Error Responses

### Error Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "amount",
        "message": "Amount must be greater than 0"
      }
    ]
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `DUPLICATE_ENTRY` | 409 | Resource already exists |
| `RATE_LIMITED` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |

---

## 12. Webhooks

### Available Webhooks

| Event | Description |
|-------|-------------|
| `habit.completed` | User completes a habit |
| `achievement.earned` | User earns an achievement |
| `budget.exceeded` | Budget limit exceeded |
| `goal.achieved` | User reaches a goal |

### Webhook Payload

**Endpoint**: `POST <YOUR_WEBHOOK_URL>`

**Headers**:
```
X-LifeGrow-Signature: sha256=<signature>
X-LifeGrow-Event: habit.completed
```

**Payload**:
```json
{
  "event": "habit.completed",
  "timestamp": "2026-01-07T10:30:00Z",
  "userId": "uuid",
  "data": {
    "habitId": "uuid",
    "habitName": "Morning Exercise",
    "streak": 16
  }
}
```

---

## 13. Data Export

### Export User Data

**Endpoint**: `GET /api/export`

**Query Parameters**:
- `format`: `json` | `csv`
- `modules`: comma-separated list (e.g., `habits,transactions,fitness`)

**Response**: File download (JSON or CSV)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-07 | API Team | Initial API documentation |
