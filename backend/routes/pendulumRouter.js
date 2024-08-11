const express = require('express');
const { AddPendulum, GetPendulum } = require('../controller/pendulumController');

const router = express.Router();

// Define routes
router.post('/pendulum', AddPendulum);
router.get('/pendulum/:id', GetPendulum);

module.exports = router;
