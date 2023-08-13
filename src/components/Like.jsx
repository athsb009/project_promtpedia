"use client"

import { useState,React,useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Like = ({ prompt }) => {
  const { data: session } = useSession();
  const [liked, setLiked] = useState([]);
  const [likes,setLikes]=useState();
  const [clicked,setClicked]=useState(false);

  const handleLike = async () => { 
    try {
      
      if (!liked) {
        const response = await fetch(`/api/prompt/${prompt._id}/like`, {
          method: 'PUT',
          body: JSON.stringify({
            liked: session?.user.id
          }),
        });
  
        if (response.status === 200) {
          const data = await response.json();
          setLikes(data);
          setLiked(true);
        } else {
          console.error('Failed to like/unlike prompt');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    
    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/prompt/${prompt._id}/like`);
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          setLikes(data.length)
          setLiked(data.includes(session?.user.id))
        } 
      } catch (error) {
        console.error(error);
      }
    }; 
    fetchLikes();
  }, [prompt._id,handleLike]);
  return (
    <div className="w-1/4 mx-auto my-12">
     <button
        onClick={handleLike}
        className={`text-xl ml-8 font-extrabold px-6 py-3 ${
          !clicked && !liked? 'bg-black text-white':'bg-white text-black'  
        } rounded-full shadow-lg flex justify-between items-center w-full`}
      >
      <div className="flex ml-40 items-center">
        {!clicked && !liked? (
          <span >Upvote</span>
        ) : (
          <span>Voted:</span>
        )}
        <span className="text-xl ml-2">{likes}</span>
      </div>
  
      <img
        src="/arrow-icon.png" // Replace with the actual path to your arrow image
        alt="Arrow Icon"
        className="w-12 h-6"
      />
    </button>
  </div>
  
  );
};
export default Like; 