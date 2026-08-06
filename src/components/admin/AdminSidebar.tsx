'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BSquareLogo } from '@/components/brand/BSquareLogo';
import { logoutAction } from '@/modules/auth/auth.actions';
import {
  LayoutDashboard,
  MapPin,
  BookOpen,
  Calendar,
  Users,
  Image as ImageIcon,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Shield,
} from 'lucide-react';

interface SidebarProps {
  session: any;
}

export default function AdminSidebar({ session }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, permission: 'activity.view' },
    { name: 'Branches', href: '/admin/branches', icon: MapPin, permission: 'branch.view' },
    { name: 'Classrooms', href: '/admin/classrooms', icon: LayoutGrid, permission: 'classroom.view' },
    { name: 'Verticals', href: '/admin/verticals', icon: LayoutGrid, permission: 'academy.view' },
    { name: 'Courses', href: '/admin/courses', icon: BookOpen, permission: 'course.view' },
    { name: 'Batches', href: '/admin/batches', icon: Calendar, permission: 'batch.view' },
    { name: 'Trainers', href: '/admin/trainers', icon: Users, permission: 'batch.view' },
    { name: 'Media Library', href: '/admin/media', icon: ImageIcon, permission: 'media.view' },
    { name: 'Roles & Permissions', href: '/admin/settings/roles', icon: Shield, permission: 'role.view' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, permission: 'settings.view' },
  ];

  const userPermissions = (session?.user?.permissions || []) as string[];
  const visibleItems = menuItems.filter((item) => {
    if (!item.permission) return true;
    if (item.name === 'Roles & Permissions') {
      return userPermissions.includes('role.view') || userPermissions.includes('permission.view');
    }
    return userPermissions.includes(item.permission);
  });

  return (
    <aside
      className={`border-r border-slate-900 bg-slate-950/60 backdrop-blur-xl transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-900">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="scale-75 origin-left shrink-0">
            <BSquareLogo />
          </div>
          {!collapsed && (
            <span className="text-sm font-bold text-white tracking-wider whitespace-nowrap">
              PORTAL
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 shrink-0 cursor-pointer"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Menu Items */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition group relative ${
                isActive
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/40 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
              {collapsed && (
                <div className="absolute left-14 bg-slate-900 border border-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Footer Panel */}
      <div className="p-4 border-t border-slate-900 bg-slate-950/40">
        {!collapsed && (
          <div className="mb-3 px-2">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Connected as
            </div>
            <div className="text-sm text-slate-300 font-medium truncate mt-0.5">
              {session?.user?.name || 'Administrator'}
            </div>
          </div>
        )}
        <button
          onClick={() => logoutAction()}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
