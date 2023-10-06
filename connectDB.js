import mongoose from "mongoose";

export default async function connectDatabase(){
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected To MongoDB')
    } catch (error) {
        console.error(error)
    }
}