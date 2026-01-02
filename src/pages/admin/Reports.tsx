import DashboardLayout from '@/components/layout/DashboardLayout';
import { adminStats, students, mentors } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, Download, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const departmentData = [
  { name: 'Computer Science', students: 2 },
  { name: 'Data Science', students: 2 },
  { name: 'Web Development', students: 2 },
  { name: 'AI/ML', students: 2 },
];

const performanceDistribution = [
  { name: 'Excellent (90+)', value: 2, color: 'hsl(var(--success))' },
  { name: 'Good (75-89)', value: 4, color: 'hsl(var(--primary))' },
  { name: 'Average (60-74)', value: 1, color: 'hsl(var(--warning))' },
  { name: 'Below Average', value: 1, color: 'hsl(var(--destructive))' },
];

const Reports = () => {
  const avgPerformance = Math.round(students.reduce((acc, s) => acc + s.performance, 0) / students.length);
  const avgAttendance = Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length);

  return (
    <DashboardLayout role="admin" userName="Admin User">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Insights and statistics for the mentorship program</p>
        </div>
        <Button className="btn-primary gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card-elevated p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{adminStats.totalStudents}</p>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </div>
        </div>
        <div className="card-elevated p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{avgPerformance}%</p>
            <p className="text-sm text-muted-foreground">Avg. Performance</p>
          </div>
        </div>
        <div className="card-elevated p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
            <FileText className="h-6 w-6 text-info" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{avgAttendance}%</p>
            <p className="text-sm text-muted-foreground">Avg. Attendance</p>
          </div>
        </div>
        <div className="card-elevated p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{mentors.length}</p>
            <p className="text-sm text-muted-foreground">Active Mentors</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Students by Department */}
        <div className="card-elevated p-6">
          <h3 className="font-semibold text-lg text-foreground mb-6">Students by Department</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Distribution */}
        <div className="card-elevated p-6">
          <h3 className="font-semibold text-lg text-foreground mb-6">Performance Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {performanceDistribution.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-sm text-muted-foreground">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
