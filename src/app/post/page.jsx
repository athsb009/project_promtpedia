'use client'
import {useState,useEffect} from 'react'
import {useSearchParams} from "next/navigation"
import Comments from '@/components/Comments';
import CommentFeed from '@/components/CommentFeed';
import Like from "@/components/Like"
const page = () => {
  const [copied, setCopied] = useState("");
const [post, setPost] = useState({ prompt: "", tag: "", })

const searchParams = useSearchParams();
const promptId = searchParams.get("id");

useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      console.log(data)
      setPost({
        _id:data._id,
        title:data.title,
        desc:data.desc,
        name:data.creator.username,
        email:data.creator.email,
        prompt: data.prompt,
        tag: data.tag,
        creatorimage:data.creator.image,
        likes:data.likes
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <div className="ml-4 mt-4 flex space-x-6">
  {/* Comments */}
  <div className="w-1/3 bg-white p-4 rounded-lg">
    <Comments/>
    <CommentFeed/>
  </div>

  {/* Post */}
  <div className="w-1/3 bg-white rounded-lg shadow-lg p-6">
    <div className="flex items-center mb-4">
    <img
          src={post.creatorimage}
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain mr-3"
        />
        <div className=' flex justify-between'>
        <div className="flex flex-col">
          
          <h3 className="font-bold text-gray-900">{post.name}</h3>
          <p className="text-sm text-gray-500">{post.email}</p>
        </div>
        <div className="  " onClick={handleCopy}>
          <img
            src={
              copied === post.prompt
                ? "./assets/icons/tick.svg"
                : "./assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={20}
            height={20}
          />
        </div>
        </div>
    </div>

    {/* Title */}
    <p className="font-bold text-gray-900 mb-2">Title:</p>
    <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>

    {/* Description */}
    <p className="font-bold text-gray-900 mb-2">Description:</p>
    <p className="text-gray-700 mb-4">{post.desc}</p>

    {/* Main Prompt */}
    <div className="bg-gray-100 rounded-lg p-6 mb-4">
      <p className="font-bold text-gray-900 mb-2">Main Prompt:</p>
      <p className="text-gray-700">{post.prompt}</p>
    </div>

    {/* Tag */}
    <div className="text-sm bg-slate-900 text-white py-1 px-3 rounded-lg inline-block">
      {post.tag}
    </div>
  </div>
  <Like
    prompt={post}
    
  />
</div>

    
  )
}

export default page