import mongoose, { trusted } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  avatarURL: String,
  username: {type: String, unique:true, required: true, trim: true},
  email: {type: String, required: true, trim: true, unique: false},
  password: String,
  githubLogin: {type: Boolean, default: false},
  githubID: {type: String, default: ""},
  location: {type: String, trim: true},
  userVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
})

userSchema.pre("save", async function () {
  if(this.isModified("password"))
  this.password = await bcrypt.hash(this.password, 5)
})

const User = mongoose.model("User", userSchema)
export default User; 