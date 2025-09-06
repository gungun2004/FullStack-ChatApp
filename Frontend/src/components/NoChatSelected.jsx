// components/NoChatSelected.jsx

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, MessageCircleCodeIcon, MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center h-screen text-center p-4">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <MessageSquare size={64} className="mb-4 text-sky-300" />
      </motion.div>
      <h2 className="text-2xl text-sky-300 font-semibold">No Chat Selected</h2>
      <p className="mt-2 text-sm text-sky-300">
        Select a conversation to start chatting.
      </p>
    </div>
  );
};

export default NoChatSelected;
