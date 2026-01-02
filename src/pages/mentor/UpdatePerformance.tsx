import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { students, currentMentor } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';

const UpdatePerformance = () => {
  const assignedStudents = students.filter(s => s.mentorId === currentMentor.id);
  const [selectedStudent, setSelectedStudent] = useState(assignedStudents[0]?.id || '');
  const [marks, setMarks] = useState('');
  const [attendance, setAttendance] = useState('');
  const [feedback, setFeedback] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Performance Updated',
      description: 'Student performance has been updated successfully.',
    });
    setMarks('');
    setAttendance('');
    setFeedback('');
  };

  const currentStudentData = students.find(s => s.id === selectedStudent);

  return (
    <DashboardLayout role="mentor" userName={currentMentor.name}>
      <div className="page-header">
        <h1 className="page-title">Update Performance</h1>
        <p className="page-subtitle">Record and update student performance metrics</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Student Selection */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-foreground mb-4">Select Student</h2>
          <div className="space-y-2">
            {assignedStudents.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student.id)}
                className={`w-full card-elevated p-4 flex items-center gap-3 text-left transition-all ${
                  selectedStudent === student.id
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'hover:bg-muted/50'
                }`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.department}</p>
                </div>
                {selectedStudent === student.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Update Form */}
        <div className="lg:col-span-2">
          {currentStudentData && (
            <>
              {/* Current Stats */}
              <div className="card-elevated p-6 mb-6">
                <h3 className="font-semibold text-foreground mb-4">Current Performance</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Current Marks</p>
                    <p className="text-2xl font-bold text-foreground">{currentStudentData.performance}%</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Current Attendance</p>
                    <p className="text-2xl font-bold text-foreground">{currentStudentData.attendance}%</p>
                  </div>
                </div>
              </div>

              {/* Update Form */}
              <div className="card-elevated p-6">
                <h3 className="font-semibold text-foreground mb-4">Update Performance</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        New Marks (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        className="input-field"
                        placeholder="Enter marks percentage"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Attendance (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={attendance}
                        onChange={(e) => setAttendance(e.target.value)}
                        className="input-field"
                        placeholder="Enter attendance percentage"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Feedback / Notes
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="input-field min-h-[120px] resize-none"
                      placeholder="Add feedback or notes about the student's progress..."
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="btn-primary gap-2">
                      <Check className="h-4 w-4" />
                      Update Performance
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UpdatePerformance;
