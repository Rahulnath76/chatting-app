import React from "react";
import { MessageSquare } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-[#0B0F19] text-slate-100 relative overflow-hidden">
      {/* Soft natural ambient gradient (single subtle tone for depth, no rainbow blobs) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(30, 58, 138, 0.18) 0%, rgba(11, 15, 25, 0.95) 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[420px] my-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-slate-900 border border-slate-800 shadow-md shadow-black/30 mb-3 text-blue-400">
            <MessageSquare className="size-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {title}
          </h1>
          <p className="text-sm text-slate-400 mt-1.5">
            {subtitle}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-black/40">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
