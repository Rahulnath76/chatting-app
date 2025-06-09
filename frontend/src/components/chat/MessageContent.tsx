import { useSelector } from "react-redux";
import { friends } from "../../data/data";
import type { RootState } from "../../store/store";

const MessageContent = ({ message }) => {
  const { currentChat } = useSelector((state: RootState) => state.chat);


  return (
    <div className={`${message.receiver === currentChat._id && "ml-auto"}`}>
      <div className="flex gap-2">
        <div className="">
          <img
            src={friends[0].avatar}
            alt=""
            width={40}
            className="rounded-full"
          />
        </div>
        <div
          className={`${
            message.receiver === currentChat._id
              ? "ml-auto bg-[#2e2005]"
              : "bg-black"
          } p-2 px-4  rounded-xl`}
        >
          {message.image && (
            <div>
              <img src={message.image} width={200} className="rounded-lg" />
            </div>
          )}
          <span>{message.text}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
