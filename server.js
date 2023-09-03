const express = require ("express") 
const cors =require ("cors")
const app= express() 
const PORT = 5000
const cookieParser = require('cookie-parser');



//--Middleware
app.use(cookieParser());
app.use(express.json(),express.urlencoded({extended:true})) 
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))


require('dotenv').config();



require("./Config/mongoose.config")

require("./routes/idea.routes")(app)
require("./routes/user.routes")(app)






app.listen(PORT,()=>
{
    console.log(` >>>>>💕✅ SERVER IS RUNNING ON PORT ${PORT}`)

})