# Koa Postgres Boilerplate

## Installation

```
# Run the usual npm command
npm install

# Install the knex-cli to run migrations
npm install --global knex

# Create the database file
touch db/database.sqlite

# Run database migrations
knex migrate:latest

# Optionally run the the database seed (they're in db/seeds)
knex seed:run

# Start the app with nodemon (or just start it with node index.js)
npm run start:dev

# Run the dummy test
npm test

# Run eslint
npm run lint
```
