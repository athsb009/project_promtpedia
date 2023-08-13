'use client'

import React from 'react'
import Profile from '@/components/Profile'
import { useState,useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const page = () => {
  const {data:session}=useSession();
  const [post, setPost] = useState([])
  const router=useRouter();
  

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
  
      setPost(data);
      console.log('success')
    };
    fetchPosts();
  }, []);

  const handleEdit=(post)=>{
    router.push(`/update-promt?id=${post._id}`)
  }
  const handleDelete=async(post)=>{
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
    if(hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method:'DELETE'
        });

        const filterdPosts=post.filter((p)=>{
          p._id !==post._id
        })

        setPost(filterdPosts)

      } catch (error) {
        console.log(error)
      }
      router.push('/');
    }
  }

  return (
    <div>
    <div className='flex justify-center mt-12'>
    <img
      src={session?.user.image}
      alt="img"
      width={40}
      height={40}
      className="rounded-full object-contain mr-3"
    />
      <div className="flex flex-col text-left">
            <h3 className="font-bold text-gray-900">{session?.user.name}</h3>
            <p className="text-xs text-gray-500">{session?.user.email}</p>
          </div>
     
      
      
    </div>
        <Profile 
          name={session?.user.name}
          data={post}
          desc="Welcome to Your own Personalized Profile"
          handleEdit={handleEdit}
          handleDelete={handleDelete}

        />
    </div>
  )
}

export default page