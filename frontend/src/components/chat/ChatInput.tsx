import { Plus, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../lib/operations/message.api";
import type { AppDispatch, RootState } from "../../store/store";
import { isNewMessage } from "../../store/slices/chatSlice";

const ChatInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const selectedChat = useSelector((state: RootState) => state.chat.selectedChat);

  // Send message handler
  const sendMessageHandler = (e?: KeyboardEvent<HTMLInputElement>) => {
    if (e && e.key !== "Enter") return;
    if (!selectedChat?.userId) return; 

    if (!text.trim() && !image) return; 

    dispatch(sendMessage({ receiverId: selectedChat.userId, text, image }));

    setText("");
    setImage(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  // Handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  // Create/revoke preview URL when image changes
  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(null);
      };
    }
  }, [image]);

  // Remove selected image
  const removeImage = () => {
    setImage(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="p-2 pt-3 bg-[#050712] rounded-b-lg ">
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />

      {image && (
        <div className="mb-2 flex items-center gap-3 px-1 ">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Selected"
              className="h-14 w-14 object-cover rounded-md"
            />
          )}
          <button
            onClick={removeImage}
            className="text-rose-400 hover:text-rose-600 cursor-pointer"
            aria-label="Remove image"
          >
            <X className="size-5" />
          </button>
        </div>
      )}

      <div className="flex bg-gray-900 items-center rounded-lg focus-within:ring-2 focus-within:ring-blue-900">
        <button
          className="hover:bg-[#0c1b30] active:bg-[#0c1b30] p-2 cursor-pointer rounded-l-lg"
          onClick={triggerFileInput}
          type="button"
          aria-label="Attach Image"
        >
          <Plus className="size-8 text-blue-300" />
        </button>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={sendMessageHandler}
          className="w-full px-2 h-12 focus:outline-none bg-transparent text-blue-200"
          placeholder="Type your message..."
          spellCheck={false}
        />

        <button
          className="p-2 px-5 cursor-pointer hover:bg-[#0c1b30] rounded-r-lg active:border-b-4 active:border-[#0c1b30]"
          onClick={() => sendMessageHandler()}
          type="button"
          aria-label="Send Message"
        >
          <Send className="size-7 text-blue-200" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
