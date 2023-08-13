"use client"
import  { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams,useRouter } from 'next/navigation';

const CommentForm = () => {
  const { data: session } = useSession();
  const router=useRouter()
  const [text, setText] = useState('');
  const[submitting,setSubmitting]=useState(false)
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    if(text!=""){
      try {
        const response = await fetch('/api/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: session?.user.id, text, postId: promptId }),
        });
  
        if (response.status === 201) {
          console.log('Comment success');
          setText("")
          setSubmitting(false)
          router.reload();
        } else {
          setSubmitting(false)
          console.error('Failed to post comment');
        }
      } catch (error) {
        setSubmitting(false)
        console.error('Error:', error);
      }
    }
    else{
      setSubmitting(false)
      alert("Please enter some content")
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 bg-white">
      <div className="mb-4">
        <textarea
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-black"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
        />
      </div>
      <div className="text-right">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          
        >
         {submitting ? "Commenting...": "Comment"} 
         
         
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
