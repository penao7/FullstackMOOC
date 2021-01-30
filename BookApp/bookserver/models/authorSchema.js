import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'author field cannot be empty'],
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
    minlength: 4
  }
});

export default mongoose.model('Author', schema);