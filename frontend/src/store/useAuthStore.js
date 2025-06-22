import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client";
// zustand is used for global state management
// once we create the state here, we can use it 
// in any other components that we need
const BASE_URL = "http://localhost:5001" // this is the backend api 
// because that is where the socket server is opened

export const useAuthStore = create((set, get)=> ({
    // returning an object
    authUser: null, 
    isSigningUp: false, 
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null, 

    checkAuth: async() => {
        try{
            const res = await axiosInstance.get("/auth/check-auth"); // the axiosinstance alr prefixed with /api (see baseurl)
            set({authUser: res.data}); // to check -> isnt this supposed to be res.user ?
            get().connectSocket();
        }catch(error){
            console.log(`Error in checkAuth : ${error}`);
            set({authUser: null});
        }finally{
            set({isCheckingAuth: false});
            // by using states, react will re-render any component 
            // that uses the state.
        }
    },

    login: async(data) => {
        set({isLoggingIn:true});
        try{
            const response = await axiosInstance.post("/auth/login", data);
            set({authUser: response.data});
            toast.success("User logged in successfully");
            get().connectSocket();
        } catch(error){
            console.log("An error occured when making a login request to teh backend api")
            toast.error(error.response.data.message);
        } finally{
            set({isLoggingIn: false});
        }
    },

    signup: async(data) => {
        set({isSigningUp: true}); // you can modify only part of the entire state object 

        try{
            const response = await axiosInstance.post("/auth/signup", data); // make a post request to the auth/signup endpoint that the backend provides us
            // the json body of the response that was passed by the backend 
            // is stored in the res.data
            set ({authUser: response.data});
            toast.success("Account created successfully");
            get().connectSocket();
        } catch(error){
            console.log("An error occured when making a request to the backend signup endpoint");
            toast.error(error.response.data.message);
        } finally{
            set({isSigningUp: false});
        }
    }, 

    logout: async() => {
        try{
            const response = await axiosInstance.post("/auth/logout");
            set({authUser: null})
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch(error){
            console.log("An error occured while logging out");
            toast.error(error.response.data.message);
        }
    }, 

    updateProfile : async(data) => {
        try{
            const response = await axiosInstance.put("/auth/update-profile", data);
            // user info annadhi cookie nundi vasthadhi, we are sending with creds 
            // so kangaaru padipoku
            set({authUser: response.data});
            toast.success("Profile updated successfully");
        } catch(error){
            console.log("error in update profile : ", error);
            toast.error(error.response.data.message);
        } finally {
            set({isUpdatingProfile : false});
        }
    }, 

    connectSocket: () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return; 
        // dont try to connect if the user is authenticated
        // dont try to connect if the user is connected again
        
        // send the user id in the query request params
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }
        })
        socket.connect()
        set({socket:socket});

        // adds a listener function to the event (corresponding
        // to the name) that is emitted
        socket.on("getOnlineUsers", (userIds)=>{
            set({onlineUsers: userIds});
        })
    }, 

    disconnectSocket : () => {
        if(get().socket?.connected) get().socket.disconnect();
    }
}))