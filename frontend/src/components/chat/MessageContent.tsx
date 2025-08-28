import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { Message } from "../../lib/types";

const MessageContent = ({ message }: { message: Message }) => {

  const { user, loading } = useSelector((state: RootState) => state.profile);

  if(loading) return <>Loading</>
  // console.log(message);
  const isMyMessage = (message.sender?._id) === user?._id;
  
  // console.log(isMyMessage);
  const senderAvatar = message.sender.avatar || `https://ui-avatars.com/api/?name=${message.sender?.fullName}&background=000&color=fff`

  return (
    <div className={isMyMessage ? "ml-auto" : ""}>
      <div className="flex gap-2">
        <div>
          <img
            src={senderAvatar}
            alt="sender avatar"
            width={40}
            className="rounded-full"
          />
        </div>
        <div
          className={`${
            isMyMessage ? "ml-auto bg-[#2e2005]" : "bg-black"
          } p-2 px-4 rounded-xl max-w-[75%] break-words`}
        >
          {message.image && (
            <div>
              <img
                src={message.image}
                width={200}
                className="rounded-lg"
                alt="message attachment"
              />
            </div>
          )}
          <span>{message.text}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
