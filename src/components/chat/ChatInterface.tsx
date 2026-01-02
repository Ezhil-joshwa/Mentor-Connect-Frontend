import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { messages as mockMessages, currentStudent, currentMentor } from '@/data/mockData';
import ChatMessage from './ChatMessage';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatInterfaceProps {
  userRole: 'student' | 'mentor';
}

const ChatInterface = ({ userRole }: ChatInterfaceProps) => {
  const [newMessage, setNewMessage] = useState('');
  
  const currentUser = userRole === 'student' ? currentStudent : currentMentor;
  const chatPartner = userRole === 'student' ? currentMentor : currentStudent;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      // In a real app, this would send to backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="card-elevated flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="p-4 border-b border-border flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary/10 text-primary">
            {getInitials(chatPartner.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-foreground">{chatPartner.name}</h3>
          <p className="text-sm text-muted-foreground capitalize">
            {userRole === 'student' ? 'Your Mentor' : 'Student'}
          </p>
        </div>
        <span className="ml-auto flex items-center gap-2 text-sm text-success">
          <span className="w-2 h-2 bg-success rounded-full"></span>
          Online
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockMessages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isSender={message.senderId === currentUser.id}
            senderName={message.senderId === currentUser.id ? 'You' : chatPartner.name}
          />
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="input-field flex-1"
          />
          <Button onClick={handleSend} className="btn-primary">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
