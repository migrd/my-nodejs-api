const express = require('express');
const router = express.Router();

const controller = require('../controllers/product-controller');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('search/:title', controller.getByTitle);
router.get('/tags/:tag', controller.getByTag);
router.get('/admin/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;