import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "./context/AuthContext.tsx";

const theme = createTheme({
    typography:{fontFamily:"Raleway,serif",
        allVariants:{color:"white"},
    },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthContextProvider>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
         <App />
      </ThemeProvider>
    </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
)