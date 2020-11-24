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

- Body-parser - 1.19.0
- ExpressJS - 4.17.1
- MongoDB - 3.6.2

## Setup

Clone this repository using git clone https://github.com/MarianaAzedo/bugtracker-cbwa.
Move to the appropriate directory: cd bugtracker-cbwa.
Run npm install to install dependencies.
Run npm start, it will open the browser when ready.

## Example_usage

Endpoint:

- users

get all the users /users
get users by email /users/:email
add (post) new user /users

example:
{
"\_id": "",
"name": "Mariana",
"email": "mari.azedo.ma@gmail.com",
"usertype": "admin",
"key": "newpassword"
},

- projects

get all projects /projects
get projects by name of the project get /projects/:slug
post (add) projects /projects

example:
{
"\_id": "",
"slug": "BUG",
"name": "Bugtrack",
"description": "New Bugtrack CA1 CBWA"
},

- issues

get issues /issues
get issues by name /issues/:slug
get issues by project /projects/:slug/issues
add (post) issues /projects/:slugtitle/issues

- Comments

add (post) comments /issues/:slugtitle/comments
get all comments /issues/:slugtitle/comments
get comments by ID /issues/:slugtitle/comments/:commentId

## Changelog

- Oct 24, 2020 - start project CBWA
- Oct 29, 2020 - create user key
- Nov 16, 2020 - reject
- Nov 23, 2020 - not be able to duplicate users (based on email), not be able to duplicate projects based on SLUG, not be able to add any item without all the fields.
- Nov 24, 2020 - Docker-ise the application, Add in email notifications.

## Roadmap

Project is: _in progress_.

- Start working on frontend
- Start unit testing
- Add in issue linking (blocking, blocks, relates to, etc)
- Add in due dates
- Add Watchers of an issue

## Author_info

Created by Mariana Azedo 2020095
