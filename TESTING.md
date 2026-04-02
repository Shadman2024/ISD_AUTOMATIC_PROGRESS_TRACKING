# Testing Guide

This project includes a comprehensive suite of automated tests for the frontend, instructor backend, and student backend.

## 🎨 Frontend Tests
The frontend uses **Vitest** and **React Testing Library**.

### How to run:
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the tests:
   ```bash
   npm test
   ```

### What is tested:
- **UI Components**: All components in `src/components` (e.g., `CourseCarousel`, `LearningStreak`) are tested for correct rendering and internal logic.
- **Pages**: Main pages in `src/pages` (e.g., `Login`, `StudentDashboard`) are tested for user interactions, API integration (mocked), and navigation.
- **Hooks**: Custom hooks like `useVideoProgress` are tested for state management and timing logic.

---

## 👨‍🏫 Instructor Backend Tests
The instructor backend uses **Jest** and **Supertest**.

### How to run:
1. Navigate to the instructor-backend directory:
   ```bash
   cd instructor-backend
   ```
2. Install required test dependencies:
   ```bash
   npm install --save-dev jest supertest
   ```
3. Run the tests:
   ```bash
   npm test
   ```
   *(Note: You may need to add `"test": "jest"` to the `scripts` section of `package.json` if not already present)*

### What is tested:
- **Analytics Controllers**: Integration tests for `getOverview`, `getStudents`, and `getEngagement` using a mocked database.

---

## 🎓 Student Backend Tests
The student backend uses **Jest** and **Supertest**.

### How to run:
1. Navigate to the student-backend directory:
   ```bash
   cd student-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the tests:
   ```bash
   npm test
   ```

### What is tested:
- **Authentication**: Registration and login logic, password hashing, and JWT generation.
- **Course & Video**: Fetching course content, video metadata, and resuming from last position.
- **Uploads**: Handling multipart file uploads for videos and materials (Cloudinary integration is mocked).
- **Progress**: Tracking course completion percentages and weekly learning stats.

---

## 💡 Important Notes for Developers
- **Mocking**: All tests use mocked external services (PostgreSQL, Cloudinary, API endpoints). You do **not** need a running database or internet connection to run the tests.
- **Comments**: Every test file contains detailed comments explaining the purpose of each test case and the expected outcome.
- **Environment**: Ensure your Node.js version is 20 or higher.
