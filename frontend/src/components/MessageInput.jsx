import { useState, useRef } from 'react'
import { useChatStore } from '../store/useChatStore';
import {X, Image, Send} from "lucide-react";
import toast from 'react-hot-toast';

const MessageInput = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null); // useRef to persist values between re-renders but don't cause re-renders upon change
  const [text, setText] = useState("");
  const {sendMessage} = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // the file is encoded base 64 and is stored in the imagePreview variable
    }
    reader.readAsDataURL(file);
  }

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault(); // so normal ga form submit ayyinappudu -> it will send a GET api request -> this is to prevent that request from taking place
    if(!text.trim() && !imagePreview) return;
    try{
      await sendMessage({
        text: text.trim(),
        image: imagePreview
      })

      // once the message is sent -> clear the inputs so that the user can send another msg
      setText("");
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    } catch(error){
      console.log("Failed to send message : ", error);
    }
  };

  return (

    <div className='p-4 w-full'>

      {/* display image preview if the user uploaded an image */}
      {imagePreview && (
        <div className='mb-3 flex items-center gap-2'>
          <div className='relative'>
            <img 
              src = {imagePreview}
              alt = "Preview"
              className='w-20 h-20 object-cover rounded-lg border border-zinc-700'
            />
            <button 
              onClick={removeImage}
              className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center'
              type="button"
            >
              <X className='size-3'/>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className='flex items-center gap-2'> 
        <div className='flex-1 flex gap-2'>
          <input
            type="text"
            className='w-full input input-bordered rounded-lg input-sm sm:input-md'
            placeholder='Type a message...'
            value = {text} 
            onChange={(e)=>setText(e.target.value)} // returns the value of the cursor at the targets current position
          />
          <input
            type="file" // accept files ani
            accept='image/*' // accept only images ani
            className='hidden' // hide the text for this input
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20}/>
          </button>
        </div>
        <button
          type='submit'
          className='btn btn-sm btn-circle'
          disabled={!text.trim() && !imagePreview} // disable the button when there is no image or when there is no text
        >
          <Send size={22}/>
        </button>
      </form>

    </div>
  )
}

export default MessageInput