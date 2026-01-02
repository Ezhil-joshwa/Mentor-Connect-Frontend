import { Announcement } from '@/data/mockData';
import { Megaphone, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const priorityStyles = {
  high: {
    bg: 'bg-destructive/5 border-destructive/20',
    icon: 'text-destructive',
    badge: 'bg-destructive/10 text-destructive',
  },
  medium: {
    bg: 'bg-warning/5 border-warning/20',
    icon: 'text-warning',
    badge: 'bg-warning/10 text-warning',
  },
  low: {
    bg: 'bg-info/5 border-info/20',
    icon: 'text-info',
    badge: 'bg-info/10 text-info',
  },
};

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  const styles = priorityStyles[announcement.priority];
  
  return (
    <div className={cn('card-elevated p-5 border-l-4', styles.bg)}>
      <div className="flex items-start gap-4">
        <div className={cn('p-2 rounded-lg', styles.icon)}>
          {announcement.priority === 'high' ? (
            <AlertCircle className="h-5 w-5" />
          ) : announcement.priority === 'medium' ? (
            <Megaphone className="h-5 w-5" />
          ) : (
            <Info className="h-5 w-5" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-foreground">{announcement.title}</h4>
            <span className={cn('badge-status capitalize', styles.badge)}>
              {announcement.priority}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span>By {announcement.author}</span>
            <span>•</span>
            <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
