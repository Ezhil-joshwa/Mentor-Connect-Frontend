import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'admin' | 'mentor' | 'student';
  userName: string;
}

const DashboardLayout = ({ children, role, userName }: DashboardLayoutProps) => {
  return (
    <div className="h-screen bg-gradient-custom flex flex-col overflow-hidden">
      <Navbar userName={userName} userRole={role} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar role={role} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
