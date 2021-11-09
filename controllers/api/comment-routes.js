const router = require("express").Router();
const { Comment } = require("../../models");

// Get route for all comments
router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get route for comment by id
router.get("/:id", async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);
        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id!" });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post route for comment
router.post("/", async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Put route for comments by id
router.put("/:id", async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!commentData[0]) {
            res.status(404).json({ message: "No comment found with this id!" });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete route for comments by id
router.delete("/:id", async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id!" });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
