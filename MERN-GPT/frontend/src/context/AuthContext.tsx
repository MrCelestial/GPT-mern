import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {checkAuthStatus, loginUser} from "../helpers/api-comms.tsx";

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

    useEffect(() => {
        // Function to check authentication status and update state
        async function checkStatus() {
            try {
                const data = await checkAuthStatus();
                console.log('Authentication status data:', data); // Log received data

                if (data) {
                    setUser({ email: data.email, username: data.name });
                    setLoggedIn(true);
                } else {
                    setUser(null);
                    setLoggedIn(false);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                setUser(null);
                setLoggedIn(false);
            }
        }

        checkStatus();
    }, []);


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
