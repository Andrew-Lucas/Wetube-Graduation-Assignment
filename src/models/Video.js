import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {type: String, maxlength: 70, trim: true},
  description: {type: String, minlength: 10, trim: true},
  DateCreated: {type: Date, required: true, default: Date.now},
  hashtags: [{type: String, trim: true}],
  meta: {
    views: {type: Number, required: true, default: 0},
    rating: {type: Number, required: true, default: 0},
  }
})

videoSchema.pre("save", async function () {
  console.log(this)
  this.hashtags =  this.hashtags[0].split(',').map((word) => (word.startsWith("#") ? word :`#${word}`))
  console.log(this.hashtags)
})
 
const Video = mongoose.model("Video", videoSchema)
export default Video; 

