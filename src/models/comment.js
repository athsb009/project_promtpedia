import { Schema, model, models } from 'mongoose';

const commentSchema = new Schema({
    comment: [
        {
          text: {
            type: String,
            required: true, 
          },
        }
      ],
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      postId:{
        type:String
      }
})

const commentModel = models.commentModel || model('commentModel', commentSchema);
export default commentModel;