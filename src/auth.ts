import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // 1. Validate inputs
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        // 2. Query admin user with role and permission mappings
        const user = await prisma.adminUser.findUnique({
          where: { email },
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        });

        if (!user || user.status !== 'ACTIVE' || user.deletedAt) {
          return null;
        }

        // 3. Verify bcrypt hash
        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordCorrect) {
          // Increment failed login count
          await prisma.adminUser.update({
            where: { id: user.id },
            data: { failedLoginCount: { increment: 1 } },
          });
          return null;
        }

        // Reset failed login count and update lastLogin details
        await prisma.adminUser.update({
          where: { id: user.id },
          data: {
            failedLoginCount: 0,
            lastLoginAt: new Date(),
          },
        });

        // Compile permission codes for session authorization checks
        const permissions = user.role.permissions.map((rp) => rp.permission.code);

        return {
          id: user.id,
          name: user.fullName,
          email: user.email,
          role: user.role.name,
          permissions,
        } as any;
      },
    }),
  ],
});
