import {Box, Button, Typography} from "@mui/material";
import CustomInput from "../components/shared/CustomInput.tsx";
import {IoIosLogIn} from "react-icons/io";
import {toast} from "react-hot-toast";
import {useAuth} from "../context/AuthContext.tsx";

const Login = () => {
    const auth = useAuth()
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        try{
            toast.loading("Signing in",{id:"login"})
            await auth?.login(email,password);
            toast.success("Login successful",{id:"login"});
        }catch(error){
            console.log(error);
            toast.error("Signing in failed",{id:"login"});
        }
    };
    return(
        <Box width={"100%"} height = {"100%"} display = "flex" flex = {1}>
            <Box padding={8} mt={8} display={{md: "flex", sm:"none", xs:"none"}}>
               <h2>Get answers. Find inspiration. Be more productive.</h2>
            </Box>

            <Box display={"flex"} flex={{ xs: 1, md: 0.5 }} justifyContent={"center"} alignItems={"center"} padding={2} ml={"auto"} mt={16}>
                <form onSubmit={handleSubmit} style={{ margin: "auto", padding: "30px", boxShadow: "10px 10px 20px #000" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Typography variant="h6" textAlign="center" padding={2} fontWeight="300" fontFamily="Glegoo" color="#fa2742">
                            Login
                        </Typography>
                        <CustomInput type="email" name="email" label="Email"/>
                        <CustomInput type="password" name="password" label="Password"/>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{px:2, py:1, mt:2, width:"400px", bgcolor:"#e8eae3" ,color:"black" ,":hover":{bgcolor:"#fa2742", color:"black"},fontFamily:"Glegoo"}}
                            endIcon={<IoIosLogIn/>}
                            >
                                Login
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>

            );
};

export default Login;