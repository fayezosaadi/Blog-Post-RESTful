const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

// During the test the env variable is set to test
process.env.NODE_ENV = "test";

chai.should();
chai.use(chaiHttp);

describe("Posts", () => {
  let postId;
  describe("/GET posts", () => {
    it("it should GET all the posts", done => {
      chai
        .request(server)
        .get("/posts/api")
        .end((err, res) => {
          const { id } = res.body.postsLists[0];
          postId = id;

          res.should.have.status(200);
          res.body.postsLists.should.be.a("array");
          res.body.postsLists.length.should.be.eql(1);
          done();
        });
    });

    it("it should GET a single post", done => {
      chai
        .request(server)
        .get(`/posts/api/${postId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("it should GET list of comments related to a post", done => {
      chai
        .request(server)
        .get(`/posts/api/comments/${postId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.commentsList.should.be.a("array");
          res.body.commentsList.length.should.be.eql(2);
          done();
        });
    });
  });

  describe("/POST posts", () => {
    it("it should not POST a post without content field", done => {
      const post = {
        title: "Bloodstained",
        author: "Tolkien"
      };

      chai
        .request(server)
        .post("/posts/api")
        .send(post)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.equal(
            "please make sure you have sent the correct post format: { auther, title, content }"
          );
          done();
        });
    });

    it("it should POST a post", done => {
      const post = {
        title: "Code Vein",
        author: "Tolkien",
        content: 'Code Vein is easily described as "anime Dark Souls."'
      };

      chai
        .request(server)
        .post("/posts/api")
        .send(post)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("post has been created successfully");
          done();
        });
    });

    it("it should not POST a comment without postId field", done => {
      const comment = {
        author: "Tolkien",
        content: 'Code Vein is easily described as "anime Dark Souls."'
      };

      chai
        .request(server)
        .post("/posts/api/comments")
        .send(comment)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql(
              "please make sure you have sent the correct post format: { auther, content, postId }"
            );
          done();
        });
    });

    it("it should POST a comment", done => {
      const post = {
        postId: "123",
        author: "Tolkien",
        content: "Thanks for the review"
      };

      chai
        .request(server)
        .post("/posts/api/comments")
        .send(post)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("comment has been created successfully");
          done();
        });
    });
  });
});
