const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers');
const { requireAuth } = require('../middlewares/auth');

router.get('/',bookController.getBooks);

router.get('/:id' ,bookController.getBookById)

router.post('/', requireAuth ,bookController.postBook);

router.delete('/:id', requireAuth, bookController.deleteBook);

router.patch('/:id',requireAuth, bookController.updateBook);

module.exports = router;