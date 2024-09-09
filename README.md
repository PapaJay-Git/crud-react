### CRUD BOOK NEXTJS POSTGRESQL

## Getting Started

1. install the dependencies:

```bash

npm install

```

2. copy .env.example as .env and configure your postgresql DATABASE_URL

```bash
# in windows
copy .env.example .env

```

3. Migrate Prisma on your database


```bash
npx prisma migrate dev

```

4. Run your development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

