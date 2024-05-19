# Social Media API

## Description
This project is an API for a generic social network, consisting of models, controllers and routes. This project utilizes MongoDB and Mongoose as a non-SQL database alternative. The application has no front-end and can instead be accessed by making requests with Postman. The database schema consists of Users, Thoughts (social media posts), and Reactions (comments on individual Thoughts). Creating this project was an exercise of familiarizing myself with NoSQL databases. It has also served as good practice in writing models, controllers, and routes, and understanding the architecture of an API and back-end.

## Usage
This program requires a connection to a MongoDB database. I use MongoDB Compass to create a local connection. After creating a MongoDB connection to mongodb://localhost:27017/, run npm install to install the dependencies, and then run npm start. The database can then be accessed using Postman or any other API platform. Users can make the following queries:

GET all users

GET a user by ID

POST a new user (given 'username' and 'email' values)

DELETE a user by ID

PUT (update) a user by ID


GET all thoughts

GET a thought by ID

POST a new thought (given 'username' and 'thoughtText' values)

PUT (update) a thought by ID

DELETE a thought by ID



POST (add) a new friend to a user (given a 'friendId' value)

DELETE a friend from a user


POST a reaction to a thought (given 'username' and 'reactionBody' values)

DELETE a reaction


[This video](https://drive.google.com/file/d/12BBhHVb1azqcj0sQt3u7yFLyx2i-zIPk/view) demonstrates each of these queries.

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Questions
I can be reached with questions or feedback at https://github.com/owenphineas

or via email: opjoh10@gmail.com