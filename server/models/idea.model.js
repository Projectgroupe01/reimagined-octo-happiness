const mongoose=require("mongoose")

const IdeaSchema = new mongoose.Schema(   
    {
        
        description:{type:String,required:[true,"description is required "], minlength: [5, "{PATH} must be at least 5 chars long"]},
        like:{type:Number},
        addedBy:{type:String},
        favoritedBy:{type:Array}
        
        
        
    },{timestamps:true} 

)

module.exports = mongoose.model("Idea",IdeaSchema) 
