import React from "react";
import Comment from "./Comment";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Api_URL } from "../API_URL";
import Loader from "../Loader";
import Editor from "./Editor";

export default function SinglePost() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [desc, setDecs] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const user = useSelector((state) => state.auth.data);
  const getPost = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${Api_URL}/api/posts/` + path);
      if (res.status === 200) {
        setPost(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPost();
    if (user?.role === "admin" || user?.role === "editor") {
      setShowEdit(true);
    } else {
      setShowEdit(false);
    }
  }, [path]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${Api_URL}/api/posts/${post._id}`);
      toast.success("Blog post deleted successfully", {
        position: "top-center",
      });
      navigate("/");
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  };

  // const profileClickHandler = (e) => {
  //   e.preventDefault();
  //   navigate({``});
  // };

  const updateBlog = (e) => {
    e.preventDefault();
    setUpdateMode(true);
    setTitle(post.title);
    setDecs(post.desc);
    toast.info("Hope you make no mistake this time..!");
  };

  const handleUpdateBlog = async () => {
    setLoading(true);
    try {
      await axios.put(`${Api_URL}/api/posts/${post._id}`, {
        title,
        desc,
      });
      toast.success("Blog post updated successfully..!");
      setUpdateMode(false);
      getPost()
    } catch (err) {
      alert(err);
    }
    // try {
    //   await axios.put(`{http://localhost:5000/api/posts/${post._id}}`,
    //     {
    //       username:localStorage.getItem("role"),
    //       title,
    //       decs,
    //     }
    //   );
    //   alert("your blog updated successfully");
    // } catch(err) {
    //   alert(err)
    // }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="mx-60 bg-slate-100 px-20">
            <div className="p-5">
              <div className="flex justify-between items-center text-slate-500  py-5">
                <div className="flex gap-5">
                  <div
                    className="flex gap-2 hover:cursor-pointer"
                    // onClick={profileClickHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>{post.username}</p>
                  </div>

                  <li>{new Date(post.createdAt).toDateString()}</li>
                  <li>10min read</li>
                </div>
                {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg> */}
                <div className="flex justify-end py-5">
                  {/* <p className="font-semibold">
              Tags:
              <span className="font-normal bg-[#A82C2B] mx-2 px-4 py-1 text-slate-200">
                Dating
              </span>
              <span className="font-normal bg-[#A82C2B] mx-2 px-4 py-1 text-slate-200">
                Marriage
              </span>
              <span className="font-normal bg-[#A82C2B] mx-2 px-4 py-1 text-slate-200">
                Dating
              </span>
            </p> */}
                  <div className="flex justify-between items-center mb-3 gap-10">
                    {!updateMode && (
                      <div className="flex gap-5">
                        {showEdit && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 text-slate-600 hover:cursor-pointer"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            onClick={updateBlog}
                          >
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path
                              fillRule="evenodd"
                              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {user?.role === "admin" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 hover:cursor-pointer text-slate-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            onClick={handleDelete}
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="">
                {!updateMode && (
                  <h1 className="text-2xl font-bold text-slate-700">
                    {post.title}
                  </h1>
                )}
                {updateMode && (
                  <input
                    className="w-full h-12 text-2xl font-bold px-2 text-slate-700 focus:outline-none rounded-lg"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                )}
              </div>
              {/* <div className="flex justify-center py-5">
              <img
                className=""
                src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div> */}
              <div className="py-5">
                {!updateMode && (
                  <p className="first-letter:capitalize first-letter:text-3xl first-letter:font-serif first-letter:font-semibold text-slate-600" dangerouslySetInnerHTML={{
                    __html: post.desc,
                  }}/>
                )}
                {updateMode && (
                  <Editor className="bg-white" setContent={setDecs} content={desc} />
                )}
              </div>
              {updateMode && (
                <button
                  className="my-5 text-center w-full py-2 border rounded-lg border-green-600 text-green-600 hover:text-white hover:bg-green-600"
                  onClick={handleUpdateBlog}
                >
                  Update Post
                </button>
              )}
              <div className="flex gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <Comment id={post._id} post={post} getPost={getPost} />
        </div>
      )}
    </>
  );
}
