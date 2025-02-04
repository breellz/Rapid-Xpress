# Rapid-Xpress

A CLI generator for lightning-fast scaffolding of ExpressJS applications, empowering you to build with speed and efficiency

# Installing rapid Xpress

Rapid Xpress is available on NodeJs via the [npm registry](https://www.npmjs.com/)

Requires Nodejs to be installed

Install Rapid Xpress globally so you can have access to it anywhere

`$ npm i -g rapid-xpress`

# FEATURES

- Rapidly initialize your project.
- Pre-configured authentication features.
- Rate limiting and custom error handling configured
- Effortlessly create application files with CRUD operations.

# Docs

- Click here for [documentation](https://documenter.getpostman.com/view/11784799/2s946e9DA7)

# GETTING STARTED

To initialize a new project, you need to use the <b>create</b> command

Let's create a new Express app, with the default template. Project files would be created in the current working directory

Template comes with authentication, custom error handling, rate limiting and more

`$ rapid-xpress create express`

To use a specified template e.g mvc

`$ rapid-xpress create express --variant mvc`

Project dependencies are automatically installed and you'll be prompted for your project attributes

To run development server

`npm run dev`

Server would be running on http://localhost:8080/ by default

# Contributors

Author: [Bassit Owolabi](https://github.com/breellz)

Contributions are welcomed. Kindly visit the github repo and submit a pull request

# License

[MIT](https://github.com/breellz/Rapid-Xpress/blob/main/LICENSE)
