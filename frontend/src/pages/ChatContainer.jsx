import { ChatHeader } from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import { useChatStore } from "../store/useChatStore"
import { useEffect } from "react";
import MessageSkeleton from "../components/skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {selectedUser, messages, getMessages, isMessagesLoading} = useChatStore();
  const {authUser} = useAuthStore();

  useEffect(()=>{
    getMessages(selectedUser._id);
    // get the messages made with the selected user 
    // whenever the user changes and when the component is first mounted
  }, [selectedUser._id, getMessages]);

  if(isMessagesLoading) return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* chat header --> selected user profile picture, selected user id */}
      <ChatHeader/>
      {/* messages with the selected user */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key = {message._id}
            className={`chat ${message.senderId === authUser._id ?  "chat-end" :  "chat-start"}`}
          >
            {/* display sender's profile pic */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full-border">
                <img
                  src = {message.senderId === authUser._id ? authUser.profilePic || "/avatar.jpg" : selectedUser.profilePic || "/avatar.jpg"}
                  alt="profile pic"
                />
              </div>
            </div>
            
            {/* show the time message was sent */}
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            <div className="chat-bubble flex">
              {message.image && (
                <img 
                  src = {message.image}
                  alt = "Attachment"
                  className = "sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      {/* input to send new messages */}
      <MessageInput/>
    </div>
  )

}

export default ChatContainer