# EA Blog Posts Application

A simple blog post application based on RESTful architecture that uses Express, html and css3

## Technical Approach & Objectives

The server is built with Node, Express and in memory storage and allows users to request and submit blogs posts and
comments via a JSON end-points.

## Getting Started

1.  clone this repository.
2.  Install dependencies: `npm install` or `npm i` for short.
3.  Start the web server from the command line: `npm run start`
4.  Open the app on <http://localhost:3001/> and make sure that it's loading.
5.  Follow instruction on the home page

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
