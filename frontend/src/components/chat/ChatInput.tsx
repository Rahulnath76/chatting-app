import { Plus, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../lib/operations/message.api";
import type { AppDispatch, RootState } from "../../store/store";

const ChatInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const selectedChat = useSelector((state: RootState) => state.chat.selectedChat);

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

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

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

  const removeImage = () => {
    setImage(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />

      {image && (
        <div className="mb-2 flex items-center gap-2 px-1">
          {previewUrl && (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Selected"
                className="size-14 object-cover rounded-lg border border-slate-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-slate-800 text-rose-400 hover:text-white flex items-center justify-center shadow"
                aria-label="Remove image"
              >
                <X className="size-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl px-2 py-1.5 focus-within:border-slate-700 transition-colors">
        <button
          onClick={triggerFileInput}
          type="button"
          aria-label="Attach image"
          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="size-5" />
        </button>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={sendMessageHandler}
          className="flex-1 px-2 py-1 bg-transparent text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          placeholder="Write a message..."
          spellCheck={false}
        />

        <button
          onClick={() => sendMessageHandler()}
          type="button"
          disabled={!text.trim() && !image}
          aria-label="Send message"
          className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 text-white transition-colors cursor-pointer"
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
