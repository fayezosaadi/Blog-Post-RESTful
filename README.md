# EA Blog Posts Application

A simple blog post application based on RESTful architecture that uses Express, html and css3

## Technical Approach & Objectives

The server is built with Node, Express and in memory storage and allows users to request and submit blog posts and
comments. It also has an RESTful api version that will response with JSON objects.

## Getting Started

1.  clone this repository.
2.  Install dependencies: `npm install` or `npm i` for short.
3.  Start the web server from the command line: `npm run start`
4.  Open the app on <http://localhost:3001/> and make sure that it's loading.
5.  Follow instruction on the home page

## Getting Started with the API version

* You can curl or use any http client app such as `Postman` to query the desired endpoint

- Querying `/posts/api` will return a full list of posts
- Querying `/posts/api/<postId>` will return a single post
- Querying `/posts/api/comments/<postId>` will return a list of related comments
- Posting into `/posts/api` will create a new post and return a success message
- Posting into `/posts/api/comments` will create a new comment and return a success message

## Dependencies & Troubleshooting

Dependencies:

* Express
* Node 5.10.x or above

## Getting Started with Docker

1.  Build the app image `docker build -t <your username>/node-web-app .`
2.  Verify the image has been built successfully `docker images`
3.  Run the image `docker run -p 3001:3001 -d <your username>/node-web-app`
4.  Verify the container is up and running `docker ps`
5.  Open the app on <http://localhost:3001/> and make sure that it's loading.

## Deploying into production

You can push the docker container built in the previous steps into your cloud service of choice, I have decided to use
Heroku:

* link on production. `https://ea-blog-post.herokuapp.com/`
