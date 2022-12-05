import mongoose, { trusted } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, unique:true, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  location: String
})

userSchema.pre("save", async function () {
  console.log(this.password)
  this.password = await bcrypt.hash(this.password, 5)
  console.log(this.password)
})

const User = mongoose.model("User", userSchema)
export default User; 