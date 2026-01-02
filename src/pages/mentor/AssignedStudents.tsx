import DashboardLayout from '@/components/layout/DashboardLayout';
import { students, currentMentor } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, BarChart3, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const AssignedStudents = () => {
  const assignedStudents = students.filter(s => s.mentorId === currentMentor.id);

  return (
    <DashboardLayout role="mentor" userName={currentMentor.name}>
      <div className="page-header">
        <h1 className="page-title">Assigned Students</h1>
        <p className="page-subtitle">View and manage your mentees</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {assignedStudents.map((student) => (
          <div key={student.id} className="card-elevated p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground">{student.name}</h3>
                <p className="text-muted-foreground">{student.department}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {student.email}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{student.performance}%</p>
                <p className="text-sm text-muted-foreground">Performance</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{student.attendance}%</p>
                <p className="text-sm text-muted-foreground">Attendance</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Link to="/mentor/chat" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Message
                </Button>
              </Link>
              <Link to="/mentor/performance" className="flex-1">
                <Button className="btn-primary w-full gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Update
                </Button>
              </Link>
            </div>
          </div>
        ))}

        {assignedStudents.length === 0 && (
          <div className="md:col-span-2 card-elevated p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Students Assigned</h3>
            <p className="text-muted-foreground">
              You don't have any students assigned yet. Contact the administrator for assignments.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AssignedStudents;
