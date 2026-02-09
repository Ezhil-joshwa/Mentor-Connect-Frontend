
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

export const SidebarContent = ({ role }: SidebarProps) => {
  const location = useLocation();

  const links = role === 'admin' ? adminLinks : role === 'mentor' ? mentorLinks : studentLinks;

  return (
    <div className="flex flex-col h-full w-full">
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = location.pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 glass-sidebar-item text-white/80 hover:text-white',
                isActive && 'active text-white bg-white/10'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-white/90">Need help?</p>
          <p className="text-xs text-white/50 mt-1">Contact support for assistance</p>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ role }: SidebarProps) => {
  return (
    <aside className="w-64 h-full hidden md:flex flex-col border-r border-white/10">
      <SidebarContent role={role} />
    </aside>
  );
};

export default Sidebar;
