import axios from "axios";
import React, { useState, useEffect, Component, useRef } from "react";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Editor from "./Editor";
import { useSelector } from "react-redux";
import { Api_URL } from "../API_URL";

export default function BlogWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const username = useSelector((state) => state.auth.data.username);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (title.length <= 5) {
      toast.error("Title should be more than 5 Characteristics", {
        position: "top-center",
      });
    } else if (desc.length <= 50) {
      toast.error("Content must be atleast 50 Characteristics", {
        position: "top-center",
      });
    } else {
      try {
        const res = await axios.post(`${Api_URL}/api/posts/write`, {
          title,
          desc,
          username,
        });
        toast.success(res.data.username + " your post is successful");
        navigate("/");
      } catch (err) {
        toast.error(err);
      }
    }
  };
  return (
    <>
      {/* <Header user={props.user} setUser={props.setUser}/> */}
      <div className="h-[100vh]">
        <div className="px-10 flex justify-center pt-5">
          <img
            src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="w-[70vw] h-60 object-cover rounded-lg"
          />
        </div>

        <form
          className="pc-36 p-16"
          action="submit"
          onSubmit={handlePostSubmit}
        >
          <div className="flex">
            <label htmlFor="fileInput" className="hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <input type="file" id="fileInput" className="hidden" />
            <input
              className="w-[100%] h-12 text-3xl px-2 text-slate-700 focus:outline-none"
              placeholder="Title..."
              type="text"
              name=""
              id=""
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              type="submit"
              className="px-8 rounded-lg py-2 text-lg bg-green-600 text-white hover:text-green-600 hover:bg-white hover:border hover:border-green-600"
            >
              Post
            </button>
          </div>
          {/* <textarea
            className="w-[100%] mt-5 h-60 text-2xl text-slate-700 p-2"
            placeholder="Whats on your Mind...."
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea> */}
          <Editor setContent={setDesc} content={desc} />
        </form>
      </div>
    </>
  );
}
