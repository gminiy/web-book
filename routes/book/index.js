const router = require('express').Router();
const bookController = require('./book-controller');
const middlewares = require('../../middlewares/middlewares');

router.post('/', middlewares.isAdmin, bookController.register);
router.get('/', bookController.renderAbookPage);
router.put('/', middlewares.isAdmin, bookController.update);
router.delete('/', middlewares.isAdmin, bookController.delete);
router.get('/update', middlewares.isAdmin, bookController.renderUpdatePage);

module.exports = router;