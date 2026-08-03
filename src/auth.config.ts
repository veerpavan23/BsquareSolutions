import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');
      const isLoginRoute = nextUrl.pathname === '/admin/login';

      if (isAdminRoute) {
        if (isLoginRoute) {
          if (isLoggedIn) {
            return Response.redirect(new URL('/admin/dashboard', nextUrl));
          }
          return true; // Let user access login page
        }
        return isLoggedIn; // Guard all other admin routes
      }
      return true; // Allow public routes
    },
    jwt({ token, user }) {
      if (user) {
        // Add custom properties to token from authenticated user record
        token.id = user.id;
        token.role = (user as any).role;
        token.permissions = (user as any).permissions;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).permissions = token.permissions;
      }
      return session;
    },
  },
  providers: [], // Configured in src/auth.ts
};
