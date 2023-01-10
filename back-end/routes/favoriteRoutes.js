const express = require('express');
const {AddFarvorite,CheckFavorite} = require('../controllers/favoriteController');
const router = express.Router();
const {
    authenticateUser,

} = require('../middleware/authentication');
router.route('/').post( authenticateUser,AddFarvorite)
router.route('/check').post(authenticateUser,CheckFavorite)

module.exports = router;
