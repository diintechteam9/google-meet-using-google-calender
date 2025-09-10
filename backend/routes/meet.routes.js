const express=require('express');
const { createMeet, listMyMeets }=require('../controllers/meet.controller');
const { requireAuth }=require('../middleware/requireAuth');

const router=express.Router();

router.post('/meet', requireAuth, createMeet);
router.get('/meet', requireAuth, listMyMeets);

module.exports=router;


