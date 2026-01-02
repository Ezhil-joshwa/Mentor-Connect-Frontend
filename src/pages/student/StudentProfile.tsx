import DashboardLayout from '@/components/layout/DashboardLayout';
import { currentStudent, currentMentorForStudent } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mail, Calendar, BookOpen, User, Edit } from 'lucide-react';

const StudentProfile = () => {
  return (
    <DashboardLayout role="student" userName={currentStudent.name}>
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">View and manage your personal information</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card-elevated p-6 text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                {currentStudent.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold text-foreground">{currentStudent.name}</h2>
            <p className="text-muted-foreground">{currentStudent.department}</p>
            <span className="badge-status badge-info mt-2">Student</span>
            <Button variant="outline" className="w-full mt-6 gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="card-elevated p-6">
            <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-muted-foreground">Full Name</label>
                <p className="font-medium text-foreground mt-1">{currentStudent.name}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Email Address</label>
                <p className="font-medium text-foreground mt-1 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {currentStudent.email}
                </p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Department</label>
                <p className="font-medium text-foreground mt-1 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  {currentStudent.department}
                </p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Joined On</label>
                <p className="font-medium text-foreground mt-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {new Date(currentStudent.joinedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Academic Stats */}
          <div className="card-elevated p-6">
            <h3 className="font-semibold text-lg text-foreground mb-4">Academic Statistics</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-muted-foreground">Attendance Rate</label>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl font-bold text-foreground">{currentStudent.attendance}%</span>
                    <span className="badge-status badge-success">Good</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success rounded-full transition-all"
                      style={{ width: `${currentStudent.attendance}%` }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Performance Score</label>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl font-bold text-foreground">{currentStudent.performance}%</span>
                    <span className="badge-status badge-success">Excellent</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${currentStudent.performance}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Mentor */}
          <div className="card-elevated p-6">
            <h3 className="font-semibold text-lg text-foreground mb-4">Assigned Mentor</h3>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {currentMentorForStudent.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{currentMentorForStudent.name}</p>
                <p className="text-sm text-muted-foreground">{currentMentorForStudent.department}</p>
                <p className="text-sm text-muted-foreground">{currentMentorForStudent.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
