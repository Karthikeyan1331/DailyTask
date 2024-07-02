

const express = require('express');
const router = express.Router();
const Story = require('../model/Stories');


// Example route to create a new story
router.put('/stories/:id', async (req, res) => {
    console.log(req.body)
    const { id } = req.params;
    const { title, author, category } = req.body;
    console.log(id,title,author,category)
    try {
        const updatedStory = await Story.findByIdAndUpdate(id, { title, author, category }, { new: true });
        if (!updatedStory) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json(updatedStory);
    } catch (error) {
        console.error("Error updating story:", error.message);
        res.status(500).json({ message: 'Server error' });
    }
})
router.get('/', async (req, res) => {
    try {
        res.status(200).json({ message: "Success" })
    } catch (error) {
        res.status(401).json({ message: "Success" })
    }
})
router.post('/stories', async (req, res) => {
    try {
        const { title, author, category } = req.body;
        const newStory = new Story({ title, author, category });
        const savedStory = await newStory.save();
        res.status(201).json(savedStory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Example route to get all stories
router.get('/stories', async (req, res) => {
    try {
        const stories = await Story.find();
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/stories/:id', async (req, res) => {
    try {
        const stories = await Story.findById(req.params.id);
        if (!stories)
            res.status(404).json({ message: 'Story not found' });
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/stories/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Story.findByIdAndDelete(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
