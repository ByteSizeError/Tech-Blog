const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
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

router.get("/posts/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        const post = postData.get({ plain: true });

        res.render("post", {
            logged_in: req.session.logged_in,
            post,
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
