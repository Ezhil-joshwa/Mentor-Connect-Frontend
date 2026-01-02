import DashboardLayout from '@/components/layout/DashboardLayout';
import ChatInterface from '@/components/chat/ChatInterface';
import { currentStudent } from '@/data/mockData';

const StudentChat = () => {
  return (
    <DashboardLayout role="student" userName={currentStudent.name}>
      <div className="page-header">
        <h1 className="page-title">Chat</h1>
        <p className="page-subtitle">Connect with your mentor</p>
      </div>

      <ChatInterface userRole="student" />
    </DashboardLayout>
  );
};

export default StudentChat;
