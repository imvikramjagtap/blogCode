import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import SinglePost from "./Components/SinglePost";
import BlogWrite from "./Components/BlogWrite";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function App() {
  const user = useSelector(state => state.auth);
  const loginStatus = useSelector(state => state.auth.loginState);
  const [auth, setAuth] = useState("");
  const [role, setRole] = useState("");
  // const [user, setUser] = useState(null);

  useEffect(()=>{
     setAuth(user.data?._id); 
      setRole(user.data?.role);
  },[user])

  return (
    <>
      <Router>
      <ToastContainer />
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={loginStatus ? <Home /> : <Signup />} />
          <Route
            path="/login"
            element={loginStatus ? <Profile/> : <Login />}
          />
          <Route
            path="/blogWrite"
            element={
              role === "admin" || role === "editor" ? (
                <BlogWrite />
              ) : (
                <Login  />
              )
            }
          />
          <Route path="/post/:postID" element={<SinglePost />} />
          <Route
            path="/users/:userID"
            element={auth ? <Profile /> : <Login/>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
