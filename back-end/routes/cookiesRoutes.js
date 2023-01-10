const express = require('express');
const {sendCookies} = require('../controllers/cookiesController');
const router = express.Router();
const {
    authenticateUser,

} = require('../middleware/authentication');
router.route('/').get( authenticateUser,sendCookies);

module.exports = router;
