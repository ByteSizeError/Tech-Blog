const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// * Homepage
router.get("/", async (req, res) => {
    try {
        // Find all post
        const postData = await Post.findAll({
            include: [{ model: User }],
            order: [["date_created", "DESC"]],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        // Renders the homepage
        res.render("homepage", {
            logged_in: req.session.logged_in,
            posts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// * Dashboard
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        // Find all post by the user thats signed in
        const postData = await Post.findAll({
            include: [{ model: User }],
            where: {
                user_id: req.session.user_id,
            },
            order: [["date_created", "DESC"]],
        });

        const posts = postData.map((user) => user.get({ plain: true }));

        // Renders the dashboard
        res.render("dashboard", {
            logged_in: req.session.logged_in,
            posts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// * Create
router.get("/create", withAuth, async (req, res) => {
    res.render("create");
});

router.get("/edit/:id", withAuth, async (req, res) => {
    try {
        // Find post by the id
        const postData = await Post.findByPk(req.params.id);

        const post = postData.get({ plain: true });

        // Renders edit page
        res.render("edit", {
            logged_in: req.session.logged_in,
            post,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// * Post
router.get("/posts/:id", withAuth, async (req, res) => {
    try {
        // Find specific post by id
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }],
        });

        const post = postData.get({ plain: true });

        // Find all comments with post id
        const commentData = await Comment.findAll({
            include: [{ model: User }],
            where: {
                post_id: req.params.id,
            },
            order: [["date_created", "DESC"]],
        });

        const comments = commentData.map((comment) =>
            comment.get({ plain: true })
        );

        // Find all user comments for the post
        const userCommentData = await Comment.findAll({
            include: [{ model: User }],
            where: {
                post_id: req.params.id,
                user_id: req.session.user_id,
            },
            order: [["date_created", "DESC"]],
        });

        const userComments = userCommentData.map((comment) =>
            comment.get({ plain: true })
        );

        // Renders post view
        res.render("post", {
            logged_in: req.session.logged_in,
            post,
            comments,
            userComments,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// * Login
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

// * Sign Up
router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("signup");
});

module.exports = router;
