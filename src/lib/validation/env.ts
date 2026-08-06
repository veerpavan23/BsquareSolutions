import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DIRECT_URL: z.string().url('DIRECT_URL must be a valid URL').optional(),
  AUTH_SECRET: z.string().min(12, 'AUTH_SECRET must be at least 12 characters'),
  BOOTSTRAP_ADMIN_EMAIL: z.string().email('BOOTSTRAP_ADMIN_EMAIL must be a valid email'),
  BOOTSTRAP_ADMIN_PASSWORD: z.string().min(8, 'BOOTSTRAP_ADMIN_PASSWORD must be at least 8 characters'),
  BOOTSTRAP_ADMIN_NAME: z.string().min(2, 'BOOTSTRAP_ADMIN_NAME must have at least 2 characters'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

// For Next.js Server Side environments, parse process.env
const parseEnv = () => {
  const result = envSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    BOOTSTRAP_ADMIN_EMAIL: process.env.BOOTSTRAP_ADMIN_EMAIL,
    BOOTSTRAP_ADMIN_PASSWORD: process.env.BOOTSTRAP_ADMIN_PASSWORD,
    BOOTSTRAP_ADMIN_NAME: process.env.BOOTSTRAP_ADMIN_NAME,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!result.success) {
    const errorDetails = JSON.stringify(result.error.format(), null, 2);
    console.error('❌ Environment configuration validation failed:\n', errorDetails);
    
    // Bypass validation during build if missing (common in CI/CD like Vercel before env vars are added)
    if (process.env.npm_lifecycle_event === 'build' || process.env.SKIP_ENV_VALIDATION === '1' || process.env.SKIP_ENV_VALIDATION === 'true' || !process.env.DATABASE_URL) {
      console.warn('⚠️ Bypassing environment validation and providing dummy values for build phase.');
      return {
        DATABASE_URL: process.env.DATABASE_URL || 'postgres://dummy:dummy@dummy:5432/dummy',
        DIRECT_URL: process.env.DIRECT_URL || '',
        AUTH_SECRET: process.env.AUTH_SECRET || 'dummy_auth_secret_must_be_long_enough',
        BOOTSTRAP_ADMIN_EMAIL: process.env.BOOTSTRAP_ADMIN_EMAIL || 'admin@example.com',
        BOOTSTRAP_ADMIN_PASSWORD: process.env.BOOTSTRAP_ADMIN_PASSWORD || 'password123',
        BOOTSTRAP_ADMIN_NAME: process.env.BOOTSTRAP_ADMIN_NAME || 'Admin',
        NODE_ENV: process.env.NODE_ENV || 'development',
      } as any;
    }

    throw new Error(`Critical environment setup failure: ${errorDetails}`);
  }

  return result.data;
};

export const env = parseEnv();
