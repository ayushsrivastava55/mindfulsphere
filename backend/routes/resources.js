const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Mock data for resources (replace with database implementation later)
const resources = [
    {
        id: 1,
        title: 'Understanding Anxiety',
        description: 'Learn about anxiety symptoms and coping strategies',
        type: 'article',
        isPremium: false,
        url: '/resources/anxiety-guide',
    },
    {
        id: 2,
        title: 'Guided Meditation Session',
        description: '15-minute guided meditation for stress relief',
        type: 'audio',
        isPremium: true,
        url: '/resources/meditation-1',
    },
    {
        id: 3,
        title: 'Depression Support Guide',
        description: 'Comprehensive guide for managing depression',
        type: 'article',
        isPremium: false,
        url: '/resources/depression-guide',
    },
];

// Get all resources
router.get('/', auth, async (req, res) => {
    try {
        // Filter resources based on user's premium status
        const filteredResources = resources.filter(resource => 
            !resource.isPremium || (resource.isPremium && req.user.isPremium)
        );
        res.json(filteredResources);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resources' });
    }
});

// Get a specific resource by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const resource = resources.find(r => r.id === parseInt(req.params.id));
        
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        // Check if user has access to premium content
        if (resource.isPremium && !req.user.isPremium) {
            return res.status(403).json({ message: 'Premium subscription required' });
        }

        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resource' });
    }
});

module.exports = router;
