import Header from "./components/Header.tsx";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Chat from "./pages/Chat.tsx";

function App() {
   return(
   <main>
      <Header/>
         <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/chat" element={<Chat/>} />
         </Routes>
   </main>
   );

}

export default App
