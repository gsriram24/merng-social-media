# MERNG Social Media Platform

> Social Media platform built with the MERN stack & GraphQL.

## Usage

### ES Modules in Node

We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

### Install Dependencies (frontend & backend)

```
yarn install
cd frontend
yarn install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
yarn run dev && cd frontend && yarn start

# Run backend only
yarn run dev
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
yarn run build
```
