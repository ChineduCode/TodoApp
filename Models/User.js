import mongoose from "mongoose"

//User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }   
})

//User
const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
