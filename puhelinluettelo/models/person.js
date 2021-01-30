import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import dotenv from 'dotenv';
dotenv.config();

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

mongoose.set('useFindAndModify', false);

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

personSchema.plugin(uniqueValidator);

export default mongoose.model('Person', personSchema);