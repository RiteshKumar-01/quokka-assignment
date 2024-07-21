const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const articleController = require('../controllers/articleController');
const router = express.Router();

router.get('/', articleController.getAllArticles);
router.post('/', verifyToken, articleController.createArticle);
router.put('/:id', verifyToken, articleController.updateArticle);
router.delete('/:id', verifyToken, articleController.deleteArticle);

module.exports = router;
