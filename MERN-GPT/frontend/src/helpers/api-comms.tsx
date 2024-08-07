import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    try {
        const res = await axios.post("/users/login", { email, password });

        if (res.status !== 200) {
            throw new Error("Failed to login user");
        }

        return res.data; // Return the data directly
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error during login:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error during login:', error);
        }
        throw error; // Re-throw the error to be handled by the caller
    }
};

export const checkAuthStatus = async () => {
    const res = await axios.get("/users/auth-status");
    if (res.status !== 200) {
        throw new Error("Failed to authenticate user");
    }
    return res.data;
};
