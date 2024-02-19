# Next JS Installation

npx create-next-app@latest

# Prisma Installation

1. Install dependencies:

   - npm install ts-node --save-dev
   - npm install prisma --save-dev
   - npx prisma init --datasource-provider sqlite

2. Then model data in `schema.prisma`

3. Then create `seed.ts` file and insert code below:

```
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

4. Then create command in `package.json`:

```
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
```

5. Then use commands:

- npx prisma db push
- npx prisma db seed
