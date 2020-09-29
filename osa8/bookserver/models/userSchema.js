const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String,
    minlength: 4
  }

})

module.exports = mongoose.model('User', schema);