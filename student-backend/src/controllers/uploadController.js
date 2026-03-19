const pool                   = require('../db');
const cloudinary             = require('../config/cloudinary');
const { uploadToCloudinary } = require('../middleware/upload.middleware');

// ─────────────────────────────────────────────────────────────
// POST /api/upload/video
// Body (multipart): file, sectionId, title, position
// ─────────────────────────────────────────────────────────────
const uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        const { sectionId, title, position = 1 } = req.body;

        if (!sectionId || !title) {
            return res.status(400).json({ message: 'sectionId and title are required' });
        }

        // Upload buffer → Cloudinary
        const result = await uploadToCloudinary(req.file.buffer, {
            folder:        'udemy_videos',
            resource_type: 'video',
        });

        const videoUrl = result.secure_url;
        const duration = result.duration || 0; // Cloudinary returns duration for videos

        // Save to DB
        const dbResult = await pool.query(
            `INSERT INTO video_lectures (section_id, title, video_url, duration, position)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, title, video_url, duration`,
            [sectionId, title, videoUrl, duration, position]
        );

        res.status(201).json({
            message: 'Video uploaded successfully',
            lecture: dbResult.rows[0],
        });

    } catch (error) {
        console.error('uploadVideo error:', error.message);
        res.status(500).json({ message: 'Server error during video upload' });
    }
};


// ─────────────────────────────────────────────────────────────
// POST /api/upload/material
// Body (multipart): file, sectionId, title, downloadAllowed
// ─────────────────────────────────────────────────────────────
const uploadMaterial = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { sectionId, title, downloadAllowed = true } = req.body;

        if (!sectionId || !title) {
            return res.status(400).json({ message: 'sectionId and title are required' });
        }

        const isImage        = req.file.mimetype.startsWith('image/');
        const resourceType   = isImage ? 'image' : 'raw';

        // Upload buffer → Cloudinary
        const result = await uploadToCloudinary(req.file.buffer, {
            folder:        'udemy_materials',
            resource_type: resourceType,
        });

        const fileUrl  = result.secure_url;
        const fileType = req.file.mimetype;

        // Save to DB
        const dbResult = await pool.query(
            `INSERT INTO materials (section_id, title, file_url, file_type, download_allowed)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, title, file_url, file_type, download_allowed`,
            [sectionId, title, fileUrl, fileType,
             downloadAllowed === 'true' || downloadAllowed === true]
        );

        res.status(201).json({
            message:  'Material uploaded successfully',
            material: dbResult.rows[0],
        });

    } catch (error) {
        console.error('uploadMaterial error:', error.message);
        res.status(500).json({ message: 'Server error during material upload' });
    }
};


// ─────────────────────────────────────────────────────────────
// DELETE /api/upload/video/:lectureId
// ─────────────────────────────────────────────────────────────
const deleteVideo = async (req, res) => {
    const { lectureId } = req.params;

    try {
        const lecture = await pool.query(
            'SELECT video_url FROM video_lectures WHERE id = $1',
            [lectureId]
        );

        if (lecture.rows.length === 0) {
            return res.status(404).json({ message: 'Lecture not found' });
        }

        // Extract public_id from Cloudinary URL
        const url      = lecture.rows[0].video_url;
        const parts    = url.split('/');
        const filename = parts[parts.length - 1].split('.')[0];
        const folder   = parts[parts.length - 2];
        const publicId = `${folder}/${filename}`;

        await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
        await pool.query('DELETE FROM video_lectures WHERE id = $1', [lectureId]);

        res.status(200).json({ message: 'Video deleted successfully' });

    } catch (error) {
        console.error('deleteVideo error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { uploadVideo, uploadMaterial, deleteVideo };