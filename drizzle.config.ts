import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./utils/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:o8LUqJP1cbvr@ep-quiet-salad-a130bxac.ap-southeast-1.aws.neon.tech/Interview_mock?sslmode=require',
  },
  verbose: true,
  strict: true,
})