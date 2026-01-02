import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MeetingCard from '@/components/dashboard/MeetingCard';
import { meetings, currentMentor, students } from '@/data/mockData';
import { Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MentorMeetings = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  const mentorMeetings = meetings.filter(m => m.participants.includes(currentMentor.id));
  const assignedStudents = students.filter(s => s.mentorId === currentMentor.id);
  const upcomingMeetings = mentorMeetings.filter(m => m.status === 'upcoming');
  const completedMeetings = mentorMeetings.filter(m => m.status === 'completed');

  const handleSchedule = () => {
    toast({
      title: 'Meeting Scheduled',
      description: 'The meeting has been scheduled successfully.',
    });
    setIsAddModalOpen(false);
  };

  return (
    <DashboardLayout role="mentor" userName={currentMentor.name}>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Schedule Meetings</h1>
          <p className="page-subtitle">Manage and schedule meetings with your students</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary gap-2">
              <Plus className="h-4 w-4" />
              Schedule Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Schedule New Meeting
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Meeting Title</label>
                <input type="text" className="input-field" placeholder="e.g., Weekly Check-in" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Select Student(s)</label>
                <select className="input-field">
                  <option value="">Choose students...</option>
                  {assignedStudents.map((student) => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                  <input type="date" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Time</label>
                  <input type="time" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mode</label>
                <select className="input-field">
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Meeting Link / Location</label>
                <input type="text" className="input-field" placeholder="https://meet.google.com/..." />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="btn-primary" onClick={handleSchedule}>
                  Schedule Meeting
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
              <p className="text-muted-foreground mb-4">
                Schedule a meeting with your students to get started.
              </p>
              <Button className="btn-primary gap-2" onClick={() => setIsAddModalOpen(true)}>
                <Plus className="h-4 w-4" />
                Schedule Meeting
              </Button>
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
                Your completed meetings will appear here.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default MentorMeetings;
