const { google }=require('googleapis');
const User=require('../models/User');

const oauth2Client=new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const scopes=['https://www.googleapis.com/auth/calendar.events','email','profile'];

exports.startGoogleAuth=(req,res)=>{
  if(!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REDIRECT_URI){
    return res.status(500).json({ message:'Server misconfigured: missing Google OAuth env vars' });
  }
  const url=oauth2Client.generateAuthUrl({ access_type:'offline', prompt:'consent', scope:scopes });
  return res.redirect(url);
};

exports.googleCallback=async (req,res)=>{
  try{
    const { code }=req.query;
    const { tokens }=await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2=google.oauth2({ auth: oauth2Client, version:'v2' });
    const { data: profile }=await oauth2.userinfo.get();

    let user=await User.findOne({ googleId: profile.id });
    if(!user){
      user=new User({
        googleId: profile.id,
        email: profile.email,
        name: profile.name,
        picture: profile.picture,
        tokens: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expiry_date: tokens.expiry_date
        }
      });
    }else{
      user.tokens.access_token=tokens.access_token || user.tokens.access_token;
      user.tokens.refresh_token=tokens.refresh_token || user.tokens.refresh_token;
      user.tokens.expiry_date=tokens.expiry_date || user.tokens.expiry_date;
    }
    await user.save();

    req.session.userId=user._id.toString();
    const redirectUrl=process.env.CLIENT_ORIGIN || 'http://localhost:4000/success';
    return res.redirect(redirectUrl);
  }catch(err){
    console.error(err);
    return res.status(500).json({ message:'Auth failed' });
  }
};

exports.logout=(req,res)=>{
  req.session=null;
  return res.json({ success:true });
};

exports.me=async (req,res)=>{
  if(!req.session?.userId) return res.status(401).json({ message:'Unauthorized' });
  const user=await User.findById(req.session.userId).select('-tokens');
  return res.json(user);
};


