import { Meeting } from '@/data/mockData';
import { Calendar, Clock, Video, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MeetingCardProps {
  meeting: Meeting;
}

const statusStyles = {
  upcoming: 'badge-info',
  completed: 'badge-success',
  cancelled: 'bg-muted text-muted-foreground',
};

const MeetingCard = ({ meeting }: MeetingCardProps) => {
  return (
    <div className="card-elevated p-5 hover:shadow-card-hover transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-foreground">{meeting.title}</h4>
            <span className={cn('badge-status capitalize', statusStyles[meeting.status])}>
              {meeting.status}
            </span>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(meeting.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{meeting.time}</span>
            </div>
            <div className="flex items-center gap-2">
              {meeting.mode === 'online' ? (
                <>
                  <Video className="h-4 w-4" />
                  <span>Online Meeting</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4" />
                  <span>{meeting.location}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {meeting.status === 'upcoming' && meeting.mode === 'online' && meeting.link && (
          <Button size="sm" className="btn-primary gap-2">
            <ExternalLink className="h-4 w-4" />
            Join
          </Button>
        )}
      </div>
    </div>
  );
};

export default MeetingCard;
