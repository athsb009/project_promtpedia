import React, { useState, useEffect } from 'react';

const Fields = ({handleTagClick}) => {
  const tags = [
    "📚Academics", "🤖AI", "🎞️Animation", "📚Books", "🎯Branding",
    "💬Chatbot", "🎨Design", "💻Development", "🔮Fantasy", "🍽️Food",
    "💪Health & Wellness", "🎵Music", "🔥Marketing", "📚Research",
    "🧪Science", "🔍SEO", "📈Trading", "🎬Video", "✍️Writing"
  ];



  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tagName, index) => (
          <button
            key={index}
            onClick={() => handleTagClick(tagName)}
            className='bg-black text-white rounded px-2 py-1 text-sm'
          >
            {tagName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Fields;
