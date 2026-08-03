'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin/dashboard',
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Invalid email or password.' };
    }
    // NextAuth redirect throws a redirection exception, we must rethrow it so Next.js performs the redirect!
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: '/admin/login' });
}
