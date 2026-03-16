-- ============================================
-- Udemy Course Management System
-- Seed Data
-- CSE 326: ISD Sessional | Group - C1_4
-- ============================================

-- ============================================
-- 1. USERS (2 instructors + 6 students)
-- ============================================
INSERT INTO users (name, email, password, role) VALUES
('Instructor Karim',  'karim@test.com',     '$2b$10$gI.t15wmKBb4BW5UiTGZGeVz78aMovK/PfHeQD5HDL9mV4g5dOQIu', 'instructor'),
('Instructor Nadia',  'nadia@test.com',     '$2b$10$gI.t15wmKBb4BW5UiTGZGeVz78aMovK/PfHeQD5HDL9mV4g5dOQIu', 'instructor'),
('Shatabdi',         'shatabdi@test.com',   '$2b$10$gI.t15wmKBb4BW5UiTGZGeVz78aMovK/PfHeQD5HDL9mV4g5dOQIu', 'student'),
('Shadman',          'shadman@test.com',    '$2b$10$gI.t15wmKBb4BW5UiTGZGeVz78aMovK/PfHeQD5HDL9mV4g5dOQIu', 'student'),
('Tanmi',            'tanmi@test.com',      '$2b$10$gI.t15wmKBb4BW5UiTGZGeVz78aMovK/PfHeQD5HDL9mV4g5dOQIu', 'student'),
('Arpita',           'arpita@test.com',     '$2b$10$gI.t15wmKBb4BW5UiTGZGeVz78aMovK/PfHeQD5HDL9mV4g5dOQIu', 'student'),
('Tamanna',          'tamanna@test.com',    '$2b$10$gI.t15wmKBb4BW5UiTGZGeVz78aMovK/PfHeQD5HDL9mV4g5dOQIu', 'student'),
('Niaz',             'niaz@test.com',       '$2b$10$gI.t15wmKBb4BW5UiTGZGeVz78aMovK/PfHeQD5HDL9mV4g5dOQIu', 'student');

-- ============================================
-- 2. COURSES
-- ============================================
INSERT INTO courses (title, description, instructor_id, is_free, price, status) VALUES
('Complete Web Development Bootcamp', 'Learn HTML, CSS, JS, React and Node.js from scratch', 1, FALSE, 1299.00, 'active'),
('Python for Beginners', 'Start programming with Python', 1, TRUE, 0.00, 'active'),
('Data Structures & Algorithms', 'Master DSA with practical examples', 2, FALSE, 999.00, 'active');

-- ============================================
-- 3. SECTIONS
-- ============================================
INSERT INTO sections (course_id, title, position) VALUES
(1, 'Introduction to Web Development', 1),
(1, 'HTML & CSS Fundamentals', 2),
(1, 'JavaScript Basics', 3),
(2, 'Getting Started with Python', 1),
(2, 'Python Data Structures', 2),
(3, 'Arrays and Linked Lists', 1),
(3, 'Sorting Algorithms', 2);

-- ============================================
-- 4. VIDEO LECTURES
-- ============================================
INSERT INTO video_lectures (section_id, title, video_url, duration, position) VALUES
(1, 'Welcome to the Course',      'https://sample-videos.com/video1.mp4',  300, 1),
(1, 'How the Web Works',          'https://sample-videos.com/video2.mp4',  450, 2),
(2, 'Your First HTML Page',       'https://sample-videos.com/video3.mp4',  600, 1),
(2, 'CSS Styling Basics',         'https://sample-videos.com/video4.mp4',  720, 2),
(3, 'Variables and Data Types',   'https://sample-videos.com/video5.mp4',  540, 1),
(3, 'Functions in JavaScript',    'https://sample-videos.com/video6.mp4',  660, 2),
(4, 'Installing Python',          'https://sample-videos.com/video7.mp4',  360, 1),
(4, 'Your First Python Program',  'https://sample-videos.com/video8.mp4',  480, 2),
(5, 'Lists and Tuples',           'https://sample-videos.com/video9.mp4',  540, 1),
(5, 'Dictionaries and Sets',      'https://sample-videos.com/video10.mp4', 600, 2),
(6, 'Introduction to Arrays',     'https://sample-videos.com/video11.mp4', 480, 1),
(6, 'Linked List Basics',         'https://sample-videos.com/video12.mp4', 540, 2),
(7, 'Bubble Sort',                'https://sample-videos.com/video13.mp4', 420, 1),
(7, 'Merge Sort',                 'https://sample-videos.com/video14.mp4', 600, 2);

-- ============================================
-- 5. MATERIALS
-- ============================================
INSERT INTO materials (section_id, title, file_url, file_type, download_allowed) VALUES
(1, 'Course Slides - Introduction', 'https://files.com/intro.pdf',  'pdf', TRUE),
(2, 'HTML Cheatsheet',              'https://files.com/html.pdf',   'pdf', TRUE),
(2, 'CSS Reference Guide',          'https://files.com/css.pdf',    'pdf', FALSE),
(3, 'JS Exercise Files',            'https://files.com/js.zip',     'zip', TRUE),
(4, 'Python Setup Guide',           'https://files.com/python.pdf', 'pdf', TRUE),
(6, 'DSA Notes',                    'https://files.com/dsa.pdf',    'pdf', TRUE);

-- ============================================
-- 6. ENROLLMENTS
-- ============================================
INSERT INTO enrollments (student_id, course_id) VALUES
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 2),
(8, 2),
(3, 2),
(4, 3),
(6, 3);

-- ============================================
-- 7. VIDEO PROGRESS
-- ============================================
INSERT INTO video_progress (student_id, lecture_id, watch_position, completion_percent, is_completed) VALUES
(3, 1,  300, 100.00, TRUE),
(3, 2,  450, 100.00, TRUE),
(3, 3,  480,  80.00, TRUE),
(3, 4,  200,  27.78, FALSE),
(4, 1,  300, 100.00, TRUE),
(4, 2,  180,  40.00, FALSE),
(5, 1,  300, 100.00, TRUE),
(5, 2,  450, 100.00, TRUE),
(5, 3,  600, 100.00, TRUE),
(5, 4,  720, 100.00, TRUE),
(5, 5,  540, 100.00, TRUE),
(6, 1,  300, 100.00, TRUE),
(6, 2,  450, 100.00, TRUE),
(6, 3,  300,  50.00, FALSE),
(7, 7,  360, 100.00, TRUE),
(7, 8,  240,  50.00, FALSE),
(8, 7,  360, 100.00, TRUE),
(8, 8,  480, 100.00, TRUE),
(8, 9,  540, 100.00, TRUE);

-- ============================================
-- 8. COURSE PROGRESS
-- ============================================
INSERT INTO course_progress (student_id, course_id, completion_percentage, completed_lectures, total_lectures) VALUES
(3, 1, 50.00, 3, 6),
(4, 1, 16.67, 1, 6),
(5, 1, 83.33, 5, 6),
(6, 1, 33.33, 2, 6),
(7, 2, 25.00, 1, 4),
(8, 2, 75.00, 3, 4),
(3, 2,  0.00, 0, 4),
(4, 3,  0.00, 0, 4),
(6, 3,  0.00, 0, 4);

-- ============================================
-- 9. MATERIAL ACCESS
-- ============================================
INSERT INTO material_access (student_id, material_id) VALUES
(3, 1),
(3, 2),
(4, 1),
(5, 1),
(5, 2),
(5, 4),
(6, 1),
(6, 3),
(7, 5),
(8, 5),
(8, 6);