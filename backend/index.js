const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const connectDB=require('./config/db');
const session=require('cookie-session');

dotenv.config();
const authRoutes=require('./routes/auth.routes');
const meetRoutes=require('./routes/meet.routes');
const app=express();
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(session({ name:'sess', secret: process.env.SESSION_SECRET || 'change-me', httpOnly: true }));

const PORT=process.env.SERVER_PORT || 4000;

app.get('/',(req,res)=>{
    res.send("this is a google meet using the google calendar");
});



app.use('/auth',authRoutes);
app.use('/api',meetRoutes);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on PORT : ${PORT}`);
    });
})

