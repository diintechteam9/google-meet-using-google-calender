const express=require('express');
const { startGoogleAuth, googleCallback, logout, me }=require('../controllers/auth.controller');

const router=express.Router();

router.get('/google', startGoogleAuth);
router.get('/google/callback', googleCallback);
router.post('/logout', logout);
router.get('/me', me);

module.exports=router;


