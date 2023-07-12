# Rapid-Xpress

A CLI generator for lightning-fast scaffolding of ExpressJS applications, empowering you to build with speed and efficiency

# Installing rapid Xpress

Rapid Xpress is available on on the [npm registry](https://www.npmjs.com/)

Requires Nodejs to be installed

Install Rapid Xpress globally so you can have access to it anywhere

`$ npm i -g rapid-xpress`

# FEATURES

- Rapidly initialize your project.
- Pre-configured authentication features.
- Effortlessly create application files with CRUD operations.

# Docs

- Click here for documentation

# GETTING STARTED

To initialize a new project, you need to use the <b>create</b> command and specify the template to use.

Only express is supported at the moment

Let's create a new Express app, <b>rapid</b>, with the default template. Project files would be created in the current working directory

`$ rapid-xpress create express`

To use a specified template e.g mvc

`$ rapid-xpress create express --variant mvc`

Project dependencies are automatiacally installed

To run development server

`npm run dev`

Server would be running on http://localhost:8080/ by default

# Contributors

Author: [Bassit Owolabi](https://github.com/breellz)

# License

[MIT](https://github.com/breellz/Rapid-Xpress/blob/main/LICENSE)
