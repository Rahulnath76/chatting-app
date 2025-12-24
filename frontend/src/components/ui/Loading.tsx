import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading = ({ message = "Loading...", fullScreen = false }: LoadingProps) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <Loader2 className="size-12 text-blue-500 animate-spin relative" />
      </div>
      <p className="text-slate-400 font-medium animate-pulse tracking-wide">
        {message}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;