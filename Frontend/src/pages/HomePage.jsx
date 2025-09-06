import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-indigo-950 border border-base-100">
      <div className="flex items-center justify-center pt-20 px-4 ">
        <div className="bg-indigo-950 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] border border-base-100">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;