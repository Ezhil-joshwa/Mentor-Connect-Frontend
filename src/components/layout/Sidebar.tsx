import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  MessageSquare,
  Calendar,
  BarChart3,
  Megaphone,
  UserPlus,
  FileText,
  User,
} from 'lucide-react';

interface SidebarProps {
  role: 'admin' | 'mentor' | 'student';
}

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/students', label: 'Manage Students', icon: Users },
  { href: '/admin/mentors', label: 'Manage Mentors', icon: GraduationCap },
  { href: '/admin/assign', label: 'Assign Mentor', icon: UserPlus },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/reports', label: 'Reports', icon: FileText },
];

const studentLinks = [
  { href: '/student', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/student/profile', label: 'My Profile', icon: User },
  { href: '/student/mentor', label: 'Mentor Details', icon: GraduationCap },
  { href: '/student/chat', label: 'Chat', icon: MessageSquare },
  { href: '/student/meetings', label: 'Meetings', icon: Calendar },
  { href: '/student/performance', label: 'Performance', icon: BarChart3 },
  { href: '/student/announcements', label: 'Announcements', icon: Megaphone },
];

const mentorLinks = [
  { href: '/mentor', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/mentor/students', label: 'Assigned Students', icon: Users },
  { href: '/mentor/chat', label: 'Chat', icon: MessageSquare },
  { href: '/mentor/meetings', label: 'Schedule Meetings', icon: Calendar },
  { href: '/mentor/performance', label: 'Update Performance', icon: BarChart3 },
  { href: '/mentor/announcements', label: 'Announcements', icon: Megaphone },
];

const Sidebar = ({ role }: SidebarProps) => {
  const location = useLocation();
  
  const links = role === 'admin' ? adminLinks : role === 'mentor' ? mentorLinks : studentLinks;

  return (
    <aside className="w-64 bg-sidebar min-h-[calc(100vh-4rem)] flex flex-col">
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = location.pathname === link.href;
          const Icon = link.icon;
          
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'sidebar-link',
                isActive && 'active'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-lg p-4">
          <p className="text-sm text-sidebar-foreground/70">Need help?</p>
          <p className="text-xs text-sidebar-muted mt-1">Contact support for assistance</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
