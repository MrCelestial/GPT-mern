import {Box, Button, Typography} from "@mui/material";
import CustomInput from "../components/shared/CustomInput.tsx";
import {IoIosLogIn} from "react-icons/io";

const Login = () => {
    const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        console.log(email,password);
    }
    return(
        <Box width={"100%"} height = {"100%"} display = "flex" flex = {1}>
            <Box padding={8} mt={8} display={{md: "flex", sm:"none", xs:"none"}}>
                <img src="" alt="LoginImage" style={{width: "400px"}}/>
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