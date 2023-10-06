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

//Todo schema
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },

    //Reference to the User who owns this todo
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

//User and Todo models
const User = mongoose.model('User', userSchema)
const Todo = mongoose.model('Todo', todoSchema)

export {User, Todo}
