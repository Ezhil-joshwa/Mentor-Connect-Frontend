import { Bell, LogOut, User, Menu } from 'lucide-react';
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarContent } from './Sidebar';
import { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  userName: string;
  userRole: 'admin' | 'mentor' | 'student';
}

const Navbar = ({ userName, userRole }: NavbarProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    const handleScroll = () => {
      const currentScrollY = mainContent.scrollTop;

      // Show header if scrolling up or at top
      // Using ref allows us to access current value without re-binding listener
      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Hide only if scrolling down and not at very top
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    mainContent.addEventListener('scroll', handleScroll);
    return () => mainContent.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`h-16 flex items-center justify-between px-6 z-50 transition-transform duration-300 fixed md:relative w-full ${isVisible ? 'translate-y-0 bg-white/5 backdrop-blur-md border-b border-white/10' : '-translate-y-full'
        } md:translate-y-0`}
    >
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger + Logo on left */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={emmaLogo} alt="Mentor Connect Logo" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-semibold text-lg text-white">Mentor Connect</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-white/10 text-white hidden md:flex">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="hidden md:flex items-center gap-3 px-2 hover:bg-white/10 text-white">
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

        {/* Mobile Menu Trigger - Right Side as requested */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/10 text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r border-white/10 w-72 bg-gradient-custom">
            <SidebarContent role={userRole} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
