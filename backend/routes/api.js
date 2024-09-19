const express = require('express');
const router = express.Router();
const WasteData = require('../models/wasteData');

// Mock menu data
const menuData = {
    "2024-09-18": { breakfast: "Idli, Sambar", lunch: "Rice, Dal", snacks: "Tea, Biscuits", dinner: "Chapati, Paneer" },
    // Add other dates with menu here...
};

router.get('/menu', (req, res) => {
    res.json(Object.keys(menuData).map(date => ({ title: 'Menu', start: date })));
});

router.get('/menu/:date', (req, res) => {
    const menu = menuData[req.params.date] || {};
    res.json(menu);
});

router.post('/waste', async (req, res) => {
    const { date, breakfast, lunch, snacks, dinner } = req.body;
    const newWasteData = new WasteData({ date, breakfast, lunch, snacks, dinner });
    await newWasteData.save();
    res.send('Waste data saved.');
});

router.get('/waste/stats', async (req, res) => {
    const stats = await WasteData.aggregate([
        {
            $group: {
                _id: null,
                breakfast: { $sum: "$breakfast" },
                lunch: { $sum: "$lunch" },
                snacks: { $sum: "$snacks" },
                dinner: { $sum: "$dinner" }
            }
        }
    ]);
    res.json(stats[0]);
});

module.exports = router;