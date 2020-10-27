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
app.get('/users', users.getUserController);
app.get('/users/:email', users.getUserEmail);
app.post('/users', users.postController);

//projects
app.get('/projects', projects.getUserController);
app.get('/projects/:slug', projects.getSlug);
app.post('/projects', projects.postController);


//issues
app.get('/issues', issues.getUserController);
app.get('/issues/:slug', issues.getIssue);
app.get('/projects/:slug/issues', issues.getByProject);
app.post('/projects/:slugtitle/issues', issues.postController);

//Comments **not working
app.post('/issues/:slugtitle/comments', comments.postComment);
app.get('/issues/:slugtitle/comments', comments.getAll);
app.get('/issues/:slugtitle/comments/:commentId', comments.getComment);


app.get('/', (req, res)=>{
    res.send('Hello World');
}); // when anyone required get

app.listen(port, hostname, ()=>{
    console.log(`App listening at http://${hostname}:${port}`);
}); //where the api is running