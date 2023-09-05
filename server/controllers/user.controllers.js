const User =require("../models/user.model")
const jwt = require("jsonwebtoken")

const SECRET = process.env.SECRET_KEY
const bcrypt = require ('bcrypt')



const payload = {
    id: User._id
  };
   
  
const userToken = jwt.sign(payload, SECRET);

//CRUD

module.exports={
    findAllUser:(req,res)=>
{
    User.find({})
    .then(allUsers=>
        {
            console.log(allUsers)
            res.json(allUsers)
        })
    .catch(err=>
        {
            res.json({message:'wait a minute😒😒',error:err})
        })

},
//CREATE
createNewUser : (req,res) =>
{
   User.create(req.body)
        .then(user=>
            {
                console.log(user)
                res.status(200).json({user})
            })
        .catch(err=>
            {
                res.status(400).json({message:'wait a minute😶😶',error:err})
            })
},

// //FIND ONE
findUser : (req,res) =>
{
   User.findOne({_id:req.params.pid})
        .then(theUser=>
            {
                console.log(theUser)
                res.json({theUser})
            })
        .catch(err=>
            {
                res.json({message:'wait a minute😶😶',error:err})
            })
},



////register


register: (req, res) => {
    console.log(req.body)
    User.create(req.body)

      .then(user => {
          const userToken = jwt.sign({
              id: user._id
          }, process.env.SECRET_KEY);
   
          res
              .cookie("usertoken", userToken, {
                  httpOnly: true
              })
              .json({ msg: "success!", user: user });
      })
      .catch(err => res.json(err));
  },




///login
login: async(req, res) => {
    const user = await User.findUser({ email: req.body.email });
     
    if(user === null) {
    // email not found in users collection
    return res.sendStatus(400);
   }
     
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
     
    if(!correctPassword) {
    // password wasn't a match!
    return res.sendStatus(400);
    }
     
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
    id: user._id
    }, process.env.SECRET_KEY);
     
   // note that the response object allows chained calls to cookie and json
    res
    .cookie("usertoken", userToken, {
    httpOnly: true
    })
    .json({ msg: "success!" });
    },


    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
    
    
}

