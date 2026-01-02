import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import AnnouncementCard from '@/components/dashboard/AnnouncementCard';
import MeetingCard from '@/components/dashboard/MeetingCard';
import { Users, Calendar, TrendingUp, CheckCircle } from 'lucide-react';
import { mentorStats, announcements, meetings, currentMentor, students } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MentorDashboard = () => {
  const assignedStudents = students.filter(s => s.mentorId === currentMentor.id);
  const mentorMeetings = meetings.filter(m => m.participants.includes(currentMentor.id));

  return (
    <DashboardLayout role="mentor" userName={currentMentor.name}>
      <div className="page-header">
        <h1 className="page-title">Welcome back, {currentMentor.name.split(' ')[0]}!</h1>
        <p className="page-subtitle">Here's an overview of your mentorship activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Assigned Students"
          value={mentorStats.assignedStudents}
          icon={Users}
          variant="primary"
        />
        <StatCard
          title="Upcoming Meetings"
          value={mentorStats.upcomingMeetings}
          icon={Calendar}
          variant="warning"
        />
        <StatCard
          title="Completed Sessions"
          value={mentorStats.completedSessions}
          icon={CheckCircle}
          variant="success"
        />
        <StatCard
          title="Avg. Student Performance"
          value={`${mentorStats.averageStudentPerformance}%`}
          icon={TrendingUp}
          variant="info"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Assigned Students */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Your Students</h2>
            <Link to="/mentor/students">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {assignedStudents.map((student) => (
              <div key={student.id} className="card-elevated p-4 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.department}</p>
                </div>
                <span className={`badge-status ${student.performance >= 80 ? 'badge-success' : 'badge-warning'}`}>
                  {student.performance}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Meetings</h2>
            <Link to="/mentor/meetings">
              <Button variant="ghost" size="sm">Manage</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {mentorMeetings.filter(m => m.status === 'upcoming').slice(0, 3).map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
            {mentorMeetings.filter(m => m.status === 'upcoming').length === 0 && (
              <div className="card-elevated p-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No upcoming meetings</p>
                <Link to="/mentor/meetings">
                  <Button className="btn-primary mt-4">Schedule Meeting</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Latest Announcements</h2>
        <div className="space-y-4">
          {announcements.filter(a => a.targetRoles.includes('mentor')).slice(0, 2).map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorDashboard;
