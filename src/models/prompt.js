
import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title:{
    type: String,
    required: [true, 'Prompt is required.'],
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
  desc:{
    type: String,
    required: [true, 'Tag is required.'],
  },
  likedBy: [{
    type: String,
  }],
  likes: {
    type: Number,
    default: 0,
  },
  }
);

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;