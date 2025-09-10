const { google }=require('googleapis');
const User=require('../models/User');
const Event=require('../models/Event');

exports.createMeet=async (req,res)=>{
  try{
    const userId=req.session?.userId;
    if(!userId) return res.status(401).json({ message:'Unauthorized' });
    const user=await User.findById(userId);
    if(!user) return res.status(401).json({ message:'Unauthorized' });

    const oauth2Client=new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    oauth2Client.setCredentials({
      access_token: user.tokens.access_token,
      refresh_token: user.tokens.refresh_token,
      expiry_date: user.tokens.expiry_date
    });

    const calendar=google.calendar({ version:'v3', auth: oauth2Client });

    const { summary, description, start, end, attendees=[] }=req.body;
    const requestBody={
      summary,
      description,
      start: { dateTime: start },
      end: { dateTime: end },
      attendees: attendees.map(email=>({ email })),
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}-${Math.random()}`,
          conferenceSolutionKey: { type:'hangoutsMeet' }
        }
      }
    };

    const { data:event }=await calendar.events.insert({
      calendarId:'primary',
      conferenceDataVersion:1,
      requestBody
    });

    // Persist event to DB
    const saved=await Event.create({
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      googleEventId: event.id,
      summary,
      description,
      start: new Date(start),
      end: new Date(end),
      hangoutLink: event.hangoutLink,
      attendees: attendees.map(email=>({ email }))
    });

    return res.json({ eventId:event.id, meetLink:event.hangoutLink, conference:event.conferenceData, savedId: saved._id });
  }catch(err){
    console.error(err);
    return res.status(500).json({ message:'Failed to create meet' });
  }
};

exports.listMyMeets=async (req,res)=>{
  try{
    const userId=req.session?.userId;
    if(!userId) return res.status(401).json({ message:'Unauthorized' });
    const items=await Event.find({ userId }).sort({ createdAt:-1 });
    return res.json(items);
  }catch(err){
    console.error(err);
    return res.status(500).json({ message:'Failed to fetch meetings' });
  }
};


