import mongoose from 'mongoose';
import colors from 'colors'


const connectDb=async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("databse connect suceefulyy".bgBlue.white)
        
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;