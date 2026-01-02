import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import AnnouncementCard from '@/components/dashboard/AnnouncementCard';
import MeetingCard from '@/components/dashboard/MeetingCard';
import { Users, GraduationCap, Calendar, Link2, TrendingUp, Clock } from 'lucide-react';
import { adminStats, announcements, meetings } from '@/data/mockData';

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin" userName="Admin User">
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Overview of the mentorship program</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={adminStats.totalStudents}
          subtitle="Enrolled in program"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          variant="info"
        />
        <StatCard
          title="Total Mentors"
          value={adminStats.totalMentors}
          subtitle="Active mentors"
          icon={GraduationCap}
          trend={{ value: 8, isPositive: true }}
          variant="primary"
        />
        <StatCard
          title="Active Connections"
          value={adminStats.activeConnections}
          subtitle="Mentor-student pairs"
          icon={Link2}
          variant="success"
        />
        <StatCard
          title="Total Meetings"
          value={adminStats.totalMeetings}
          subtitle="Scheduled this month"
          icon={Calendar}
          variant="warning"
        />
        <StatCard
          title="Completed Sessions"
          value={adminStats.completedMeetings}
          subtitle="This month"
          icon={TrendingUp}
          variant="success"
        />
        <StatCard
          title="Upcoming Meetings"
          value={adminStats.upcomingMeetings}
          subtitle="Next 7 days"
          icon={Clock}
          variant="info"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Announcements */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Announcements</h2>
          <div className="space-y-4">
            {announcements.slice(0, 3).map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Meetings</h2>
          <div className="space-y-4">
            {meetings.filter(m => m.status === 'upcoming').slice(0, 3).map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
