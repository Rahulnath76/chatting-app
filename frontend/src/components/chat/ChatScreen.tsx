import ChatContent from './ChatContent';
import ChatHeader from './ChatHeader';

const ChatScreen = () => {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ChatHeader />
      <div className="flex-1 h-full overflow-hidden">
        <ChatContent />
      </div>
    </div>
  );
};

export default ChatScreen;
