import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import Header from "./Header";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import Admin from "./Admin";
import { Api_URL } from "../API_URL";

export default function Profile() {
  const [user, setUser] = useState({});
  const [allUser, setAllUser] = useState(null);
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${Api_URL}/api/users/` + path);
      setUser(res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    };
    getUser();
  }, [path]);

  const getAllUser = async () => {
    try {
      const res = await axios.get(`${Api_URL}/api/users/`);
      setAllUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user.role === "admin") {
      getAllUser();
    }
  }, [user]);

  const handleUserEdit = (e) => {
    e.preventDefault();
    setUpdateMode(true);
  };

  const handleUpadeUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${Api_URL}/api/users/` + path, {
        username: username,
        email: email,
        password: password,
      });
      toast.success("Profile Updated");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {/* <Header user={props.user} setUser={props.setUser}/> */}
      <div className="flex justify-center">
        <div className="">
          <div className="flex flex-col justify-center items-center  p-10">
            <div className="border rounded-lg p-5 flex flex-col items-center justify-center">
              <div className="p-5">
                <h1 className="text-3xl font-bold text-slate-700">Profile</h1>
              </div>
              <form className="flex flex-col gap-5">
                <div className="flex items-center justify-center gap-5">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACHCAMAAAALObo4AAAAMFBMVEXk5ueutLeqsbTR1dbn6erh4+SnrrG6v8LV2NrZ3N21u76xt7rq7O3Jzc/d4OG/xMYPGxVwAAADFklEQVR4nO2a2XLrIAxADYjFmOX//7YQJ/c6bWJL2CKdKecpbzkjJBbJ0zQYDAaDwWAwGAwGgz8JrHzYITmVCzGqWX9IBqYUvRDyjli8Sv1NIChb/vwJKW0KnTWU+CaxYuzcMSag7UuLW0xiPw31RmI18bpPSCC+C8ZjcfqsTT7QKCFR/CJwrFFEHLcISoN/acAZjIYQS2L10DiLsjKWMyDgsR5CRj4RUKjkuItoPg+ChpCZKyCHG9g3Ea5U1QtFgy0g6Jp9sPBkCKFY7gHhKZlE1BDCs9yKKEW7Yjg0kCfLFpbjLpA1mBKEWC0Vy6AxN3j46zVIZ8s/rt9BmjwYtnbi4bJihsef8fgteeoaPDhO/vQ79rEJGjwyg0eg3QorLOdcQ8EwlEuBnqiS5V5IvK6zXdjJFzLpODTKDYTowVG1NywtHFwvbeJDiukZVUU85b3P2CQjZQhjI4awl7G99lewqcrZDqpoXKpKjpfLE6gUkQt7IxdzH5Kerze2ETlaGrl06fRDWnZDwts63Yro3ROv3wCmXt7fmJil65AOIL4ajBnvOg/oyuJEL7ZRKb+tmz4wOwWYoxXG1KmpMSKrT01wq0qANBd0+fEhidswXf9n0lPv+TqEoOcYs/V+EY9ptrc5R6dD6DSthOSiNTUtfu5gNVF8VjN3ukIJw3OVvNpPpfDZaTaXUh95MciLkBFWcWRLWY4oaC9tWYf916rA5OzrDwsOVsirK5cnONvQdFhV/GXLA/PSarEG5ZKYQHr7jQU+JucfuuWlcFajYPK5kECivOB2kKded229/Tcm7b2yhgnUnkjzJX7/Okyn6WOMy1JjS0OS6KujUaEPDjWDRcEQRci9QSy0iMDpPfQ9hL5IuLRgv4MOyJXb10/wGxr6Y6RGEWSKAK1N2gBqY20aPJHA9d0b5ixUDCIgvEl6BxMQ6tc3LSCaq9ShQpvHYXcVcgcNIZajcLAdLM8cjojYi/bucZCpTVP8Jvb7aKFHtVQOPukKZ15uJI951wM5TjjPwXvGGdkHs7+DJNULptnuYDAYDAZbvgCBSySqlFIvAgAAAABJRU5ErkJggg=="
                    alt=""
                    className="h-20 rounded-full w-20"
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 hover:cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={handleUserEdit}
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {/* <input type="file" id="editProfile" className="hidden" /> */}
                </div>

                <input
                  className="py-2 text-xl bg-slate-100 px-2 border rounded-lg focus:outline-slate-600 text-slate-900"
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!updateMode}
                />
                <input
                  className="py-2 text-xl px-2 bg-slate-100 border rounded-lg focus:outline-slate-600 text-slate-900"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!updateMode}
                />
                <div className="flex items-center bg-slate-100 border rounded-lg px-2">
                  <input
                    className="py-2 text-xl bg-slate-100 focus:outline-none text-slate-900"
                    type={`${showPass ? "text" : "password"}`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!updateMode}
                  />
                  {!showPass && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 hover:cursor-pointer"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      onClick={() => setShowPass(!showPass)}
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {showPass && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 hover:cursor-pointer"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      onClick={() => setShowPass(!showPass)}
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </div>

                {updateMode && (
                  <button
                    className="px-5 py-2 border rounded-lg bg-blue-800 text-white hover:bg-white hover:border-blue-800 hover:text-blue-800"
                    onClick={handleUpadeUser}
                  >
                    Update
                  </button>
                )}
                {!updateMode && (
                  <button
                    className="px-5 py-2 border rounded-lg bg-blue-800 text-white hover:bg-white hover:border-blue-800 hover:text-blue-800"
                    onClick={handleUserEdit}
                  >
                    Edit Profile
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>




      <Admin allUser={allUser}/>
      
    </>
  );
}
