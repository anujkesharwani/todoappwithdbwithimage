const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const todoTask= new Schema({
   
        taskimage:String,
        tasktext:String,

})

const Todo= mongoose.model("TodowithImage",todoTask)
module.exports=Todo