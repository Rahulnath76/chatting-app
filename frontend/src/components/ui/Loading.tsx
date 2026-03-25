import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}
const Loading = ({
  message = "Loading...",
  fullScreen = false,
}: LoadingProps) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className="size-8 text-blue-300 animate-spin" />
      <p className="text-blue-200 text-sm font-medium tracking-wide">
        {message}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050712]/90 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
