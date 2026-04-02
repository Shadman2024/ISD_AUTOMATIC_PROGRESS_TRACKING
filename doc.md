 Project Documentation: ISD Automatic Progress Tracking

  1. Project Overview
  ISD Automatic Progress Tracking is a comprehensive Udemy-like course management system designed for CSE 326 (Group 4, Subsection C1, BUET). The system enables students to track their
  learning progress automatically as they watch video lectures and interact with course materials. It also provides instructors with detailed analytical insights into student engagement and
  performance.

  ---

  2. System Architecture
  The project follows a decoupled microservices-like architecture:
   * Frontend: React 18 (Vite, Tailwind-inspired styling)
   * Student Backend: Node.js/Express (Auth, Video Delivery, Progress Logic)
   * Instructor Backend: Node.js/Express (Analytics, Aggregation)
   * Database: PostgreSQL 16
   * Storage: Cloudinary (Video hosting and Course Materials)
   * Infrastructure: Docker & Docker Compose

  ---

  3. Core Features

  ##### 3.1 Authentication & Authorization
   * Roles: Distinct roles for student and instructor.
   * Auth Flow: JWT-based authentication. Instructors and Students have separate dashboards.

  ##### 3.2 Automatic Video Progress Tracking (The Core Feature)
   * Resume Playback: Videos automatically resume from the last saved position.
   * Periodic Sync: The player saves the current watch position to the backend every 10 seconds.
   * Graceful Exit: Uses navigator.sendBeacon to save progress even if the tab is closed or the browser is refreshed.
   * 80% Completion Logic: A lecture is automatically marked as Completed once the student watches 80% of the duration. This triggers a background update to the course's overall completion
     percentage.
   * 100% Completion UX: When a video ends, a "Lecture Complete" popup appears with a 5-second countdown to auto-advance to the next lecture.

  ##### 3.3 Course Management
   * Hierarchical Content: Courses are organized into Sections, which contain Video Lectures and Materials.
   * Materials Support: Students can view and download PDFs, ZIPs, and PPT files associated with each section.
   * Progress Visualization: 
       * Sidebar: Real-time checkmarks and circular progress indicators for each lecture.
       * Course Progress Bar: Overall percentage tracker for the entire course.
       * Milestones: Visual markers for progress achievements.

  ##### 3.4 Instructor Analytics
   * Overview Dashboard: High-level metrics (Total Students, Total Courses, Average Rating).
   * Student Engagement: Tracking average watch time per course and active vs. inactive students.
   * Demographics: (Mocked) distribution of students by region.
   * Course-wise Performance: Tabular data showing completion percentages and enrollment growth per course.

  ---

  4. Technical Implementation Details

  ##### 4.1 Frontend Structure (/frontend)
   * CourseContentPage.jsx: The primary learning interface. Manages the sidebar, video playback state, and real-time progress fetching.
   * VideoPlayer.jsx: A custom-built player wrapping HTML5 <video>. Features keyboard shortcuts (Space for Play/Pause, Arrows for Seek/Volume) and buffering overlays.
   * useVideoProgress.js: A custom hook that encapsulates the logic for syncing watch positions with the backend.

  ##### 4.2 Student Backend (/student-backend)
   * videoController.js: Manages video metadata and watch position persistence using ON CONFLICT SQL updates for efficiency.
   * progressController.js: Calculates course completion percentages and provides weekly activity stats.
   * uploadController.js: Handles integration with Cloudinary for secure file and video uploads.

  ##### 4.3 Instructor Backend (/instructor-backend)
   * instructor.js: Uses complex SQL queries (CTEs and JSON aggregations) to generate performance reports from raw enrollment and progress data.

  ---

  5. Database Schema (Highlights)
   * video_progress: Tracks watch_position (float) and is_completed (boolean) per student/lecture.
   * course_progress: Tracks completion_percentage and completed_lectures to avoid expensive re-calculations on every page load.
   * video_lectures: Stores Cloudinary URLs and video durations.

  ---

  6. API Endpoints


  ┌───────────┬────────┬──────────────────────────────────────────────────────┐
  │ Feature   │ Method │ Endpoint                                             │
  ├───────────┼────────┼──────────────────────────────────────────────────────┤
  │ Auth      │ POST   │ /api/auth/login, /api/auth/register                  │
  │ Video     │ GET    │ /api/video/:lectureId/url (fetch stream URL)         │
  │ Progress  │ POST   │ /api/video/watch-position (save timestamp)           │
  │ Progress  │ GET    │ /api/progress/:courseId (get overall %)              │
  │ Analytics │ GET    │ /api/instructor/overview, /api/instructor/engagement │
  └───────────┴────────┴──────────────────────────────────────────────────────┘

  ---

  7. Setup & Development
   1. Environment: Copy .env.example to student-backend/.env and configure PostgreSQL and Cloudinary keys.
   2. Database: Execute db/student-schema.sql followed by db/seed.sql.
   3. Run: 
       * Backend: npm run dev in student-backend.
  This documentation provides a high-level and technical view of the project as of April 2026.