const pool = require('../config/db');

exports.getOverview = async (req, res) => {
  try {
    const instructorId = 1; // Temporary hardcode

    const query = `
      SELECT 
        COUNT(DISTINCT c.id)::int AS "totalCourses",
        COUNT(DISTINCT e.student_id)::int AS "totalStudents",
        COUNT(e.id)::int AS "totalEnrollments",
        4.8 AS "averageRating"
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id
      WHERE c.instructor_id = $1;
    `;

    const result = await pool.query(query, [instructorId]);
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    console.error("Error in getOverview:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const instructorId = 1; // Temporary placeholder

    const query = `
      WITH instructor_courses AS (
          SELECT id, title FROM courses WHERE instructor_id = $1
      ),
      student_stats AS (
          SELECT 
              COUNT(DISTINCT e.student_id)::int AS total_students,
              COUNT(e.id) FILTER (WHERE e.enrolled_at > NOW() - INTERVAL '30 days')::int AS new_students,
              -- "Active" defined as students who updated progress in the last 7 days
              COUNT(DISTINCT vp.student_id)::int AS active_students
          FROM enrollments e
          JOIN instructor_courses ic ON e.course_id = ic.id
          LEFT JOIN video_progress vp ON e.student_id = vp.student_id 
              AND vp.last_updated > NOW() - INTERVAL '7 days'
      ),
      course_table AS (
          SELECT 
              ic.title AS "courseName",
              COUNT(e.id)::int AS "totalStudents",
              COUNT(e.id) FILTER (WHERE e.enrolled_at > NOW() - INTERVAL '30 days')::int AS "newThisMonth",
              COALESCE(AVG(cp.completion_percentage)::numeric(10,1), 0) AS "completionPercent"
          FROM instructor_courses ic
          LEFT JOIN enrollments e ON ic.id = e.course_id
          LEFT JOIN course_progress cp ON e.course_id = cp.course_id AND e.student_id = cp.student_id
          GROUP BY ic.id, ic.title
      )
      SELECT 
          (SELECT total_students FROM student_stats) as "totalStudents",
          (SELECT new_students FROM student_stats) as "newStudentsThisMonth",
          (SELECT active_students FROM student_stats) as "activeStudents",
          '+12%' as "studentGrowth", -- Mocked for now
          json_build_array(
            json_build_object('country', 'Bangladesh', 'percentage', 85),
            json_build_object('country', 'Others', 'percentage', 15)
          ) as "demographics", -- Mocked for now
          (SELECT json_agg(course_table) FROM course_table) as "courseWiseTable";
    `;

    const result = await pool.query(query, [instructorId]);
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    console.error("Error fetching student analytics:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getEngagement = async (req, res) => {
  try {
    const instructorId = 1;

    const query = `
      WITH instructor_courses AS (
          SELECT id, title FROM courses WHERE instructor_id = $1
      ),
      course_engagement AS (
          SELECT 
              ic.title AS "courseName",
              -- Average watch time in minutes (assuming duration/position is in seconds or minutes)
              COALESCE(ROUND(AVG(vp.watch_position)::numeric, 1), 0) || ' min' AS "avgWatchTime",
              COUNT(DISTINCT vp.student_id)::int AS "activeStudents"
          FROM instructor_courses ic
          LEFT JOIN sections s ON ic.id = s.course_id
          LEFT JOIN video_lectures vl ON s.id = vl.section_id
          LEFT JOIN video_progress vp ON vl.id = vp.lecture_id
          GROUP BY ic.id, ic.title
      )
      SELECT 
          -- Real data from your schema
          (SELECT json_agg(course_engagement) FROM course_engagement) AS "courseWiseEngagement",
          -- Placeholders for tables not yet implemented (Quizzes/Assignments)
          125 AS "practiceTestsCompleted",
          48 AS "assignmentsSubmitted",
          12 AS "qaParticipation",
          '82%' AS "avgQuizScore";
    `;

    const result = await pool.query(query, [instructorId]);
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    console.error("Engagement API Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};