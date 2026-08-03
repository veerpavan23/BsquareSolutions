import { auth } from '@/auth';
import { AuthorizationError, AuthenticationError } from '@/lib/errors/errors';

export async function checkPermission(permissionCode: string): Promise<boolean> {
  const session = await auth();
  if (!session?.user) {
    return false;
  }
  const permissions = (session.user as any).permissions as string[];
  return permissions.includes(permissionCode);
}

export async function requirePermission(permissionCode: string): Promise<any> {
  const session = await auth();
  if (!session?.user) {
    throw new AuthenticationError();
  }
  const permissions = (session.user as any).permissions as string[];
  if (!permissions.includes(permissionCode)) {
    throw new AuthorizationError(`Missing required permission: ${permissionCode}`);
  }
  return session.user;
}
