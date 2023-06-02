import Home from "./pages/Home";
import SignIn from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Browse from "./pages/Browse";
import Watch from "./pages/Watch";

import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Choose from "./components/signUp/Choose";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup/password" element={<Signup page="PASSWORD" />} />
      <Route path="/signup/choose" element={<Signup page="CHOOSE" />} />
      <Route path="/singup/planform" element={<Signup page="PLANFORM" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/watch" element={<Watch />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
