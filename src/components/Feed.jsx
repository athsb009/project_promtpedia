"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import Fields from "./Fields";

const PromptCardList = ({ data, handleTagClick }) => {
 
  return (
    <div className='w-1/2 mt-2 space-y-6   flex flex-col '>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); 
    const filteredPrompts = allPosts.filter(
      (item) =>
        regex.test(item.creator.name) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );

    console.log('Filtered prompts:', filteredPrompts);
    return filteredPrompts;
  };
  const handleTagClick = (tagName) => {
    console.log('handleTag called with tag:', tagName);
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    console.log('searchResult:', searchResult);
    setSearchedResults(searchResult);
  };
  const handleTagLinkClick = (tag) => {
    console.log('handleTagLinkClick called with tag:', tag);
    setSearchText(tag);
    const searchResult = filterPrompts(tag);
    console.log('searchResult:', searchResult);
    setSearchedResults(searchResult);
  };
  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className='mt-8 mx-auto w-full flex justify-center items-center flex-col gap-2'>
  <form className='relative w-1/2 flex-center align-middle '>
    <input
      type='text'
      placeholder='Search for a tag or a username'
      value={searchText}
      onChange={handleSearchChange}
      required
      className='block text-center text-gray-500 w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0 peer'
    />
  </form>
  <div className='w-full p-4 flex justify-center'>
        <div className='h-12'>
          <Fields handleTagClick={handleTagClick} />
        </div>
      </div>
  <div className='flex w-full'>
        <div className='w-4/6 flex justify-end'>
          {searchText ? (
            <PromptCardList
              data={searchedResults}
              handleTagClick={handleTagClick}
            />
          ) : (
            <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
          )}
        </div>
      </div>

   
  
</section>

    
  );
};

export default Feed;
