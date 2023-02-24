import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from "react-redux";
import { login } from "../State/Action";
import { Api_URL } from "../API_URL";


export default function Login(props) {

  // const loginState = useSelector(state=>state.auth)
  // console.log(loginState)

  const dispatch = useDispatch()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!username || !password){
      // setErr(true)
      toast.error("Please Enter all fields",{
        position: "top-center"
      })
      // setErrmsg("Please Enter all fields");
      // setTimeout(()=>{
      //   setErr(false)
      // }, 2000)
    }else{
      try{
      const res = await axios.post(`${Api_URL}/api/auth/login`,{
        username:username,
        password:password
      });
      toast.success("Logged in successfully.....!",{
        autoClose:2000
      })
      dispatch(login(res.data))
        // localStorage.setItem('role', `${res.data.role}`)
        // localStorage.setItem('username', `${res.data.username}`)
        // localStorage.setItem('email', `${res.data.email}`)
        // localStorage.setItem('id', `${res.data._id}`)
        // props.setUser(res.data)
        navigate('/')
    }catch(err){
      toast.error(err.response.data)
      // console.log(err.response.data)
      // setErrmsg(err.response.data);
      // setErr(true)
    }
    }
  }



  return (
    <>
      <div className="flex justify-center items-center">
        <form
          action="submit"
          className="mt-20 border p-5 rounded-lg flex flex-col"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <p className="text-2xl font-bold">Welcome Back</p>
          </div>
          <div>
            <p className="mt-5">Username</p>
            <input
              className="border rounded-lg py-1 px-2 mt-2 focus:outline-slate-600 w-[100%]"
              type="text"
              placeholder="Enter your Username"
              onChange={(e)=> setUsername(e.target.value)}
            />
          </div>
          <div>
            <p className="mt-5">Password</p>
            <input
              className="border rounded-lg py-1 px-2 mt-2 focus:outline-slate-600 w-[100%]"
              type="password"
              placeholder="Enter your password"
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          {/* {err && <p className="text-center mt-2 text-red-700">{errmsg}</p>} */}
          <button type="submit" className="mt-2 border px-2 py-2 rounded-lg bg-blue-800 text-white hover:bg-white hover:border-blue-800 hover:text-blue-800">
            Login
          </button>
          <p className="mt-2">
            Don't Have a account..?{" "}
            <Link to="/signup" className="text-blue-600">Create one</Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
}
