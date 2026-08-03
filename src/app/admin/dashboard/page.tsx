import React from 'react';
import { auth } from '@/auth';
import { requirePermission } from '@/modules/auth/permissions';
import { dashboardService } from '@/modules/dashboard/dashboard.service';
import {
  BookOpen,
  Calendar,
  Users,
  Activity,
  PlusCircle,
  FolderPlus,
  Eye,
  Lock,
} from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  // 1. Authenticate & authorize
  const user = await requirePermission('activity.view');

  // 2. Fetch verified metrics from DashboardService
  const data = await dashboardService.getDashboardData(user);

  return (
    <div className="space-y-8 max-w-7xl mx-auto selection:bg-indigo-500 selection:text-white">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Welcome back, {user.name}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Here is an operational overview of the BSquare Training Management System.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Courses Card */}
        <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Total Courses
            </div>
            <div className="text-3xl font-bold text-white mt-1">
              {data.courses.total}
            </div>
            <div className="text-xs text-indigo-400 mt-1">
              {data.courses.published} Published &bull; {data.courses.draft} Drafts
            </div>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        {/* Batches Card */}
        <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Total Batches
            </div>
            <div className="text-3xl font-bold text-white mt-1">
              {data.batches.total}
            </div>
            <div className="text-xs text-emerald-400 mt-1">
              {data.batches.active} Active &bull; {data.batches.planned} Planned
            </div>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        {/* Trainers Card */}
        <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Active Trainers
            </div>
            <div className="text-3xl font-bold text-white mt-1">
              {data.trainers.active}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Staff qualified & scheduled
            </div>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Activity Logs Card */}
        <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              System Health
            </div>
            <div className="text-lg font-bold text-emerald-400 mt-1.5 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              ONLINE
            </div>
            <div className="text-xs text-slate-500 mt-1">
              All services operational
            </div>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
            <Activity className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Board Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Recent Audit Logs & Deferred Alerts */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Audits Table */}
          <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Recent Portal Activity Logs
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 font-medium">
                    <th className="py-2 pb-3">User</th>
                    <th className="py-2 pb-3">Action</th>
                    <th className="py-2 pb-3">Module</th>
                    <th className="py-2 pb-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentLogs.map((log) => (
                    <tr key={log.id} className="border-b border-slate-900/40 text-slate-300">
                      <td className="py-3 font-medium text-xs font-mono">{log.actorEmail}</td>
                      <td className="py-3">
                        <span className="text-indigo-400 font-mono text-xs">{log.action}</span>
                      </td>
                      <td className="py-3 capitalize">{log.module}</td>
                      <td className="py-3 text-xs text-slate-500">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {data.recentLogs.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-500">
                        No recent activity logs recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Future Capabilities Information */}
          <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Deferred Integrations & Modules
              </h2>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              The following business parameters are stubbed in the schema database and will be operational in a future phase:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-950/40 border border-slate-900/60 rounded-lg">
                <div className="text-xs text-slate-500 font-semibold">Leads & Enquiries</div>
                <div className="text-[10px] text-amber-500/70 font-semibold mt-1">Available in a future phase</div>
              </div>
              <div className="p-3 bg-slate-950/40 border border-slate-900/60 rounded-lg">
                <div className="text-xs text-slate-500 font-semibold">Razorpay Payments</div>
                <div className="text-[10px] text-amber-500/70 font-semibold mt-1">Available in a future phase</div>
              </div>
              <div className="p-3 bg-slate-950/40 border border-slate-900/60 rounded-lg">
                <div className="text-xs text-slate-500 font-semibold">Salesforce Sync</div>
                <div className="text-[10px] text-amber-500/70 font-semibold mt-1">Available in a future phase</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action CTA Panel */}
        <div className="space-y-6">
          <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Quick Administrative Actions
            </h2>
            <div className="space-y-3">
              <Link
                href="/admin/courses"
                className="w-full flex items-center justify-between p-3 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 rounded-lg text-indigo-400 hover:text-indigo-300 font-medium transition text-sm cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  Create Course
                </span>
                <Eye className="w-4 h-4" />
              </Link>

              <Link
                href="/admin/batches"
                className="w-full flex items-center justify-between p-3 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 rounded-lg text-emerald-400 hover:text-emerald-300 font-medium transition text-sm cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <FolderPlus className="w-4 h-4" />
                  Schedule Batch
                </span>
                <Eye className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
