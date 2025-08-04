const mongoose=require('mongoose')
const url='mongodb+srv://amiranas761:eKmGsqBdGifD21JR@cluster0.edrnn.mongodb.net/Careerflix?retryWrites=true&w=majority&appName=Cluster0'
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