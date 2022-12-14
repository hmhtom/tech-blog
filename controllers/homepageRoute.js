const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

//main page rendering route
//rendering all the posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: User,
      order: [["updatedAt", "DESC"]],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      currentUsername: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login page
router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Dashboard Page
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      posts,
      currentId: req.session.user_id,
      currentUsername: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Create new post page
router.get("/dashboard/new-post", withAuth, (req, res) => {
  try {
    res.render("new-post", {
      currentId: req.session.user_id,
      currentUsername: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Post page
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: { exclude: ["password"] } }],
        },
        { model: User, attributes: { exclude: ["password"] } },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("post", {
      ...post,
      currentId: req.session.user_id,
      currentUsername: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update post page
router.get("/update-post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
    });
    const post = postData.get({ plain: true });
    res.render("update-post", {
      ...post,
      currentId: req.session.user_id,
      currentUsername: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
