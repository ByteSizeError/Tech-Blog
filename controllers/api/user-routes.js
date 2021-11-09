const router = require("express").Router();
const { User } = require("../../models");

// Get route for all user
router.get("/", async (req, res) => {
    try {
        const userData = await User.findAll({});
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post route for user when they sign up
router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Post route for user login
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username },
        });

        // If user not found send error
        if (!userData) {
            res.status(400).json({
                message: "Incorrect username or password, please try again",
            });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        // If password incorrect send error
        if (!validPassword) {
            res.status(400).json({
                message: "Incorrect username or password, please try again",
            });
            return;
        }

        // Save user id to session and set logged in to true
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Post route for logout
router.post("/logout", (req, res) => {
    // If user is logged in destroy their session
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
