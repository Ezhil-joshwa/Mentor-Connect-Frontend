import DashboardLayout from '@/components/layout/DashboardLayout';
import MeetingCard from '@/components/dashboard/MeetingCard';
import { meetings, currentStudent } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from 'lucide-react';

const StudentMeetings = () => {
  const studentMeetings = meetings.filter(m => m.participants.includes(currentStudent.id));
  const upcomingMeetings = studentMeetings.filter(m => m.status === 'upcoming');
  const completedMeetings = studentMeetings.filter(m => m.status === 'completed');

  return (
    <DashboardLayout role="student" userName={currentStudent.name}>
      <div className="page-header">
        <h1 className="page-title">Meetings</h1>
        <p className="page-subtitle">View your scheduled meetings with your mentor</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingMeetings.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedMeetings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingMeetings.length > 0 ? (
            upcomingMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))
          ) : (
            <div className="card-elevated p-12 text-center">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Upcoming Meetings</h3>
              <p className="text-muted-foreground">
                You don't have any meetings scheduled. Your mentor will schedule sessions soon.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedMeetings.length > 0 ? (
            completedMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))
          ) : (
            <div className="card-elevated p-12 text-center">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Completed Meetings</h3>
              <p className="text-muted-foreground">
                Your meeting history will appear here after sessions are completed.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default StudentMeetings;
