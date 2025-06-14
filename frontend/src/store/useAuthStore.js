import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

// zustand is used for global state management
// once we create the state here, we can use it 
// in any other components that we need

export const useAuthStore = create((set)=> ({
    // returning an object
    authUser: null, 
    isSigningUp: false, 
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async() => {
        try{
            const res = await axiosInstance.get("/auth/check-auth"); // the axiosinstance alr prefixed with /api (see baseurl)
            set({authUser: res.data}); // to check -> isnt this supposed to be res.user ?
        }catch(error){
            console.log(`Error in checkAuth : ${error}`);
            set({authUser: null});
        }finally{
            set({isCheckingAuth: false});
            // by using states, react will re-render any component 
            // that uses the state.
        }
    }
}))