import DashboardLayout from '@/components/layout/DashboardLayout';
import PerformanceChart from '@/components/performance/PerformanceChart';
import { currentStudent, performanceData } from '@/data/mockData';
import { TrendingUp, Award, Calendar, Target } from 'lucide-react';

const StudentPerformance = () => {
  const latestPerformance = performanceData[performanceData.length - 1];
  const previousPerformance = performanceData[performanceData.length - 2];
  const marksTrend = latestPerformance.marks - previousPerformance.marks;
  const attendanceTrend = latestPerformance.attendance - previousPerformance.attendance;

  return (
    <DashboardLayout role="student" userName={currentStudent.name}>
      <div className="page-header">
        <h1 className="page-title">Performance</h1>
        <p className="page-subtitle">Track your academic progress and achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card-elevated p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Marks</p>
              <p className="text-3xl font-bold text-foreground mt-1">{currentStudent.performance}%</p>
              <div className={`flex items-center gap-1 mt-2 text-sm ${marksTrend >= 0 ? 'text-success' : 'text-destructive'}`}>
                <TrendingUp className={`h-4 w-4 ${marksTrend < 0 ? 'rotate-180' : ''}`} />
                <span>{Math.abs(marksTrend)}% from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-primary/10">
              <Award className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="card-elevated p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
              <p className="text-3xl font-bold text-foreground mt-1">{currentStudent.attendance}%</p>
              <div className={`flex items-center gap-1 mt-2 text-sm ${attendanceTrend >= 0 ? 'text-success' : 'text-destructive'}`}>
                <TrendingUp className={`h-4 w-4 ${attendanceTrend < 0 ? 'rotate-180' : ''}`} />
                <span>{Math.abs(attendanceTrend)}% from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-success/10">
              <Calendar className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>

        <div className="card-elevated p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sessions Attended</p>
              <p className="text-3xl font-bold text-foreground mt-1">12</p>
              <p className="text-sm text-muted-foreground mt-2">Out of 14 total</p>
            </div>
            <div className="p-3 rounded-lg bg-info/10">
              <Target className="h-6 w-6 text-info" />
            </div>
          </div>
        </div>

        <div className="card-elevated p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overall Grade</p>
              <p className="text-3xl font-bold text-foreground mt-1">A-</p>
              <p className="text-sm text-muted-foreground mt-2">Excellent performance</p>
            </div>
            <div className="p-3 rounded-lg bg-warning/10">
              <Award className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <PerformanceChart />

      {/* Monthly Breakdown */}
      <div className="card-elevated p-6 mt-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Monthly Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Month</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Marks</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Attendance</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((data, index) => (
                <tr key={data.month} className="border-b border-border last:border-0">
                  <td className="py-3 px-4 font-medium text-foreground">{data.month}</td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-foreground">{data.marks}%</span>
                    {index > 0 && (
                      <span className={`ml-2 text-xs ${data.marks >= performanceData[index - 1].marks ? 'text-success' : 'text-destructive'}`}>
                        {data.marks >= performanceData[index - 1].marks ? '↑' : '↓'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-foreground">{data.attendance}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`badge-status ${data.marks >= 80 ? 'badge-success' : data.marks >= 60 ? 'badge-warning' : 'bg-destructive/10 text-destructive'}`}>
                      {data.marks >= 80 ? 'Excellent' : data.marks >= 60 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentPerformance;
