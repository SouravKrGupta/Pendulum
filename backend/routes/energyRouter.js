const express = require('express');
const { AddEnergy} = require('../controller/energyController');

const router = express.Router();

// Define routes
router.post('/add', AddEnergy);


module.exports = router;
