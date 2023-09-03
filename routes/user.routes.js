const UserControllers=require("../controllers/user.controllers")
const {authenticate}= require("../Config/jwt.config")



console.log(UserControllers)

module.exports=(app)=>
{
    
    app.post("/api/register",UserControllers.register)
    app.post("/api/users/login",UserControllers.login)
    app.post("/api/users/logout",UserControllers.logout)

    app.get("/api/users",authenticate,UserControllers.findAllUser)
    app.get("/api/users/:pid",authenticate,UserControllers.findUser)

    
    
    
}

