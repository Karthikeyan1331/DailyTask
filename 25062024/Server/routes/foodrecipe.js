const express = require('express');
const router = express.Router();
const Food = require('../model/FoodRecipe');

router.get('/food', async (req, res) => {
    try {
        const findAll = await Food.find().limit(10);
        res.status(200).json(findAll);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/food/:id', async (req, res) => {
    try {
        const {id} = req.params
        const findAll = await Food.findById(id);
        res.status(200).json(findAll);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;