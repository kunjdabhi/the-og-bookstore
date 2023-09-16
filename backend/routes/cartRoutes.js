const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartControllers');
const {requireAuth} = require('../middlewares/auth');

router.post('/wishlist/:id', requireAuth, cartController.addToWishlist);
router.get('/wishlist', requireAuth, cartController.getWishlist);
router.get('/cart', requireAuth, cartController.getCart);
router.post('/cart/:id/:qty', requireAuth, cartController.addToCart);
router.post('/cart/:id', requireAuth, cartController.removeFromCart);

module.exports = router;