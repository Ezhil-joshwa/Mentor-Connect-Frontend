import DashboardLayout from '@/components/layout/DashboardLayout';
import AnnouncementCard from '@/components/dashboard/AnnouncementCard';
import { announcements, currentMentor } from '@/data/mockData';

const MentorAnnouncements = () => {
  const mentorAnnouncements = announcements.filter(a => a.targetRoles.includes('mentor'));

  return (
    <DashboardLayout role="mentor" userName={currentMentor.name}>
      <div className="page-header">
        <h1 className="page-title">Announcements</h1>
        <p className="page-subtitle">Stay updated with program news and updates</p>
      </div>

      <div className="space-y-4">
        {mentorAnnouncements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default MentorAnnouncements;
