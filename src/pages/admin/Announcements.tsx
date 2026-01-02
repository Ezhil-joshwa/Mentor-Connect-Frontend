import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AnnouncementCard from '@/components/dashboard/AnnouncementCard';
import { announcements } from '@/data/mockData';
import { Plus, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const Announcements = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  const handlePost = () => {
    toast({
      title: 'Announcement Posted',
      description: 'Your announcement has been published successfully.',
    });
    setIsAddModalOpen(false);
  };

  return (
    <DashboardLayout role="admin" userName="Admin User">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Announcements</h1>
          <p className="page-subtitle">Post and manage announcements for users</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary gap-2">
              <Plus className="h-4 w-4" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" />
                Create Announcement
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <input type="text" className="input-field" placeholder="Announcement title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Content</label>
                <textarea
                  className="input-field min-h-[120px] resize-none"
                  placeholder="Write your announcement..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
                  <select className="input-field">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Target Audience</label>
                  <select className="input-field">
                    <option value="all">Everyone</option>
                    <option value="mentors">Mentors Only</option>
                    <option value="students">Students Only</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="btn-primary" onClick={handlePost}>
                  Post Announcement
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Announcements;
