import React from 'react'
import PromptCard from './PromptCard';
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='mt-8 mx-auto w-full flex justify-center items-center flex-col gap-2'>
    
      <h1 className='mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-left'>
        <span className='text-black'>{name} Profile</span>
      </h1>
      <p className='desc text-left mt-5'>{desc}</p>

      <div className='flex w-4/6 mt-8 flex-col'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile