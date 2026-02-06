# Next.js + Postgres Starter

Starter template with Next.js App Router, TypeScript, Drizzle ORM, and PostgreSQL.

**_NOTICE_** Nanofleets & NOA are pre-release and not for production use.

## Quick Start

**Prerequisites:**
- A Nanofleets cluster and CLI configured - get your free cluster at https://nanofleets.com
- Docker (used to build and push images. Your docker hub will be used for this starter)

**Deploying for the first time:**

1. (Optional) Open the NOA console to monitor your cluster:
   ```sh
   noa console open
   ```
2. Copy `.env.example` to `.env` and set:
    - `DOCKER_USERNAME` to your Docker Hub username
    - `NAME` (optional) to your app name
3. Copy .env.example.local to .env.local
   ```shell
    cp .env.example.local .env.local
    ```
4. Add `postgres` to your NOA cluster (one time only):
   ```shell
   noa deploy postgres:16 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -e POSTGRES_DB=starter --memory-limit 75M
   ```
   Port forward postgres to your local machine:
   ```bash
   noa forward postgres
   ```
   Push the db schema with:
   ```bash
   npm run db:push
   ```
5. Build & push the Next.js app image to Docker Hub:
    ```bash
    docker login
    npm run docker:build
    npm run docker:push
    ```
6. Create the app in the cluster (one time only):
    ```shell
    npm run noa:deploy
    ```
    Click on **Public URL** in the output to see your app running!


## Deploying Updates

```shell
npm run docker:build
npm run docker:push
npm run noa:restart
```

All in one:
```shell
npm run docker:build && npm run docker:push && npm run noa:restart
```

_NOTE_: The restart command doesn't wait (yet) for the app to be running like `noa deploy` does. You can always monitor the logs with `noa logs -f -l app=nextjs-starter` (if you used a different NAME in .env, change the label selector accordingly).

## Local Development

1. NPM install
    ```shell
    npm install
    ```
2. Start Postgres and Next.js
    ```shell
    docker compose up -d
    ```
5. Push the db schema:
   ```bash
   npm run db:push
   ```
6. (Optional) Seed the status table:
   ```bash
   docker-compose exec postgres psql -U postgres -d starter -c "INSERT INTO status (message) VALUES ('System operational');"
   ```

Next.js should now be running at [http://localhost:3000](http://localhost:3000)

## Deploy Changes

```bash
npm run docker:build
npm run docker:push
npm run noa:deploy
```

## Database Commands

- `npm run db:generate` - Generate migrations from schema changes
- `npm run db:push` - Push schema directly to database (dev)
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Drizzle Studio
