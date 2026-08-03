import { prisma } from '@/lib/prisma';

export class DashboardRepository {
  async getMetrics() {
    const [
      totalCourses,
      publishedCourses,
      draftCourses,
      inReviewCourses,
      archivedCourses,
      totalBatches,
      activeBatches,
      plannedBatches,
      completedBatches,
      totalTrainers,
    ] = await Promise.all([
      prisma.course.count({ where: { deletedAt: null } }),
      prisma.course.count({ where: { status: 'PUBLISHED', deletedAt: null } }),
      prisma.course.count({ where: { status: 'DRAFT', deletedAt: null } }),
      prisma.course.count({ where: { status: 'IN_REVIEW', deletedAt: null } }),
      prisma.course.count({ where: { status: 'ARCHIVED', deletedAt: null } }),
      prisma.batch.count({ where: { deletedAt: null } }),
      prisma.batch.count({ where: { status: 'IN_PROGRESS', deletedAt: null } }),
      prisma.batch.count({ where: { status: 'PLANNED', deletedAt: null } }),
      prisma.batch.count({ where: { status: 'COMPLETED', deletedAt: null } }),
      prisma.trainer.count({ where: { isActive: true, deletedAt: null } }),
    ]);

    // Query recent audit logs
    const recentAuditLogs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        action: true,
        module: true,
        createdAt: true,
        actorEmail: true,
        success: true,
      },
    });

    return {
      courses: {
        total: totalCourses,
        published: publishedCourses,
        draft: draftCourses,
        inReview: inReviewCourses,
        archived: archivedCourses,
      },
      batches: {
        total: totalBatches,
        active: activeBatches,
        planned: plannedBatches,
        completed: completedBatches,
      },
      trainers: {
        active: totalTrainers,
      },
      recentLogs: recentAuditLogs,
    };
  }
}
export const dashboardRepository = new DashboardRepository();
