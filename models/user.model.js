const mongoose=require("mongoose")
const bcrypt = require('bcrypt');
const {isEmail}=require('validator')

const UserSchema = new mongoose.Schema( 
  {
    name: {type: String,required:[true,"first name is required"], minlength: [2, "{PATH} must be at least 2 chars long"]},
    alias:{type:String,required:[true,"last name is required "], minlength: [2, "{PATH} must be at least 2 chars long"]},
    email: { type: String, required: [true, "Email is required"], minlength: [3, "L'{PATH} doit comporter au moins 3 caractères"],unique:[true,"Email already exist"],validate:[isEmail,"please enter a valid email"]},
    password:{type:String,required:[true,"password is required"], minlength: [8, "{PATH} must be at least 8 chars long"]}
    
  },{timestamps:true}
)


UserSchema.virtual('cpassword')
  .get( () => this._cpassword )
  .set( value => this._cpassword = value );

  UserSchema.pre('validate', function(next) {
    if (this.password !== this.cpassword) {
      this.invalidate('cpassword', 'Password MUST MATCH confirmPassword');
    }
    next();
  });

  UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });
  
  


module.exports=mongoose.model("User",UserSchema)