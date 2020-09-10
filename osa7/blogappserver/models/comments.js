import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Blog'
  }
});

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default mongoose.model('Comment', commentSchema);