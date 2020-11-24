# BugTracker CBWA

> This is a bugtracker example.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Example usage](#Example_usage)
- [Changelog](#Changelog)
- [Roadmap](#Roadmap)
- [Author info](#Author_info)

## General info

This project helps you to how to organize your stakeholders allowing you to add new user, by name, e-mail, user-type and key. Is it possible to get all the users posted by e-mail or Name.

You also can add a new project by Slug, project name and description. Find the projects by Slug, name, user, description and most important add a comment.

## Technologies

- Body-parser - ^1.19.0
- Express - ^4.17.1
- Mongodb - ^3.6.2

## Setup

Describe how to install / setup your local environement / add link to demo version.

## Example_usage

Examples of usage:

- users

app.get('/users', users.getUserController); //get all users
app.get('/users/:email', users.getUserEmail); //get by email
app.post('/users', users.postController); //add new user
example:
{
"\_id": "",
"name": "Mariana",
"email": "mari.azedo.ma@gmail.com",
"usertype": "admin",
"key": "newpassword"
},

- projects

app.get('/projects', projects.getUserController); //get projects
app.get('/projects/:slug', projects.getSlug); // get projects by name of the project
app.post('/projects', projects.postController); //add projects
example:
{
"\_id": "",
"slug": "BUG",
"name": "Bugtrack",
"description": "New Bugtrack CA1 CBWA"
},

- issues

app.get('/issues', issues.getUserController); // get issues
app.get('/issues/:slug', issues.getIssue); // get issues by name
app.get('/projects/:slug/issues', issues.getByProject); //get issues by project
app.post('/projects/:slugtitle/issues', issues.postController); //add issues

- Comments

app.post('/issues/:slugtitle/comments', comments.postComment); // add comments
app.get('/issues/:slugtitle/comments', comments.getAll); // get all comments
app.get('/issues/:slugtitle/comments/:commentId', comments.getComment); // get comments by ID

## Changelog

- Oct 29, 2020 - create user key.
- Nov 16, 2020 - reject
- Nov 24, 2020 - not be able to duplicate users (based on email),
  not be able to duplicate projects based on SLUG, not be able to add any item without all the fields.

## Roadmap

Project is: _in progress_.

- Start working on frontend
- Docker-ise the application
- Start unit testing
- Add in issue linking (blocking, blocks, relates to, etc)
- Add in due dates
- Add Watchers of an issue (who wants updates on the status of issues/projects)
- Add in email notifications

## Author_info

Created by Mariana Azedo 2020095
