import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import AnnouncementCard from '@/components/dashboard/AnnouncementCard';
import MeetingCard from '@/components/dashboard/MeetingCard';
import { Users, GraduationCap, Calendar, Link2, TrendingUp, Clock } from 'lucide-react';
import { announcements, meetings } from '@/data/mockData';
import api from '@/lib/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalMentors: 0,
    activeConnections: 0,
    totalMeetings: 0,
    completedMeetings: 0,
    upcomingMeetings: 0,
  });
  const [userName, setUserName] = useState('Admin User');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedName = localStorage.getItem('userName');
        if (storedName) setUserName(storedName);

        const response = await api.get('/dashboard/stats');
        const data = response.data;

        // Map API response to UI state
        // API returns: { total_users, active_mentors, total_students, system_health }
        setStats({
          totalStudents: data.total_students || 0,
          totalMentors: data.active_mentors || 0,
          activeConnections: 0, // Not yet in API
          totalMeetings: 0, // Not yet in API
          completedMeetings: 0, // Not yet in API
          upcomingMeetings: 0, // Not yet in API
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout role="admin" userName={userName}>
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Overview of the mentorship program</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          subtitle="Enrolled in program"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          variant="info"
        />
        <StatCard
          title="Total Mentors"
          value={stats.totalMentors}
          subtitle="Active mentors"
          icon={GraduationCap}
          trend={{ value: 8, isPositive: true }}
          variant="primary"
        />
        <StatCard
          title="Active Connections"
          value={stats.activeConnections}
          subtitle="Mentor-student pairs"
          icon={Link2}
          variant="success"
        />
        <StatCard
          title="Total Meetings"
          value={stats.totalMeetings}
          subtitle="Scheduled this month"
          icon={Calendar}
          variant="warning"
        />
        <StatCard
          title="Completed Sessions"
          value={stats.completedMeetings}
          subtitle="This month"
          icon={TrendingUp}
          variant="success"
        />
        <StatCard
          title="Upcoming Meetings"
          value={stats.upcomingMeetings}
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
