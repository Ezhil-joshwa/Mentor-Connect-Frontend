// Mock data for Mentor Connect application

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'mentor' | 'student';
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  mentorId?: string;
  attendance: number;
  performance: number;
  joinedAt: string;
}

export interface Mentor {
  id: string;
  name: string;
  email: string;
  department: string;
  expertise: string[];
  studentsCount: number;
  joinedAt: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  mode: 'online' | 'offline';
  location?: string;
  link?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  participants: string[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
  targetRoles: ('admin' | 'mentor' | 'student')[];
}

export interface PerformanceData {
  month: string;
  marks: number;
  attendance: number;
}

// Mock Students
export const students: Student[] = [
  { id: 's1', name: 'Alice Johnson', email: 'alice@university.edu', department: 'Computer Science', mentorId: 'm1', attendance: 92, performance: 88, joinedAt: '2024-01-15' },
  { id: 's2', name: 'Bob Smith', email: 'bob@university.edu', department: 'Computer Science', mentorId: 'm1', attendance: 85, performance: 76, joinedAt: '2024-01-20' },
  { id: 's3', name: 'Carol Williams', email: 'carol@university.edu', department: 'Data Science', mentorId: 'm2', attendance: 95, performance: 92, joinedAt: '2024-02-01' },
  { id: 's4', name: 'David Brown', email: 'david@university.edu', department: 'Data Science', mentorId: 'm2', attendance: 78, performance: 71, joinedAt: '2024-02-10' },
  { id: 's5', name: 'Eva Martinez', email: 'eva@university.edu', department: 'Web Development', mentorId: 'm3', attendance: 88, performance: 84, joinedAt: '2024-02-15' },
  { id: 's6', name: 'Frank Lee', email: 'frank@university.edu', department: 'Web Development', attendance: 90, performance: 80, joinedAt: '2024-03-01' },
  { id: 's7', name: 'Grace Kim', email: 'grace@university.edu', department: 'AI/ML', mentorId: 'm4', attendance: 96, performance: 94, joinedAt: '2024-03-05' },
  { id: 's8', name: 'Henry Chen', email: 'henry@university.edu', department: 'AI/ML', mentorId: 'm4', attendance: 82, performance: 78, joinedAt: '2024-03-10' },
];

// Mock Mentors
export const mentors: Mentor[] = [
  { id: 'm1', name: 'Dr. Sarah Wilson', email: 'sarah.wilson@university.edu', department: 'Computer Science', expertise: ['Algorithms', 'System Design'], studentsCount: 2, joinedAt: '2023-08-01' },
  { id: 'm2', name: 'Prof. Michael Chang', email: 'michael.chang@university.edu', department: 'Data Science', expertise: ['Machine Learning', 'Statistics'], studentsCount: 2, joinedAt: '2023-09-01' },
  { id: 'm3', name: 'Dr. Emily Davis', email: 'emily.davis@university.edu', department: 'Web Development', expertise: ['React', 'Node.js', 'TypeScript'], studentsCount: 1, joinedAt: '2023-10-01' },
  { id: 'm4', name: 'Prof. James Miller', email: 'james.miller@university.edu', department: 'AI/ML', expertise: ['Deep Learning', 'NLP', 'Computer Vision'], studentsCount: 2, joinedAt: '2023-07-01' },
];

// Mock Meetings
export const meetings: Meeting[] = [
  { id: 'mt1', title: 'Weekly Check-in', date: '2024-12-15', time: '10:00 AM', mode: 'online', link: 'https://meet.google.com/abc-defg-hij', status: 'upcoming', participants: ['s1', 'm1'] },
  { id: 'mt2', title: 'Project Review', date: '2024-12-16', time: '2:00 PM', mode: 'offline', location: 'Room 201, Engineering Building', status: 'upcoming', participants: ['s2', 's3', 'm1'] },
  { id: 'mt3', title: 'Career Guidance Session', date: '2024-12-14', time: '11:00 AM', mode: 'online', link: 'https://zoom.us/j/123456789', status: 'completed', participants: ['s4', 'm2'] },
  { id: 'mt4', title: 'Technical Discussion', date: '2024-12-17', time: '3:00 PM', mode: 'online', link: 'https://meet.google.com/xyz-uvwx-abc', status: 'upcoming', participants: ['s5', 'm3'] },
  { id: 'mt5', title: 'Monthly Progress Review', date: '2024-12-13', time: '4:00 PM', mode: 'offline', location: 'Conference Room A', status: 'completed', participants: ['s7', 's8', 'm4'] },
];

// Mock Messages
export const messages: Message[] = [
  { id: 'msg1', senderId: 's1', receiverId: 'm1', content: 'Hi Dr. Wilson! I wanted to discuss my project progress.', timestamp: '2024-12-14T09:00:00', isRead: true },
  { id: 'msg2', senderId: 'm1', receiverId: 's1', content: 'Hi Alice! Sure, I\'d be happy to discuss. What aspects would you like to focus on?', timestamp: '2024-12-14T09:05:00', isRead: true },
  { id: 'msg3', senderId: 's1', receiverId: 'm1', content: 'I\'m having trouble with the algorithm optimization part. Could you suggest some resources?', timestamp: '2024-12-14T09:10:00', isRead: true },
  { id: 'msg4', senderId: 'm1', receiverId: 's1', content: 'Of course! I\'ll send you some materials. Also, let\'s schedule a call for this week to go over it together.', timestamp: '2024-12-14T09:15:00', isRead: false },
  { id: 'msg5', senderId: 's1', receiverId: 'm1', content: 'That would be great! Thank you so much.', timestamp: '2024-12-14T09:20:00', isRead: false },
];

// Mock Announcements
export const announcements: Announcement[] = [
  { id: 'a1', title: 'Holiday Schedule Update', content: 'The mentorship sessions will be paused from Dec 24 to Jan 2 for the holiday break. Regular sessions will resume on Jan 3rd.', author: 'Admin', createdAt: '2024-12-10', priority: 'high', targetRoles: ['admin', 'mentor', 'student'] },
  { id: 'a2', title: 'New Mentorship Guidelines', content: 'Please review the updated mentorship guidelines document shared in your dashboard. All mentors are required to complete the review by end of this week.', author: 'Admin', createdAt: '2024-12-08', priority: 'medium', targetRoles: ['mentor'] },
  { id: 'a3', title: 'Semester End Evaluations', content: 'End of semester performance evaluations will be conducted from Dec 18-22. Students should prepare their project presentations.', author: 'Admin', createdAt: '2024-12-05', priority: 'high', targetRoles: ['mentor', 'student'] },
  { id: 'a4', title: 'Platform Maintenance', content: 'Scheduled maintenance on Dec 20th from 2 AM to 6 AM. The platform may be temporarily unavailable during this time.', author: 'System', createdAt: '2024-12-12', priority: 'low', targetRoles: ['admin', 'mentor', 'student'] },
];

// Performance data for charts
export const performanceData: PerformanceData[] = [
  { month: 'Aug', marks: 72, attendance: 85 },
  { month: 'Sep', marks: 78, attendance: 88 },
  { month: 'Oct', marks: 82, attendance: 90 },
  { month: 'Nov', marks: 85, attendance: 92 },
  { month: 'Dec', marks: 88, attendance: 94 },
];

// Dashboard stats
export const adminStats = {
  totalStudents: 8,
  totalMentors: 4,
  totalMeetings: 5,
  activeConnections: 7,
  completedMeetings: 2,
  upcomingMeetings: 3,
};

export const studentStats = {
  attendanceRate: 92,
  performanceScore: 88,
  upcomingMeetings: 2,
  completedSessions: 12,
};

export const mentorStats = {
  assignedStudents: 2,
  upcomingMeetings: 3,
  completedSessions: 15,
  averageStudentPerformance: 82,
};

// Current user simulation (will be set based on role selection)
export const currentStudent = students[0];
export const currentMentor = mentors[0];
export const currentMentorForStudent = mentors[0];
