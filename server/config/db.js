const mongoose=require('mongoose')
require('dotenv').config()
const url=process.env.MONGO_DB_URL
const connectdb=async()=>{

    try {
        await mongoose.connect(url)
        console.log('database connected successfully');
        
    } catch (error) {
        console.log(error);
        
        console.error('failed to connect with db');
        
        
    }
}
module.exports=connectdb