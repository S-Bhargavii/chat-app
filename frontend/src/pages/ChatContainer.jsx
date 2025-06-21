import { ChatHeader } from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import { useChatStore } from "../store/useChatStore"
import { useEffect } from "react";

const ChatContainer = () => {
  const {selectedUser, messages, getMessages, isMessagesLoading} = useChatStore();

  useEffect(()=>{
    getMessages(selectedUser._id);
    // get the messages made with the selected user 
    // whenever the user changes and when the component is first mounted
  }, [selectedUser._id, getMessages]);

  if(isMessagesLoading) return <div>Loading..</div>

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* chat header --> selected user profile picture, selected user id */}
      <ChatHeader/>
      {/* messages with the selected user */}
      <p>Messages </p>
      {/* input to send new messages */}
      <MessageInput/>
    </div>
  )

}

export default ChatContainer