import mongoose, { Schema } from 'mongoose';
import cuid from 'cuid';

const todoSchema = new Schema({
  cuid: {type: String, default: cuid, required: true},
  title: {type: String, required: true},
  creationTime: { type: Date, default: Date.now, required: true},
  completed: {type: Boolean, default: false, required: true}
});

export default mongoose.model('Todo', todoSchema);
