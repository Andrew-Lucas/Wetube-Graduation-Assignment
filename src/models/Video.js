import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoURL: {type: String, required: true},
  title: {type: String, maxlength: 70, trim: true},
  description: {type: String, minlength: 10, trim: true},
  DateCreated: {type: Date, required: true, default: Date.now},
  hashtags: [{type: String, trim: true}],
  meta: {
    views: {type: Number, required: true, default: 0},
    rating: {type: Number, required: true, default: 0},
  },
  owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
})

videoSchema.pre("save", async function () {
  this.hashtags =  this.hashtags[0].split(',').map((word) => (word.startsWith("#") ? word :`#${word}`))
})
 
const Video = mongoose.model("Video", videoSchema)
export default Video; 
