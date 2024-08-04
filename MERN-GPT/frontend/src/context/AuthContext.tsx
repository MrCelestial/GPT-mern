import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {loginUser} from "../helpers/api-comms.tsx";

type User = {
    username: string;
    email: string;
}

type UserAuth ={
    isLoggedIn: boolean;
    user: User | null;
    login:( email:string, password: string) => Promise<void>;
    signup:(username:string, email:string, password: string) => Promise<void>;
    logout:() => Promise<void>;//removes the cookies
}
const AuthContext = createContext<UserAuth | null>(null);
export const AuthContextProvider = ({children}: {children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        //if cookies are valid

    },[]);
    const login = async (email:string, password: string) => {
        const data = await loginUser(email, password);
        if(data){
            setUser({email:data.email, username:data.name});
            setLoggedIn(true);
        }
    };
    const signup = async (username:string, email:string, password: string) => {};
    const logout = async () => {};

    const value = {
        user, isLoggedIn, login, signup, logout};
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
