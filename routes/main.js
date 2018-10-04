/* Main routes */

const router = require('express').Router();

router.get('/', function(req, res){
  res.render('primary/home');
});

router.get('/home', function(req, res){
  res.render('primary/home');
});

router.get('/getappointment', function(req,res){
  res.render('secondary/getappointment');
})

router.get('/success', function(req,res){
  res.render('secondary/success');
})

router.get('/about', function(req, res){
  res.render('primary/about');
});

router.get('/service', function(req, res){
  res.render('secondary/services');
});

router.get('/cardio', function(req, res){
  res.render('secondary/cardioservice');
});

router.get('/paed', function(req, res){
  res.render('secondary/paediatric');
});

router.get('/dent', function(req, res){
  res.render('secondary/dentistry');
});

router.get('/physio', function(req, res){
  res.render('secondary/physiology');
});

router.get('/radio', function(req, res){
  res.render('secondary/radiology');
});

router.get('/about', function(req, res){
  res.render('secondary/about');
});

router.get('/personal', function(req, res){
  res.render('secondary/personal-appoint');
});

module.exports = router;
