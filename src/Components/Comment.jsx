import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Api_URL } from "../API_URL";

export default function Comment(props) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const commentPostHandler = async (e) => {
    e.preventDefault();
    if (name.length === 0) {
      toast.error("Please enter your name");
    } else if (comment.length === 0) {
      toast.error("Please write your comment");
    } else if (comment.length <= 5) {
      toast.error("Comment must be more than 5 characteristic");
    } else {
      try {
        await axios.put(`${Api_URL}/api/posts/${props.id}/comment`, {
          name,
          comment,
        });
        toast.success("Comment posted");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <div className="flex flex-col justify-center mx-60 mt-16">
      <div className="border-b-2 w-full border-black">
        <h2 className="text-2xl font-bold">COMMENTS</h2>
      </div>
      {props.post?.comments?.map((comment) => (
        <div>
          <div className="flex gap-5 mt-5 border rounded-md p-5">
            <img
              className="rounded-full h-16 w-16"
              src="https://secure.gravatar.com/avatar/705a3a1be6ffea4e348eccc628026c45?s=50&d=mm&r=g"
              alt=""
            />

            <div>
              <div className="flex gap-5">
                <p className="font-bold">{comment.name}</p>
                <p className="text-slate-600">Date and time</p>
              </div>
              <div>
                <p>{comment.comment}</p>
              </div>
            </div>
          </div>
          <hr className="mt-2 border-t border-dotted border-2" />
        </div>
      ))}
      <div className="mt-5 flex flex-col justify-center">
        <h2 className="font-bold text-xl border-b-2 border-slate-800">
          Add a Comment
        </h2>
        <label htmlFor="commentName" className="p-1 mt-2">
          Name:
        </label>
        <input
          id="commentName"
          placeholder="Name"
          className="w-full p-2 border rounded-md border-slate-800 focus:outline-none"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="comment" className="mt-2">
          Comment:
        </label>
        <textarea
          className="border border-black rounded-md p-2 focus:outline-none"
          name=""
          id="comment"
          cols="15"
          rows="7"
          placeholder="Say something"
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-end m-2">
        <button
          onClick={commentPostHandler}
          className="px-5 py-1 border my-2 rounded-md hover:bg-blue-700 hover:text-white w-[100%]"
        >
          Post
        </button>
      </div>
    </div>
  );
}
