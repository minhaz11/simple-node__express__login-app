const express = require('express');
const router = express.Router();

const creds = {
    email:'admin@gmail.com',
    password:'admin123'
}

router.post('/login',(req,res)=>{
    if(req.body.email  == creds.email && req.body.password == creds.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
    }
    else{
        res.end("Invalid Username");
    }
});
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
       res.render('dashboard',{user:req.session.user})
    }
    else{
        res.send("Unauthorized Username");
    }
});

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        res.send('error')
        }
        else{
            res.render('base',{title:'Login System'})
        }
    });
});

module.exports = router;