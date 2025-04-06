const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Messages = require('../models/Messages');
const {body, validationResult} = require('express-validator');
router.get('/fetchallmessages', fetchuser, async(req, res) => {
    try{
        const messages = await Messages.find();
        res.json(messages);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.post('/addmessage', fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('message', 'Message must be atleast 5 characters in size').isLength({min: 5})
], async (req, res) => {
    try{
        const {title, message} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const msg = new Messages({
            title, message, user: req.user.id
        })
        const savedMessage = await msg.save();
        res.json(savedMessage);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.put('/updatemessage/:id', fetchuser, async(req, res) => {
    const {title, message} = req.body;
    try{
        const newMessage = {};
        if(title){
            newMessage.title = title;
        }
        if(message){
            newMessage.message = message;
        }
        let msg = await Messages.findById(req.params.id);
        if(!msg){
            return res.status(404).send("Not found");
        }
        if(msg.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied");
        }
        msg = await Messages.findByIdAndUpdate(req.params.id, {$set: newMessage}, {new: true});
        res.json({msg});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.delete('/deletemessage/:id', fetchuser, async(req, res) => {
    try{
        let message = await Messages.findById(req.params.id);
        if(!message){
            return res.status(404).send("Message not found");
        }
        if(message.user.toString() !== req.user.id){
            return res.status(401).send("Unauthorized Access");
        }
        message = await Messages.findByIdAndDelete(req.params.id);
        res.json({"Success": "Message has been deleted"});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.put('/like/:id', fetchuser, async(req, res) => {
    const {title, message} = req.body;
    try{
        let msg = await Messages.findById(req.params.id);
        if(!msg){
            return res.status(404).send("Message not found");
        }
        var cnt = msg.likes;
        cnt += 1;
        const newMsg = {};
        newMsg.title = title;
        newMsg.message = message;
        newMsg.likes = cnt;
        msg = await Messages.findByIdAndUpdate(req.params.id, {$set: newMsg}, {new: true});
        res.json(msg);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.put('/dislike/:id', fetchuser, async(req, res) => {
    const {title, message} = req.body;
    try{
        let msg = await Messages.findById(req.params.id);
        if(!msg){
            return res.status(404).send("Message not found");
        }
        var cnt = msg.dislikes;
        cnt += 1;
        const newMsg = {};
        newMsg.title = title;
        newMsg.message = message;
        newMsg.dislikes = cnt;
        msg = await Messages.findByIdAndUpdate(req.params.id, {$set: newMsg}, {new: true});
        res.json(msg);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;