const mongoose=require('mongoose');

const tokenSchema=new mongoose.Schema({
  access_token: String,
  refresh_token: String,
  expiry_date: Number
},{ _id:false });

const userSchema=new mongoose.Schema({
  googleId: { type:String, index:true, unique:true },
  email: { type:String, index:true },
  name: String,
  picture: String,
  tokens: tokenSchema
},{ timestamps:true });

module.exports=mongoose.model('User', userSchema);


