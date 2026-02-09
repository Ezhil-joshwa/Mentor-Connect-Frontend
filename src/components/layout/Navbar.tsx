import { Bell, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import emmaLogo from '@/assets/emma.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface NavbarProps {
  userName: string;
  userRole: 'admin' | 'mentor' | 'student';
}

const Navbar = ({ userName, userRole }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-orange-500/20 text-orange-200';
      case 'mentor': return 'bg-blue-500/20 text-blue-200';
      case 'student': return 'bg-green-500/20 text-green-200';
      default: return 'bg-white/10 text-white/70';
    }
  };

  return (
    <header className="h-16 bg-transparent flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={emmaLogo} alt="Mentor Connect Logo" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-semibold text-lg text-white">Mentor Connect</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-white/10 text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-white/10 text-white">
              <Avatar className="h-8 w-8 border-2 border-white/20">
                <AvatarFallback className="bg-purple-500 text-white text-sm">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">{userName}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getRoleBadgeColor(userRole)}`}>
                  {userRole}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover border border-border">
            <DropdownMenuItem className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-destructive">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
