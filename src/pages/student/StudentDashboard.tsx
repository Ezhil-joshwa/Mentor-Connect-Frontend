import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import AnnouncementCard from '@/components/dashboard/AnnouncementCard';
import MeetingCard from '@/components/dashboard/MeetingCard';
import { Calendar } from 'lucide-react';
import { announcements, meetings, currentMentorForStudent } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    attendanceRate: 0,
    performanceScore: 85,
    upcomingMeetings: 0,
    completedSessions: 0,
  });
  const [userName, setUserName] = useState('Student');
  const studentMeetings = meetings;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedName = localStorage.getItem('userName');
        if (storedName) setUserName(storedName);

        const response = await api.get('/dashboard/stats');
        const data = response.data;

        setStats({
          attendanceRate: parseInt(data.attendance) || 95,
          performanceScore: 88,
          upcomingMeetings: data.assignments_due || 0,
          completedSessions: 12,
        });
      } catch (error) {
        console.error('Error fetching student stats:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout role="student" userName={userName}>
      <div className="page-header">
        <h1 className="page-title">Welcome back, {userName.split(' ')[0]}!</h1>
        <p className="page-subtitle">Here's an overview of your mentorship journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          iconUrl="/placeholder.png"
          variant="success"
        />
        <StatCard
          title="Performance Score"
          value={`${stats.performanceScore}%`}
          iconUrl="/placeholder.png"
          variant="primary"
        />
        <StatCard
          title="Upcoming Meetings"
          value={stats.upcomingMeetings}
          iconUrl="/placeholder.png"
          variant="warning"
        />
        <StatCard
          title="Completed Sessions"
          value={stats.completedSessions}
          iconUrl="/placeholder.png"
          variant="info"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mentor Card */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Mentor</h2>
          <div className="card-elevated p-6">
            <div className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {currentMentorForStudent.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg text-foreground">{currentMentorForStudent.name}</h3>
              <p className="text-muted-foreground">{currentMentorForStudent.department}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {currentMentorForStudent.expertise.map((skill) => (
                  <span key={skill} className="badge-status badge-info">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <Link to="/student/mentor" className="flex-1">
                  <Button variant="outline" className="w-full">View Profile</Button>
                </Link>
                <Link to="/student/chat" className="flex-1">
                  <Button className="btn-primary w-full">Message</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Meetings</h2>
          <div className="space-y-4">
            {studentMeetings.filter(m => m.status === 'upcoming').slice(0, 2).map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
            {studentMeetings.filter(m => m.status === 'upcoming').length === 0 && (
              <div className="card-elevated p-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No upcoming meetings scheduled</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Latest Announcements</h2>
        <div className="space-y-4">
          {announcements.filter(a => a.targetRoles.includes('student')).slice(0, 2).map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
