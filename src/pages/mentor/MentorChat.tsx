import DashboardLayout from '@/components/layout/DashboardLayout';
import ChatInterface from '@/components/chat/ChatInterface';
import { currentMentor } from '@/data/mockData';

const MentorChat = () => {
  return (
    <DashboardLayout role="mentor" userName={currentMentor.name}>
      <div className="page-header">
        <h1 className="page-title">Chat</h1>
        <p className="page-subtitle">Communicate with your students</p>
      </div>

      <ChatInterface userRole="mentor" />
    </DashboardLayout>
  );
};

export default MentorChat;
