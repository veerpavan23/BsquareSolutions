import React from 'react';
import { auth } from '@/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If not authenticated, the children (e.g. login form) are rendered directly
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 antialiased">
      <AdminSidebar session={session} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Header */}
        <header className="h-16 border-b border-slate-900 bg-slate-950/40 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
          <div className="text-xs text-slate-500 font-semibold tracking-widest uppercase">
            BSquare Solutions Administration
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] bg-slate-900 border border-slate-800 text-indigo-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-mono">
              {(session.user as any).role}
            </span>
            <div className="text-sm font-medium text-slate-300">
              {session.user?.name}
            </div>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 overflow-auto p-8 bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}
