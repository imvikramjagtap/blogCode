import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Api_URL } from "../API_URL";
import Loader from "../Loader";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPost = async () => {
    try {
      const res = await axios.get(`${Api_URL}/api/posts`);
      if (res.status === 200) {
        setPosts(res.data);
        setLoading(false)

      }
    } catch (error) {
      console.log(error)
    }
    
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="w-[70%] p-5">
      {loading && <Loader />}
      <div className="flex  flex-wrap gap-10">
        {posts
          .slice(0)
          .reverse()
          .map((post) => (
            <div
              className="flex flex-col justify-center rounded-lg border p-2 w-[45%]"
              key={post._id}
            >
              <img
                className="w-[100%] -lg border h-56"
                src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div className="p-3">
                <Link to={`/post/${post._id}`}>
                  <h1 className="text-2xl font-bold">{post.title}</h1>
                </Link>

                <div className="flex justify-between text-slate-500 font-normal text-sm mt-5">
                  <p>Date: {new Date(post.createdAt).toDateString()}</p>
                  <p>Author: {post.username}</p>
                </div>
                <p className="line-clamp-5 mt-3" dangerouslySetInnerHTML={{
                      __html: post.desc,
                    }}/>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
