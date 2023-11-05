import mongoose from "mongoose"

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
},
{
    timestamps : true
})

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema)

export default Todo
