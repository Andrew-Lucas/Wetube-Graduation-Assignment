import mongoose, { trusted } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  username: {type: String, unique:true, required: true, trim: true},
  email: {type: String, required: true, unique: true, trim: true},
  password: {type: String, required: true},
  location: {type: String, trim: true}
})

userSchema.pre("save", async function () {
  console.log(this.password)
  this.password = await bcrypt.hash(this.password, 5)
  console.log(this.password)
})

const User = mongoose.model("User", userSchema)
export default User; 