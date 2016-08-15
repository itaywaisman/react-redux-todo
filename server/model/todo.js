import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema({
  title: String,
  creationTime: Date,
  completed: Boolean
});

export default mongoose.model('Todo', todoSchema);
