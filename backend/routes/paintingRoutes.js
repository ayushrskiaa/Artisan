const express = require('express');
const router = express.Router();
const Painting = require('../models/Painting');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

// @desc    Get all paintings
router.get('/', async (req, res) => {
    try {
        const paintings = await Painting.find({}).sort({ createdAt: -1 });
        res.json(paintings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get single painting
router.get('/:id', async (req, res) => {
    try {
        const painting = await Painting.findById(req.params.id);
        if (painting) {
            res.json(painting);
        } else {
            res.status(404).json({ message: 'Painting not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete a painting
// @route   DELETE /api/paintings/:id
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const painting = await Painting.findById(req.params.id);
        if (painting) {
            await painting.deleteOne();
            res.json({ message: 'Painting removed' });
        } else {
            res.status(404).json({ message: 'Painting not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a painting
// @route   POST /api/paintings
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
    try {
        const { title, price, description, artist, category, isFeatured, isMasterpiece } = req.body;
        
        const painting = new Painting({
            title,
            price,
            description,
            artist,
            category,
            isFeatured: isFeatured === 'true' || isFeatured === true,
            isMasterpiece: isMasterpiece === 'true' || isMasterpiece === true,
            imageUrl: req.file ? req.file.path : ''
        });

        if (painting.isMasterpiece) {
            await Painting.updateMany({}, { isMasterpiece: false });
        }

        const createdPainting = await painting.save();
        res.status(201).json(createdPainting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update a painting
// @route   PUT /api/paintings/:id
router.put('/:id', protect, admin, upload.single('image'), async (req, res) => {
    try {
        const { title, price, description, artist, category, isFeatured, isMasterpiece } = req.body;
        const painting = await Painting.findById(req.params.id);

        if (painting) {
            painting.title = title || painting.title;
            painting.price = price || painting.price;
            painting.description = description || painting.description;
            painting.artist = artist || painting.artist;
            painting.category = category || painting.category;
            if (isFeatured !== undefined) {
                painting.isFeatured = String(isFeatured) === 'true';
            }

            if (isMasterpiece !== undefined) {
                const settingAsMasterpiece = String(isMasterpiece) === 'true';
                if (settingAsMasterpiece) {
                    await Painting.updateMany({}, { isMasterpiece: false });
                    painting.isMasterpiece = true;
                } else {
                    painting.isMasterpiece = false;
                }
            }
            
            if (req.file) {
                painting.imageUrl = req.file.path;
            }

            const updatedPainting = await painting.save();
            res.json(updatedPainting);
        } else {
            res.status(404).json({ message: 'Painting not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
