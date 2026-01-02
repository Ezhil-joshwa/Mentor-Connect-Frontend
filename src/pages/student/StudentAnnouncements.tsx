import DashboardLayout from '@/components/layout/DashboardLayout';
import AnnouncementCard from '@/components/dashboard/AnnouncementCard';
import { announcements, currentStudent } from '@/data/mockData';

const StudentAnnouncements = () => {
  const studentAnnouncements = announcements.filter(a => a.targetRoles.includes('student'));

  return (
    <DashboardLayout role="student" userName={currentStudent.name}>
      <div className="page-header">
        <h1 className="page-title">Announcements</h1>
        <p className="page-subtitle">Stay updated with the latest news and information</p>
      </div>

      <div className="space-y-4">
        {studentAnnouncements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default StudentAnnouncements;
