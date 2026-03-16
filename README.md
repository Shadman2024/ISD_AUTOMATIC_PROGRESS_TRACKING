# Automatic Progress Tracking
### Udemy Course Management System — CSE 326 | Group 4 | Subsection C1 | BUET 

---

## Team Members

| Student ID | Name                       | Role                        |
|------------|----------------------------|-----------------------------|
| 2105123    | Shatabdi Dutta Chowdhury   | Student UI + Video API + DevOps |
| 2105124    | Md. Shadman Abid            | Instructor DevOps + Student Progress UI |
| 2105125    | Md. Yousuf Niaz             | Instructor Analytics UI + API |
| 2105137    | Arpita Dhar                 | Student Progress API + DB Models |
| 2105140    | Nusrat Jahan Tamanna        | Threshold Service + Notification API |
| 2105147    | Tasnimzaman Tanmi           | DB Schema + Project Structure + Auth |

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, Vite, Recharts          |
| Backend    | Node.js, Express.js               |
| Database   | PostgreSQL 16                     |
| DevOps     | Docker, Docker Compose            |
| CI/CD      | GitHub Actions                    |

---

## Project Structure
```
ISD_AUTOMATIC_PROGRESS_TRACKING/
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── pages/
│       │   ├── Login.jsx               ← Tanmi
│       │   ├── Register.jsx            ← Tanmi
│       │   ├── StudentDashboard.jsx
│       │   ├── Progress.jsx
│       │   ├── InstructorDashboard.jsx
│       │   ├── Analytics.jsx
│       │   └── StudentProgressView.jsx
│       ├── components/
│       │   ├── ProgressBar.jsx
│       │   ├── CompletionRing.jsx
│       │   ├── MilestoneBadge.jsx
│       │   ├── EngagementChart.jsx
│       │   └── NotificationBell.jsx
│       ├── hooks/
│       │   └── useVideoProgress.js
│       └── services/
│           └── api.js                  ← Tanmi
│
├── student-backend/
│   ├── package.json
│   └── src/
│       ├── index.js                    ← Tanmi
│       ├── db.js                       ← Tanmi
│       ├── routes/
│       │   ├── auth.routes.js          ← Tanmi
│       │   ├── video.routes.js
│       │   └── progress.routes.js
│       ├── controllers/
│       │   ├── authController.js       ← Tanmi
│       │   ├── videoController.js
│       │   └── progressController.js
│       └── models/
│           ├── VideoProgress.js
│           └── CourseProgress.js
│
├── instructor-backend/
│   ├── package.json
│   └── src/
│       ├── routes/
│       │   ├── analytics.routes.js
│       │   └── notification.routes.js
│       ├── controllers/
│       │   ├── analyticsController.js
│       │   └── notificationController.js
│       └── models/
│           ├── Notification.js
│           └── Milestone.js
│
├── db/
│   ├── student-schema.sql              ← Tanmi
│   ├── instructor-schema.sql           ← Tanmi
│   └── seed.sql                        ← Tanmi
│
├── .github/
│   └── workflows/
│       ├── student-ci.yml
│       └── instructor-ci.yml
│
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example                        ← Tanmi
└── README.md                           ← Tanmi
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL 16](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

---

## Getting Started (Local Setup)

### Step 1 — Clone the repo
```bash
git clone https://github.com/shaDC24/ISD_AUTOMATIC_PROGRESS_TRACKING.git
cd ISD_AUTOMATIC_PROGRESS_TRACKING
```

### Step 2 — Setup Environment Variables
```bash
cp .env.example student-backend/.env
```
Open `student-backend/.env` and fill in your PostgreSQL password:
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_actual_postgres_password
POSTGRES_DB=progress_tracker
DATABASE_URL=postgresql://postgres:your_actual_postgres_password@localhost:5432/progress_tracker
STUDENT_PORT=5000
INSTRUCTOR_PORT=5001
VITE_STUDENT_API_URL=http://localhost:5000/api
VITE_INSTRUCTOR_API_URL=http://localhost:5001/api
JWT_SECRET=mysecretjwtkey123
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Step 3 — Setup Database
Open PostgreSQL terminal:
```bash
psql -U postgres
```
Then run:
```sql
CREATE DATABASE progress_tracker;
\c progress_tracker
\i 'your_project_path/db/student-schema.sql'
\i 'your_project_path/db/seed.sql'
```
Replace `your_project_path` with your actual project path. Example for Windows:
```sql
\i 'C:/Users/YourName/Downloads/ISD_AUTOMATIC_PROGRESS_TRACKING/db/student-schema.sql'
\i 'C:/Users/YourName/Downloads/ISD_AUTOMATIC_PROGRESS_TRACKING/db/seed.sql'
```

### Step 4 — Run Student Backend
```bash
cd student-backend
npm install
npm run dev
```
Backend runs at: `http://localhost:5000`

### Step 5 — Run Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## Test Credentials

All seed users have password: `password123`

| Name             | Email              | Role       |
|------------------|--------------------|------------|
| Instructor Karim | karim@test.com     | instructor |
| Instructor Nadia | nadia@test.com     | instructor |
| Shatabdi         | shatabdi@test.com  | student    |
| Shadman          | shadman@test.com   | student    |
| Tanmi            | tanmi@test.com     | student    |
| Arpita           | arpita@test.com    | student    |
| Tamanna          | tamanna@test.com   | student    |
| Niaz             | niaz@test.com      | student    |

---

## API Reference

### Student Backend — `http://localhost:5000/api`

#### Auth Routes (`/auth`)
| Method | Endpoint         | Description       | Owner |
|--------|------------------|-------------------|-------|
| POST   | `/auth/register` | Register new user | Tanmi |
| POST   | `/auth/login`    | Login user        | Tanmi |

#### Video Routes (`/video`)
| Method | Endpoint                        | Description                 | Owner    |
|--------|---------------------------------|-----------------------------|----------|
| GET    | `/video/:videoId/url`           | Get video streaming URL     | Shatabdi |
| GET    | `/video/last-position/:videoId` | Get last watched position   | Shatabdi |
| POST   | `/video/watch-position`         | Save current watch position | Shatabdi |

#### Progress Routes (`/progress`)
| Method | Endpoint                       | Description                       | Owner  |
|--------|--------------------------------|-----------------------------------|--------|
| GET    | `/progress/:courseId`          | Get student's course progress     | Arpita |
| GET    | `/progress/lectures/:courseId` | Get all lecture completion status | Arpita |
| POST   | `/progress/complete`           | Mark a lecture as complete        | Arpita |

---

### Instructor Backend — `http://localhost:5001/api`

#### Analytics Routes (`/analytics`)
| Method | Endpoint                          | Description                  | Owner |
|--------|-----------------------------------|------------------------------|-------|
| GET    | `/analytics/overview/:courseId`   | Get course overview stats    | Niaz  |
| GET    | `/analytics/progress/:courseId`   | Get student progress metrics | Niaz  |
| GET    | `/analytics/engagement/:courseId` | Get engagement + watch time  | Niaz  |

#### Notification Routes (`/notifications`)
| Method | Endpoint                   | Description                       | Owner   |
|--------|----------------------------|-----------------------------------|---------|
| GET    | `/notifications`           | Get all notifications for student | Tamanna |
| POST   | `/notifications/milestone` | Trigger milestone notification    | Tamanna |
| POST   | `/notifications/reminder`  | Send course reminder              | Tamanna |

---

## Database Schema

### `users`
```sql
id          SERIAL PRIMARY KEY
name        VARCHAR(100) NOT NULL
email       VARCHAR(150) UNIQUE NOT NULL
password    VARCHAR(255) NOT NULL
role        VARCHAR(20) NOT NULL CHECK (role IN ('student', 'instructor'))
created_at  TIMESTAMP DEFAULT NOW()
```

### `courses`
```sql
id            SERIAL PRIMARY KEY
title         VARCHAR(200) NOT NULL
description   TEXT
instructor_id INT NOT NULL REFERENCES users(id)
thumbnail_url VARCHAR(500)
is_free       BOOLEAN DEFAULT FALSE
price         NUMERIC(10,2) DEFAULT 0.00
status        VARCHAR(20) DEFAULT 'active'
created_at    TIMESTAMP DEFAULT NOW()
```

### `video_progress`
```sql
id                 SERIAL PRIMARY KEY
student_id         INT NOT NULL REFERENCES users(id)
lecture_id         INT NOT NULL REFERENCES video_lectures(id)
watch_position     NUMERIC(10,2) DEFAULT 0
completion_percent NUMERIC(5,2) DEFAULT 0
is_completed       BOOLEAN DEFAULT FALSE
last_updated       TIMESTAMP DEFAULT NOW()
```

### `course_progress`
```sql
id                    SERIAL PRIMARY KEY
student_id            INT NOT NULL REFERENCES users(id)
course_id             INT NOT NULL REFERENCES courses(id)
completion_percentage NUMERIC(5,2) DEFAULT 0
completed_lectures    INT DEFAULT 0
total_lectures        INT DEFAULT 0
last_accessed         TIMESTAMP DEFAULT NOW()
```

---

## Branch Strategy

Each member works on their own branch and opens a PR to `main`.

| Branch                        | Owner    |
|-------------------------------|----------|
| `tanmi/db-schema-auth`        | Tanmi    |
| `student/video-player`        | Shatabdi |
| `student/progress-api`        | Arpita   |
| `student/devops`              | Shatabdi |
| `instructor/analytics-ui`     | Niaz     |
| `instructor/threshold-api`    | Tamanna  |
| `instructor/devops`           | Shadman  |

### Paired Review
- Shatabdi ↔ Arpita
- Niaz ↔ Tamanna
- Shadman reviews both DevOps PRs

---

## Contribution Summary

| Member   | Frontend files                           | Backend files                                       | DB / Config                                                        |
|----------|------------------------------------------|-----------------------------------------------------|--------------------------------------------------------------------|
| Tanmi    | Login.jsx, Register.jsx, App.jsx, api.js | index.js, db.js, auth.routes.js, authController.js  | student-schema.sql, instructor-schema.sql, seed.sql, .env.example |
| Shatabdi | —                                        | video.routes.js, videoController.js                 | —                                                                  |
| Arpita   | —                                        | progress.routes.js, progressController.js           | —                                                                  |
| Shadman  | StudentDashboard.jsx, Progress.jsx       | —                                                   | —                                                                  |
| Niaz     | InstructorDashboard.jsx, Analytics.jsx   | analytics.routes.js, analyticsController.js         | —                                                                  |
| Tamanna  | —                                        | notification.routes.js, notificationController.js   | —                                                                  |