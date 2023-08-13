import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/database";

export const PUT = async (request, { params }) => {
  const { liked } = await request.json();
  
  try {
    await connectDB();

    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response('Prompt Not Found', { status: 404 });
    }

    // Check if the user's ID is already in the likedBy array
    if (!prompt.likedBy.includes(liked)) {
      prompt.likedBy.push(liked);
      prompt.likes += 1;
      await prompt.save();

      console.log(prompt.likedBy.length);
      return new Response(JSON.stringify(prompt.likes), { status: 200 });
    } else {
      console.log('User already liked this prompt');
      return new Response('Already Liked', { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
export const GET = async (request,{params}) => {
    

  try {
      await connectDB();
     const prompts =await Prompt.findById(params.id)
       
      return new Response(JSON.stringify(prompts.likedBy), { status: 200})
  } catch (error) {
      return new Response("Failed", { status: 500 });
  }
}
