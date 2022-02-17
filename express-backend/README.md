## Backend: Node.js/Express

This is a pure-backend application written in Node.js and Express, in the modern ECMAScript module format, providing a sample API for experimental purposes.

The backend makes use of the `dot-env` package, so a file precisely named `.env` is required in the root, next to `index.js`. A sample env file is like so:
```
NODE_ENV="dev"
PORT=3001
#MORGAN_LOG_FORMAT="common"
JWT_TOKEN_SECRET="superSecureTokenSecretForJwtXD"
```
To run in dev environment: `npm run dev`
