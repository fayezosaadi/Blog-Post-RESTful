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

// get list of posts
const getPosts = () => postsLists;

// get list of comments
const getComments = ({ postId }) => ({
  commentsList: filter(commentsList, { postId })
});

// get a single post
const getPost = ({ id }) => ({
  post: filter(postsLists, { id })[0]
});

// create a post
const createPost = async ({ author, title, content }) => {
  const id = cuid();
  await postsLists.push({
    id,
    author,
    title,
    content
  });
};

// create a comment
const createComment = async ({ postId, author, content }) => {
  const id = cuid();
  await commentsList.push({
    id,
    postId,
    author,
    content
  });
};

module.exports = {
  getPosts,
  getComments,
  getPost,
  createPost,
  createComment
};
