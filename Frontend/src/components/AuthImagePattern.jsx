import React from "react";
import { Sparkles } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex w-3/4 bg-indigo-950 items-center justify-center relative overflow-hidden opacity-90 mt-20">
      {/* Decorative glowing gradient circle */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-sky-300 opacity-30 rounded-full blur-3xl animate-pulse"></div>

      <div className="z-10 text-center px-10">
        {/* Title*/}
        <div className="flex items-center justify-center mb-6 text-sky-300">
          <Sparkles className="h-8 w-8 mr-2" />
          <h2 className="text-3xl font-extrabold tracking-tight">{title}</h2>
        </div>

       
        {/* Subtitle */}
        <p className="text-sky-300 opacity-90 text-base max-w-md mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* Illustration */}
        <img
          src="/assets/Chat.svg"
          alt="Chat Illustration"
          className="mx-auto mt-10 drop-shadow-[0_0_20px_rgba(14,165,233,0.4)] "
        />
      </div>
    </div>
  );
};

export default AuthImagePattern;
