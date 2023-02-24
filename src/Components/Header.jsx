import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { add, sub, logout } from "../State/Action";
import { toast } from "react-toastify";

export default function Header() {
  const num = useSelector((state) => state.num);
  const user = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const [write, SetWrite] = useState(false);;
  const navigate = useNavigate();
  const auth = user?._id;

  useEffect(() => {
    if (
      user?.role === "admin" ||
      user?.role === "editor"
    ) {
      SetWrite(true);
    } else {
      SetWrite(false);
    }
  }, [auth]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    toast.success("Logged out",{
      autoClose:2000
    })
    // localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sticky top-0 h-20 px-10 text-slate-100 bg-blue-500 w-100 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold  ">
        V-Blog
      </Link>
      <ul className="flex gap-5">
        <Link
          to="/"
          className="hover:cursor-pointer hover:text-white hover:border-b hover:border-white"
        >
          Home
        </Link>
        {/* <li>
          <button onClick={() => dispatch(add(5))}>add</button> {num}{" "}
          <button onClick={() => dispatch(sub(5))}>sub</button>
        </li> */}
        {auth && (
          <Link
            to={`/users/${auth}`}
            className="hover:cursor-pointer hover:text-white hover:border-b hover:border-white"
          >
            Profile
          </Link>
        )}
        {/* <Link
          to="/contact"
          className="hover:cursor-pointer hover:text-white hover:border-b hover:border-white"
        >
          Contact
        </Link> */}
        {write && (
          <Link
            to="/blogWrite"
            className="hover:cursor-pointer hover:text-white hover:border-b hover:border-white"
          >
            Write
          </Link>
        )}
        {auth && (
        <li
          to=""
          className="hover:cursor-pointer hover:text-white hover:border-b hover:border-white"
          onClick={handleLogout}
        >
          Logout
        </li>
         )}
      </ul>
      {auth ? (
        <Link to={`/users/${auth}`} className="flex items-center gap-5">
          {/* <img
            className="w-8 h-8 rounded-full hover:cursor-pointer"
            src="https://vikramjagtap.netlify.app/static/media/Vj.92ac1dc5411ff18d3c6e.png"
            alt=""
          /> */}
          <div className="rounded-full w-10 h-10  flex justify-center items-center border" title="Profile">
            <p className="font-bold text-white text-xl">{user?.username.split("")[0].toUpperCase()}</p>
            </div>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 hover:cursor-pointer hover:scale-105"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg> */}
        </Link>
      ) : (
        <>
          <div className="flex gap-5">
            <Link
              to="/login"
              className="hover:cursor-pointer hover:text-white hover:border-b hover:border-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:cursor-pointer hover:text-white hover:border-b hover:border-white"
            >
              Signup
            </Link>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 hover:cursor-pointer hover:scale-105"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg> */}
          </div>
        </>
      )}
    </div>
  );
}
