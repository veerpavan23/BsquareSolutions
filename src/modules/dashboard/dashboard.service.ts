import { dashboardRepository } from './dashboard.repository';

export class DashboardService {
  async getDashboardData(actorUser: any) {
    const permissions = (actorUser.permissions || []) as string[];
    if (!permissions.includes('activity.view')) {
      throw new Error('Access denied: insufficient permissions to view dashboard details.');
    }
    return await dashboardRepository.getMetrics();
  }
}
export const dashboardService = new DashboardService();
