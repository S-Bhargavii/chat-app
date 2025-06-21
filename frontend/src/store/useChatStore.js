import {create} from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios";

// create is a function that is taking in a function as an argument 
// so the create function will pass in the set and get args to the function 
// it is calling inside --> idhi argument kindha icham kadha -> adhi anamata 

// create returns a callback which is assigned to useChatStore 
// which we invoke by calling useChatStore();
export const useChatStore = create((set, get)=> ({
    messages : [], // the list of all the messages made with the user that we are texting
    users: [], // the list of all the users to display on the sidebar
    selectedUser: null, // the user that we are texting with
    isUsersLoading: false, 
    isMessagesLoading: false, 

    getUsers: async () => {
        set({isUsersLoading : true});
        try{
            const res = await axiosInstance.get("/message/users");
            set({users: res.data});
        } catch(error){
            toast.error(error.response.data.message);
        } finally {
            set({isUsersLoading: false});
        }
    },

    getMessages: async(userId) => {
        set({isMessagesLoading: true});
        // getting the messages made to the userId
        try{
            const res = await axiosInstance.get(`/message/${userId}`);
            set({messages : res.data});
        } catch(error){
            toast.error(error.response.data.message);
        } finally {
            set({isMessagesLoading : false});
        }
    }, 

    sendMessage : async(message) => {
        const {selectedUser, messages} = get(); // the get method provided in the argument 
        // lets you to access any object within this state that we are creating
        // because it is in the object --> we can't use it normally like a variable 
        // but we need use the get() and set() methods they provide 
        // to read and write to the variable 
        try{
            // send the message to the backend api so that it can store in the database 
            res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, message);
            // append the message to the list of messages in the frontend
            set({messages : [...messages, res.data]});
        } catch(error){
            toast.error(error.response.data.message);
        }
    },

    setSelectedUser: (selectedUser) => {
        set({selectedUser})
    }
}))