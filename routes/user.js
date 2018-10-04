const router = require('express').Router();
const User = require('../archetype/user');
const passport = require('passport');
const passportConf = require('../config/passport');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const appoint = require('../archetype/appointment'); 
const doct = require('../archetype/doctor');
var name;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/healthfirst', { useMongoClient: true });

router.get('/login', function(req, res) {
  if (req.user){
      return res.redirect('primary/home');
  }
  res.render('secondary/login', { message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/signup', function(req, res, next) {
  res.render('secondary/signup', {
    errors: req.flash('errors')
  });
});

router.post('/signup', function(req, res, next) {
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  User.findOne({ email: req.body.email }, function(err, existingUser) {

    if (existingUser) {
      req.flash('errors', 'Account with that email address already exists');
      return res.redirect('/signup');
    } else {
      user.save(function(err, user) {
        if (err) {
            return next(err);
        }
        req.logIn(user, function(err) {
          if (err) return next(err);
          res.redirect('primary/home');
        })
      });
    }
  });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/getappointment', function(req, res, next) {
  res.render('secondary/getappointment', {
    errors: req.flash('errors')
  });
});

router.post('/getappointment', function(req,res,next){
  new appoint({
    name: req.body.name,
    address: req.body.address,
    mobile: req.body.mobile,
    problem: req.body.problem,
  }).save(function(err,getappoint){
    if(err)
      res.json(err);
    else
      return res.redirect('/success');
  });
});

router.post('/personal-appoint', function(req,res,next){
  new appoint({
    name: req.body.name,
    address: req.body.address,
    mobile: req.body.mobile,
    problem: req.body.problem,
    category: req.body.category,
    doctor: req.body.doctor,
    workhours: req.body.timeslot
  }).save(function(err,getsplappoint){
    if(err)
      res.json(err);
    else
      return res.redirect('/success');
  });
});

//Display doctors to user for appointment
router.get('/personal-appoint', function(req,res){
  doct.find( {},function(err,data){
    console.log(data);
    displaydoctors(res,data,"Products list from MongoDB:");
  });
});

function displaydoctors(res,data){
  res.render('secondary/personal-appoint.ejs',{doc:data},
    function(err,result){
      if(!err){
        res.send(result);
      }
      else{
        res.send('Oops! An error occured.');
        console.log(err);
      }
    });
}   

router.get('/services', function(req, res, next) {
  res.render('secondary/services.ejs',
  function(err,result){
    if(!err){
      res.send(result);
    }
    else{
      res.send('Oops! An error occured.');
      console.log(err);
    }
  });
});

//Cardio Service
router.get('/cardioservice', function(req,res){
  doct.find({category: "cardiology"}, function(err,data){
    displaycardio(res,data,"Products list from MongoDB:");
  });
});

function displaycardio(res,data){
  res.render('secondary/cardioservice.ejs',{doc:data},
    function(err,result){
      if(!err){
        res.send(result);
      }
      else{
        res.send('Oops! An error occured.');
        console.log(err);
      }
    });
}   

//Paediatrics
router.get('/paediatric', function(req,res){
  doct.find({category: "paediatrics"}, function(err,data){
    displaypaed(res,data,"Products list from MongoDB:");
  });
});

function displaypaed(res,data){
  res.render('secondary/paediatric.ejs',{doc:data},
    function(err,result){
      if(!err){
        res.send(result);
      }
      else{
        res.send('Oops! An error occured.');
        console.log(err);
      }
    });
}

//Dentistry
router.get('/dentistry', function(req,res){
  doct.find({category: "dentistry"}, function(err,data){
    displaydent(res,data,"Products list from MongoDB:");
  });
});

function displaydent(res,data){
  res.render('secondary/dentistry.ejs',{doc:data},
    function(err,result){
      if(!err){
        res.send(result);
      }
      else{
        res.send('Oops! An error occured.');
        console.log(err);
      }
    });
}

//Physiology
router.get('/physiology', function(req,res){
  doct.find({category: "physiology"}, function(err,data){
    displayphysio(res,data,"Products list from MongoDB:");
  });
});

function displayphysio(res,data){
  res.render('secondary/physiology.ejs',{doc:data},
    function(err,result){
      if(!err){
        res.send(result);
      }
      else{
        res.send('Oops! An error occured.');
        console.log(err);
      }
    });
}

//Radiology
router.get('/radiology', function(req,res){
  doct.find({category: "radiology"}, function(err,data){
    displayradio(res,data,"Products list from MongoDB:");
  });
});

function displayradio(res,data){
  res.render('secondary/radiology.ejs',{doc:data},
    function(err,result){
      if(!err){
        res.send(result);
      }
      else{
        res.send('Oops! An error occured.');
        console.log(err);
      }
    });
}

module.exports = router;
