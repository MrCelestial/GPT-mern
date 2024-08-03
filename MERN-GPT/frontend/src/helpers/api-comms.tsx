import axios from "axios";

export const loginUser = async (email: string, password:string) => {
    const res = await axios.post("/users/login", {email, password});
    if(res.status !== 200) {
        throw new Error("Failed to login user");
    }
    return await res.data;
};