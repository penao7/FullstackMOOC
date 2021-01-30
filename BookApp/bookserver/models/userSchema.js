import mongoose from 'mongoose';

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'minimium length for username is 3 characters']
  },
  favoriteGenre: {
    type: String,
    minlength: 4
  }

});

export default mongoose.model('User', schema);