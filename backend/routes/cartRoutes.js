const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartControllers');
const {requireAuth} = require('../middlewares/auth');

router.post('/wishlist/:id', requireAuth, cartController.addToWishlist);
router.get('/wishlist', requireAuth, cartController.getWishlist)
module.exports = router;