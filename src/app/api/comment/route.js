import commentModel from "@/models/comment";
import { connectDB } from "@/utils/database";

export const POST = async (request) => {
    try {
        const { userId, text, postId } = await request.json();

        await connectDB();
        const newComment = new commentModel({ comment: [{ text }], author: userId, postId });

        await newComment.save();

        return new Response(JSON.stringify(newComment), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new comment", { status: 500 });
    }
}
export const GET=async(request)=> {
    try {
      await connectDB();
  
      const comment = await commentModel.find().populate("author");
      return new Response(JSON.stringify(comment), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
  }