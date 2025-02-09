# hello

This project was generated with [Rapid Xpress](https://) v1.0.0.

## Installation

1. Install dependencies - `npm install`

2. Provide values for the configuration env files at the `src/config/ directory`.

## Running the server locally

1. Start up the server - Run `npm run dev`

2. Server should start running on http://localhost:8080/ by default

## Code scaffolding

Run `banga generate <type> <name>` to generate a new file types. Visit [here](https://bangajs.netlify.app/#banga-generate) for more info.

## Routes

| Routes                         | Description                 | Auth roles |
| ------------------------------ | --------------------------- | ---------- |
| [POST] &nbsp; /users           | Create a new account        | none       |
| [POST] &nbsp; /users/login     | User sign in                | none       |
| [POST] &nbsp; /users/logout    | logout single session       | User       |
| [POST] &nbsp; /users/logoutAll | Logout all sessions         | User       |
| [GET] &nbsp; /api/users/me     | Get user profile            | User       |
| [POST] &nbsp; /users/me/avatar | upload user profile picture | User       |
| [GET]&nbsp; /users/:id/avatar  | Get user avatar             | User       |
| [PATCH] &nbsp; /users/me       | Update a user               | User       |
| [DELETE] &nbsp; /users/me      | Delete a user               | User       |
