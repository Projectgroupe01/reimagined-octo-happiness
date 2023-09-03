const IdeaControllers=require("../controllers/idea.controllers")



console.log(IdeaControllers)

module.exports=(app)=>
{
    app.get("/api/ideas",IdeaControllers.findAllIdea)
    app.post("/api/ideas",IdeaControllers.createNewIdea)
    app.get("/api/ideas/:pid",IdeaControllers.findIdea)
    
    app.delete("/api/ideas/:pid",IdeaControllers.deleteIdea)
}

