const express = require("express");
const router = express.Router();
const {
  getPosts,
  getComments,
  getPost,
  createPost,
  createComment
} = require("../queries/posts");

// API
// get list of posts
router.get("/api", (req, res) => {
  res.status(200).send({ postsLists: getPosts() });
});

// get a single post
router.get("/api/:id", async (req, res) => {
  const { id } = req.params;
  const { post } = await getPost({ id });
  res.status(200).send({ post });
});

// get list of comments related to a post
router.get("/api/comments/:id", async (req, res) => {
  const { id } = req.params;
  const { commentsList } = await getComments({ postId: id });
  res.status(200).send({ commentsList });
});

// create a post
router.post("/api", async (req, res) => {
  const { author, title, content } = req.body;
  // create post
  if (author && title && content) {
    await createPost({ author, title, content });
    res.status(201).send({ message: "post has been created successfully" });
  } else {
    res.status(400).send({
      message:
        "please make sure you have sent the correct post format: { auther, title, content }"
    });
  }
});

// create a comment
router.post("/api/comments", async (req, res) => {
  const { postId, author, content } = req.body;
  // create post
  if (postId && author && content) {
    await createComment({ author, content, postId });
    res.status(201).send({ message: "comment has been created successfully" });
  } else {
    res.status(400).send({
      message:
        "please make sure you have sent the correct post format: { auther, content, postId }"
    });
  }
});

/* GET posts listing. */
router.get("/", (req, res) => {
  res.render("posts", { postsLists: getPosts() });
});

/* GET create new post page */
router.get("/new", (req, res) => {
  res.render("post_new");
});

// get a single post
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { post } = await getPost({ id });
  const { commentsList } = await getComments({ postId: id });
  res.render("post", { post, commentsList });
});

// create a new post
router.post("/create", async (req, res) => {
  const { author, title, content } = req.body;
  // create post
  if (author && title && content) {
    await createPost({ author, title, content });
  }
  // redirect to posts page
  res.redirect("/posts");
});

// create a new comment
router.post("/comments/create", async (req, res) => {
  const { postId, author, content } = req.body;

  if (author && postId && content) {
    await createComment({
      postId,
      author,
      content
    });
  }
  // redirect to posts page
  res.redirect(`/posts/${postId}`);
});

module.exports = router;
