const Article = require('../models/articleModel');

module.exports = {
    getAllArticles: async (req, res) => {
        try {
            const articles = await Article.find().populate('author', 'username');

            if (articles.length === 0) {
                return res.status(404).json({ message: 'No articles found' });
            }

            res.json(articles);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    createArticle: async (req, res) => {
        const { title, content } = req.body;

        try {
            const article = new Article({
                title,
                content,
                author: req.user.id,
            });

            await article.save();
            res.status(201).json(article);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    updateArticle: async (req, res) => {
        const { title, content } = req.body;

        try {
            const article = await Article.findById(req.params.id);

            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }

            if (article.author.toString() !== req.user.id) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            // Update only if new values are provided
            if (title) article.title = title;
            if (content) article.content = content;

            const updatedArticle = await article.save();
            res.json(updatedArticle);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    deleteArticle: async (req, res) => {
        try {
            const article = await Article.findById(req.params.id);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }

            if (article.author.toString() !== req.user.id) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await Article.deleteOne({ _id: req.params.id });
            res.json({ message: 'Article removed' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

