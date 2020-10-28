const express = require('express');
const bodyParser = require('body-parser');
const app = (module.exports = express());
const users = require('./controllers/users')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues')();
const comments = require('./controllers/comments')();

const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

app.use(bodyParser.json());

//users
app.get('/users', users.getUserController); //get all users
app.get('/users/:email', users.getUserEmail); //get by email
app.post('/users', users.postController); //add new user

//projects
app.get('/projects', projects.getUserController); //get projects
app.get('/projects/:slug', projects.getSlug); // get projects by name of the project
app.post('/projects', projects.postController); //add projects


//issues
app.get('/issues', issues.getUserController); // get issues 
app.get('/issues/:slug', issues.getIssue); // get issues by name
app.get('/projects/:slug/issues', issues.getByProject); //get issues by project
app.post('/projects/:slugtitle/issues', issues.postController); //add issues

//Comments **not working
app.post('/issues/:slugtitle/comments', comments.postComment); // add comments
app.get('/issues/:slugtitle/comments', comments.getAll); // get all comments
app.get('/issues/:slugtitle/comments/:commentId', comments.getComment); // get comments by ID

app.listen(port, hostname, ()=>{
    console.log(`App listening at http://${hostname}:${port}`);
}); //where the api is running