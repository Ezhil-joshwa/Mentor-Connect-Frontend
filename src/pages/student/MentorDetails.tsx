import DashboardLayout from '@/components/layout/DashboardLayout';
import { currentStudent, currentMentorForStudent, meetings } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import MeetingCard from '@/components/dashboard/MeetingCard';
import { Mail, Users, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const MentorDetails = () => {
  const mentorMeetings = meetings.filter(m => m.participants.includes(currentStudent.id));

  return (
    <DashboardLayout role="student" userName={currentStudent.name}>
      <div className="page-header">
        <h1 className="page-title">Mentor Details</h1>
        <p className="page-subtitle">Learn more about your assigned mentor</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mentor Profile */}
        <div className="lg:col-span-1">
          <div className="card-elevated p-6">
            <div className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                  {currentMentorForStudent.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-foreground">{currentMentorForStudent.name}</h2>
              <p className="text-muted-foreground">{currentMentorForStudent.department}</p>
              <span className="badge-status badge-info mt-2">Mentor</span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5" />
                <span className="text-sm">{currentMentorForStudent.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span className="text-sm">{currentMentorForStudent.studentsCount} students mentored</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">
                  Joined {new Date(currentMentorForStudent.joinedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Link to="/student/chat">
              <Button className="btn-primary w-full mt-6 gap-2">
                <MessageSquare className="h-4 w-4" />
                Start Conversation
              </Button>
            </Link>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Expertise */}
          <div className="card-elevated p-6">
            <h3 className="font-semibold text-lg text-foreground mb-4">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {currentMentorForStudent.expertise.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="card-elevated p-6">
            <h3 className="font-semibold text-lg text-foreground mb-4">About</h3>
            <p className="text-muted-foreground leading-relaxed">
              {currentMentorForStudent.name} is an experienced mentor in the {currentMentorForStudent.department} department 
              with expertise in {currentMentorForStudent.expertise.join(', ')}. They have been part of the mentorship program 
              since {new Date(currentMentorForStudent.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} 
              and have successfully guided {currentMentorForStudent.studentsCount} students in their academic journey.
            </p>
          </div>

          {/* Meeting History */}
          <div className="card-elevated p-6">
            <h3 className="font-semibold text-lg text-foreground mb-4">Meeting History</h3>
            {mentorMeetings.length > 0 ? (
              <div className="space-y-4">
                {mentorMeetings.slice(0, 3).map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No meetings scheduled yet</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorDetails;
