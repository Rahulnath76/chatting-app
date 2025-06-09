import ChatContent from './ChatContent'
import ChatHeader from './ChatHeader'

const ChatScreen = () => {
  return (
    <div className='flex-1 h-full rounded-lg'>
        <ChatHeader />
        <div className='bg-[#090d1e] rounded-bl-lg h-full max-h-[calc(100vh-100px)]'>
          <ChatContent />
        </div>
    </div>
  )
}

export default ChatScreen