import { useState } from "react";
// import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Api_URL } from "../API_URL";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username || !email || !password){
      toast.error("Please enter all fields..!",{
        autoClose:2000,
        position:"top-center"
      })
    }else{
       try{
      const res = await axios.post(`${Api_URL}/api/auth/reg`, {
      username,
      email,
      password,
    });
    toast.success("Account created successfully....! Login ")
    setTimeout(()=>{
      res.data && window.location.replace("/login");
    },2000)
    }catch(err){
      toast.error(err)
      // setErr(err)
    }
    }
 
  };
  return (
    <>
      {/* <Header /> */}

      <div>
        <div className="flex justify-center items-center">
          <form
            action="submit"
            className="mt-20 border p-5 rounded-lg flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="text-center">
              <p className="text-2xl font-bold">Create a account </p>
            </div>
            <div>
              <p className="mt-5">Name</p>
              <input
                className="border rounded-lg py-1 px-2 mt-2 focus:outline-slate-600 w-[100%]"
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <p className="mt-5">Email</p>
              <input
                className="border rounded-lg py-1 px-2 mt-2 focus:outline-slate-600 w-[100%]"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <p className="mt-5">Password</p>
              <input
                className="border rounded-lg py-1 px-2 mt-2 focus:outline-slate-600 w-[100%]"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {err && <p className="text-center text-red-600 mt-2">Something went wrong</p>}
            <button className="mt-2 border px-2 py-2 rounded-lg bg-blue-800 text-white hover:bg-white hover:border-blue-800 hover:text-blue-800">
              Signup
            </button>
            <p className="mt-2">
              Already have a account{" "}
              <Link to="/login" className="text-blue-600">
                Login now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
