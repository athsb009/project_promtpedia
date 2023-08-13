import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const CommentFeed = () => {
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(5); // Number of initially visible comments
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/comment");
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [promptId]);

  const loadMoreComments = () => {
    setVisibleComments(visibleComments + 5); // Show 5 more comments when this function is called
  };


  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-md mt-8 border-slate-800 overflow-y-scroll max-h-96">
      <h1 className="text-2xl font-bold mb-4 text-black">Comments:</h1>
      <ul className="text-black">
        {comments.map((commentGroup) => {
          if (commentGroup.postId === promptId) {
            return (
              <li key={commentGroup._id} className="mb-4">
                <ul className="pl-4">
                  {commentGroup.comment.slice(0, visibleComments).map((comment) => (
                    <li key={comment._id} className="mb-2  bg-white p-4 rounded-lg shadow-md mt-8">
                    <div className="flex">
                    <img
                    src={commentGroup.author.image}
                    alt="user_image"
                    width={25}
                    height={25}
                    className="rounded-full object-contain"
                    />
                    <div className="ml-2">{commentGroup.author.name}</div>
                    </div>
                  
                      <div className="mt-2">Comment: {comment.text}</div>
                      
                    </li>
                  ))}
                </ul>
              </li>
            );
          }
          return null;
        })}
      </ul>
      {visibleComments < comments.length && (
        <button
          onClick={loadMoreComments}
          className="text-blue-500 hover:underline mt-2"
        >
          Load More Comments
        </button>
      )}
    </div>
  );
};

export default CommentFeed;