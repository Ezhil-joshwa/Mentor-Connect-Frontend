import { Message } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
  isSender: boolean;
  senderName: string;
}

const ChatMessage = ({ message, isSender, senderName }: ChatMessageProps) => {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className={cn('flex flex-col gap-1', isSender ? 'items-end' : 'items-start')}>
      <div className={cn(
        isSender ? 'chat-bubble-sent' : 'chat-bubble-received'
      )}>
        <p className="text-sm">{message.content}</p>
      </div>
      <div className="flex items-center gap-2 px-2">
        <span className="text-xs text-muted-foreground">{senderName}</span>
        <span className="text-xs text-muted-foreground">•</span>
        <span className="text-xs text-muted-foreground">{formattedTime}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
