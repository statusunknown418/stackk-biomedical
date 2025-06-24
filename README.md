# Stackk biomedical

Something cool here

## Setup

You'll need these keys

```env
# Since .env is gitignored, you can use .env.example to build a new `.env` file when you clone the repo.
# Keep this file up-to-date when you add new variables to \`.env\`.

# This file will be committed to version control, so make sure not to have any secrets in it.
# If you are cloning this repo, create a copy of this file named `.env` and populate it with your secrets.

# The database URL is used to connect to your Supabase database.
TURSO_AUTH_TOKEN="some-auth-token"
# The database URL is used to connect to your Supabase database.
TURSO_DATABASE_URL="https://your-database-url.turso.io"


# You can generate the secret via 'openssl rand -base64 32' on Unix
# @see https://www.better-auth.com/docs/installation
AUTH_SECRET='supersecret'

# Pre-configured Discord OAuth provider, works out-of-the-box
# @see https://www.better-auth.com/docs/authentication/discord
AUTH_DISCORD_ID=''
AUTH_DISCORD_SECRET=''
```

# App Architecture

## Database

This project uses [Drizzle ORM](https://drizzle.org/) to interact with the database.

### Tables

See all tables @ `packages/db/src/schema.ts`

> Note: we use `teams` as `upss` to avoid duplication as both serve the same purpose
