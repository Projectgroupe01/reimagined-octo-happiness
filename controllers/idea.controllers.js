const Idea =require("../models/idea.model")

//CRUD


//READ ALL
module.exports.findAllIdea=(req,res)=>
{
    Idea.find({})
    .then(allIdeas=>
        {
            console.log(allIdeas)
            res.json(allIdeas)
        })
    .catch(err=>
        {
            res.json({message:'wait a minute😒😒',error:err})
        })

}
//CREATE
module.exports.createNewIdea = (req,res) =>
{
    Idea.create(req.body)
        .then(idea=>
            {
                console.log(idea)
                res.status(200).json({idea})
            })
        .catch(err=>
            {
                res.status(400).json({message:'wait a minute😶😶',error:err})
            })
}

// //FIND ONE
module.exports.findIdea = (req,res) =>
{
   Idea.findOne({_id:req.params.pid})
        .then(theIdea=>
            {
                console.log(theIdea)
                res.json({theIdea})
            })
        .catch(err=>
            {
                res.json({message:'wait a minute😶😶',error:err})
            })
}

// //UPDATE
module.exports.updateNewIdea = (req,res) =>
{
    Idea.findOneAndUpdate(
    {_id:req.params.pid},
    req.body,
    {new:true,runValidators:true})
        .then(updatedIdea=>
            {
                console.log(updatedIdea)
                res.json({updatedIdea})
            })
        .catch(err=>
            {
                res.json({message:'wait a minute😶😶',error:err})
            })
}
//DELETE
module.exports.deleteIdea= (req, res) => 
{
    BoIdeaok.deleteOne({ _id: req.params.pid })
        .then((deletedId) => res.json({deletedId}))
        .catch((err) => console.log(err));
}

