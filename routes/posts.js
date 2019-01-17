const express = require("express");
const router = express.Router();
const cuid = require("cuid");
const filter = require("lodash/filter");

const examplePostId = cuid();
// initial data
let postsLists = [
  {
    id: examplePostId,
    author: "Anonymous",
    title: "EA newest game",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's " +
      "standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make " +
      "a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, " +
      "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing " +
      "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions " +
      "of Lorem Ipsum."
  }
];

let commentsList = [
  {
    id: 1,
    postId: examplePostId,
    author: "Anonymous",
    content: "This is by far the best blog post for this game."
  },
  {
    id: 2,
    postId: examplePostId,
    author: "Anonymous",
    content: "A 5 stars post"
  }
];

// create post method
const createPost = async ({ author, title, content }) => {
  const id = cuid();
  await postsLists.push({
    id,
    author,
    title,
    content
  });
};

// create comment method
const createComment = async ({ postId, author, content }) => {
  const id = cuid();
  await commentsList.push({
    id,
    postId,
    author,
    content
  });
};

const getPost = ({ id }) => ({
  post: filter(postsLists, { id })[0]
});

const getComments = ({ postId }) => ({
  commentsList: filter(commentsList, { postId })
});

// API
// get list of posts
router.get("/api", (req, res) => {
  res.status(200).send({ postsLists });
});

// get a single post
router.get("/api/:id", (req, res) => {
  const { id } = req.params;
  const { post } = getPost({ id });
  res.status(200).send({ post });
});

// get list of comments related to a post
router.get("/api/comments/:id", (req, res) => {
  const { id } = req.params;
  const { commentsList } = getComments({ postId: id });
  res.status(200).send({ commentsList });
});

// create a post
router.post("/api", async (req, res) => {
  const { author, title, content } = req.body;
  // create post
  if (author && title && content) {
    await createPost({ author, title, content });
    res.status(201).send("post has been created successfully");
  }
  res
    .status(400)
    .send(
      "please make sure you have sent the correct post format: { auther: 'name', title: 'EA new game', and content: 'It's awesome' } "
    );
});

// create a comment
router.post("/api/comments", async (req, res) => {
  const { postId, author, content } = req.body;
  // create post
  if (postId && author && content) {
    await createComment({ author, content, postId });
    res.status(201).send("comment has been created successfully");
  }
  res
    .status(400)
    .send(
      "please make sure you have sent the correct post format: { auther: 'name', content: 'EA new game', postId: '' } "
    );
});

/* GET posts listing. */
router.get("/", (req, res) => {
  res.render("posts", { postsLists });
});

/* GET create new post page */
router.get("/new", (req, res) => {
  res.render("post_new");
});

// get a single post
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const { post } = getPost({ id });
  const { commentsList } = getComments({ postId: id });
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
