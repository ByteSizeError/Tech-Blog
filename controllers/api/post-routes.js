const router = require("express").Router();
const { Post } = require("../../models");

// Get route for all post
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll();
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get route for post by id
router.get("/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (!postData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post route for post
router.post("/", async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Put route for post by id
router.put("/:id", async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!postData[0]) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete route for post by id
router.delete("/:id", async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
