const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
            order: [["date_created", "DESC"]],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render("homepage", {
            logged_in: req.session.logged_in,
            posts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],

            where: {
                user_id: req.session.user_id,
            },
            order: [["date_created", "DESC"]],
        });

        const posts = postData.map((user) => user.get({ plain: true }));

        res.render("dashboard", {
            logged_in: req.session.logged_in,
            posts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/create", withAuth, async (req, res) => {
    res.render("create");
});

router.get("/edit/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        const post = postData.get({ plain: true });

        res.render("edit", {
            logged_in: req.session.logged_in,
            post,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/posts/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }],
        });

        const post = postData.get({ plain: true });

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

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("signup");
});

module.exports = router;
