const mongoose=require("mongoose")

const IdeaSchema = new mongoose.Schema(   
    {
        
        description:{type:String,required:[true,"description is required "], minlength: [5, "{PATH} must be at least 5 chars long"]},
        like:{type:Number}
        
        
        
    },{timestamps:true} 

)

module.exports = mongoose.model("Idea",IdeaSchema) 
