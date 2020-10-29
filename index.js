const express = require('express');
const bodyParser = require('body-parser');
const app = (module.exports = express());
const users = require('./controllers/users')();
const usersModel = require('./models/users')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues')();
const comments = require('./controllers/comments')();

const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

//test the key
app.use(async (req, res, next) => {
    const FailedMessage = {
        error: 'Failed Authentication',
        message: 'not autorized',
        code: 'xxx'
    };

    const suppliedkey = req.headers['x-api-key'];
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (!suppliedkey) {
        console.log('Failed authentication, no key suplied');
        new Date(), clientIp;
        FailedMessage.code = '01';
        return res.status(401).json(FailedMessage);
    };

    const user = await usersModel.getKey(suppliedkey);

    if (!user) {
        FailedMessage.code = '02';
        return res.status(401).json(FailedMessage);
    };

    next();

});


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

//Comments
app.post('/issues/:slugtitle/comments', comments.postComment); // add comments
app.get('/issues/:slugtitle/comments', comments.getAll); // get all comments
app.get('/issues/:slugtitle/comments/:commentId', comments.getComment); // get comments by ID

app.get('/', (req, res) => {
    res.send('Welcome to CBWA 1');
});

app.use((req, res) => {
    res.status(404).json({
        error: 404,
        message: 'not found',
    });
});

app.listen(port, hostname, () => {
    console.log(`App listening at http://${hostname}:${port}`);
}); //where the api is running