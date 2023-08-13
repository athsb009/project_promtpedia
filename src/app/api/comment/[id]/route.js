import commentModel from "@/models/comment";
import { connectDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectDB();

        const comment = await commentModel.findById(params.id).populate("author");
        if (!comment) {
            
            return new Response(JSON.stringify({ error: "Comment Not Found" }), { status: 404 });
        }

        return new Response(JSON.stringify(comment), { status: 200 });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};
