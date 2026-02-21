import express from 'express';

const router = express.Router();

// @route   GET /api/health
// @desc    Health check route
// @access  Public
router.get('/', (req, res) => {
    res.json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        message: 'VC AI Scout API is healthy'
    });
});

export default router;
