import mongoose from 'mongoose';

const schema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'required'],
    unique: true,
    minlength: [2, 'minlength 2']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  published: {
    type: Number,
    required: true,
    default: null
  },
  genres: [{
    type: String,
  }]
});

export default mongoose.model('Book', schema);