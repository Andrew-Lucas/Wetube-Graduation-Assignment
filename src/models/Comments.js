import mongoose, { Schema, trusted } from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {type: String, required: true},
  owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
  parentVideo: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video"},
  dateCreated: {type: Date, required: true, default: Date.now}
})

const Comment = mongoose.model("Comment", commentSchema)

export default Comment; 