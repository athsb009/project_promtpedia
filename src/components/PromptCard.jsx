import { useState ,useEffect} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter ,usePathname} from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const pathname=usePathname()
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const postDetails = () => {
    router.push(`/post?id=${post._id}`);
  };
 
  return (
    <div className="w-full mb-4  bg-white rounded-lg shadow-lg p-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex text-xs items-center gap-3 cursor-pointer">
          <img
            src={post.creator.image}
            alt="user_image"
            width={20}
            height={20}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col text-left">
            <h3 className="font-bold text-gray-900">{post.creator.username}</h3>
            <p className="text-xs text-gray-500">{post.creator.email}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
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
            <hr className="w-80 flex mb-2 text-center"/>
      <p
        className="font-bold text-left text-gray-900 text-l cursor-pointer mb-2"
        onClick={postDetails}
      >
        {post.title}
      </p>
      <p className="text-gray-700 text-left text-sm line-clamp-1 mb-2" onClick={postDetails}>
        {post.desc}
      </p>

      <div className="flex justify-between items-center">
  <p
    className="text-sm bg-slate-900 text-white py-1 px-3 rounded-lg inline-block"
    onClick={() => handleTagClick && handleTagClick(post.tag)}
  >
    #{post.tag}
  </p>

  <div className="flex items-center">
    <p className="text-black font-bold mr-2">UPVOTES:</p>
    <div className="rounded-full bg-black text-white text-center w-7 h-7 flex justify-center items-center">
      {post.likes}
    </div>
  </div>
</div>

      {session?.user.id === post.creator._id && pathname==="/profile" &&(
        <div className="mt-4 flex justify-between">
          <p
            className="text-sm cursor-pointer text-black hover:text-white"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="text-sm cursor-pointer text-black hover:text-white"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
