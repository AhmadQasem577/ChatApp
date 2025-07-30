
import ChatContainer from "../Components/ChatContainer";
import ChatList from "../Components/ChatList"
import NoChatSelected from "../Components/NoChatSelected";
import { useChatStore } from "../store/useChatStore"



 const HomePage = () => {
  
  const {selectedUser}= useChatStore();
  return (
    
    <div className="h-screen bg-gray-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-gray-100 rounded-lg shadow-black w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <ChatList/>
            {!selectedUser? <NoChatSelected/>: <ChatContainer/>}
          </div>
        </div>
      </div>

    </div>
  )
}
export default HomePage
