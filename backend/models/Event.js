const mongoose=require('mongoose');

const attendeeSchema=new mongoose.Schema({
  email: { type:String, required:true }
},{ _id:false });

const eventSchema=new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', index:true, required:true },
  userName: { type:String },
  userEmail: { type:String },
  googleEventId: { type:String, index:true },
  summary: { type:String, required:true },
  description: { type:String },
  start: { type:Date, required:true },
  end: { type:Date, required:true },
  hangoutLink: { type:String, index:true },
  attendees: [attendeeSchema]
},{ timestamps:true });

module.exports=mongoose.model('Event', eventSchema);


