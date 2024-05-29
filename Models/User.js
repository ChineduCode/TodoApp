import mongoose from "mongoose"

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
},
{
    timestamps : true
})

userSchema.index({ username: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
