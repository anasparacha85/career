const mongoose=require('mongoose')
const TestSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    passingScore:{
        type:Number,
        required:true
    },
    questions:[{type:mongoose.Schema.Types.ObjectId,ref:"Question"}]

},{timestamps:true})

const Test=new mongoose.model("Test",TestSchema)
module.exports=Test