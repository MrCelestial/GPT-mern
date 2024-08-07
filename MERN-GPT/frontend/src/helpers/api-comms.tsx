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
    try {
        const res = await axios.get("/users/auth-status"); // Ensure the path is correct

        // Debugging: Log the response
        console.log('Response status:', res.status);
        console.log('Response data:', res.data);

        if (res.status !== 200) {
            // Debugging: Log the reason for failure
            console.error('Non-200 status code:', res.status);
            throw new Error("Unauthorized user");
        }

        return res.data; // Directly return the data

    } catch (error) {
        // Error handling
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error('Axios error:', error.response?.data || error.message);
        } else {
            // Handle other types of errors
            console.error('Unexpected error:', error);
        }
        throw error; // Re-throw the error to be handled by the caller
    }
};
