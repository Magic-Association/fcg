# Frieren Card Game

## Setup

### Game Client

1. Download Godot Engine **4.5.1** from [their website](https://godotengine.org/download/archive/4.5.1-stable/)
2. Launch Godot, on the project menu, select "Import"
3. Select the path at `fcg/apps/client`

Export game files with `pnpm run export:game` in order to test your changes on the website.

In order for this script to work, you must have the export templates for HTML5 installed.

In Godot, click "Editor" then "Manage Export Templates".

### Node.js apps

Follow for Game Server, Bot & Website

1. Download Node.js from the [Nodejs.org](https://nodejs.org/en/download) website
2. Install dependencies for all apps with `pnpm install` at the root of the project
3. Create a `.env` file with `cp .env.template .env`

### Game Server

1. Start the game server with `pnpm run dev:server`

### Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications), then navigate to "Bot", generate and copy the bot token
2. Include `BOT_TOKEN` and`CLIENT_ID` values in your `.env` file
3. Start the bot with `pnpm run dev:bot`

### Website

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications), then navigate to "OAuth2" and generate the client secret
2. Include `CLIENT_SECRET` and `CLIENT_ID` values in your `.env` file
3. Add `http://localhost:3000/api/auth/callback/discord` as a redirect URI
4. To test with database, see the below section

### Database
1. Download Docker Desktop (or Docker) from [their website](https://docs.docker.com/get-started/get-docker/)
2. Start the database container with `docker-compose up`, add the `--build` flag to build to container
3. Apply any database migrations with `pnpm run migrate:db`

If you make any changes to the database schema, generate a new migration with `pnpm run generate:db`
