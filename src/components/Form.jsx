import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full h-screen flex items-center  flex-col'>
      <h1 className='mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-left'>
        <span className='text-black '>{type} Post</span>
      </h1>
      <p className='desc text-gray-500 max-w-md '>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5'
      >
      <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Title
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            type='text'
            placeholder='Title'
            required
            className='w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Prompt Desc
          </span>

          <textarea
            value={post.desc}
            onChange={(e) => setPost({ ...post, desc: e.target.value })}
            placeholder='Write Desc Here'
            
            className='w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0 '
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your post here'
            required
            className='w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0 '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Field of Prompt{" "}
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <select
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            className='w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0 border border-gray-300'
          >
            <option value="">Select a tag</option>
            <option value="📚Academics">📚Academics</option>
            <option value="🤖AI">🤖AI</option>
            <option value="🎞️Animation">🎞️Animation</option>
            <option value="📚Books">📚Books</option>
            <option value="🎯Branding">🎯Branding</option>
            <option value="💬Chatbot">💬Chatbot</option>
            <option value="🎨Design">🎨Design</option>
            <option value="💻Development">💻Development</option>
            <option value="🔮Fantasy">🔮Fantasy</option>
            <option value="🍽️Food">🍽️Food</option>
            <option value="💪Health & Wellness">💪Health & Wellness</option>
            <option value="🎵Music">🎵Music</option>
            <option value="🔥Marketing">🔥Marketing</option>
            <option value="📚Research">📚Research</option>
            <option value="🧪Science">🧪Science</option>
            <option value="🔍SEO">🔍SEO</option>
            <option value="📈Trading">📈Trading</option>
            <option value="🎬Video">🎬Video</option>
            <option value="✍️Writing">✍️Writing</option>
            

          </select>

        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
  type='submit'
  disabled={submitting}
  className='px-5 py-1.5 text-sm bg-white hover:bg-purple-600 rounded-full  hover:text-white ml-4 text-gray-500'
>
  {submitting ? `${type}ing...` : type}
</button>
        </div>
      </form>
    </section>
  );
};

export default Form;
