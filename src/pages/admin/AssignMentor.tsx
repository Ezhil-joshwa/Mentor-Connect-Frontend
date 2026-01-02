import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { students, mentors } from '@/data/mockData';
import { UserPlus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AssignMentor = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('');
  const { toast } = useToast();

  const unassignedStudents = students.filter(s => !s.mentorId);

  const handleAssign = () => {
    if (selectedStudent && selectedMentor) {
      toast({
        title: 'Mentor Assigned',
        description: 'The mentor has been successfully assigned to the student.',
      });
      setSelectedStudent('');
      setSelectedMentor('');
    }
  };

  return (
    <DashboardLayout role="admin" userName="Admin User">
      <div className="page-header">
        <h1 className="page-title">Assign Mentor</h1>
        <p className="page-subtitle">Pair students with their mentors</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Assignment Form */}
        <div className="card-elevated p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            New Assignment
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Student
              </label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="input-field"
              >
                <option value="">Choose a student...</option>
                {unassignedStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} - {student.department}
                  </option>
                ))}
              </select>
              {unassignedStudents.length === 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  All students have been assigned mentors.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Mentor
              </label>
              <select
                value={selectedMentor}
                onChange={(e) => setSelectedMentor(e.target.value)}
                className="input-field"
              >
                <option value="">Choose a mentor...</option>
                {mentors.map((mentor) => (
                  <option key={mentor.id} value={mentor.id}>
                    {mentor.name} - {mentor.department} ({mentor.studentsCount} students)
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleAssign}
              disabled={!selectedStudent || !selectedMentor}
              className="btn-primary w-full gap-2"
            >
              <Check className="h-4 w-4" />
              Assign Mentor
            </Button>
          </div>
        </div>

        {/* Current Assignments */}
        <div className="card-elevated p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Current Assignments</h2>
          <div className="space-y-4">
            {students.filter(s => s.mentorId).map((student) => {
              const mentor = mentors.find(m => m.id === student.mentorId);
              return (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">{mentor?.name}</p>
                    <p className="text-sm text-muted-foreground">Mentor</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssignMentor;
