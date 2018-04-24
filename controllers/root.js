const express = require('express');
const app = express();

const Video = require('../models/video');




module.exports = (app) => {

  //ROOT INDEX (Should display most recent)
  app.get('/', (req, res) => {
    res.render('root.handlebars');
  })

  //SHOW VIDEO Page
  app.get('/hype/:video', (req, res) => {
    res.render('video-page.handlebars')
  })

  app.post('/hype/:video', (req, res,) => {
    const videoData = {url = req.params.video}

     Video.create(videoData).then((videos) => {
       Video.save();
       res.redirect('back')
     }).catch((err) => {
       console.log(err.message);
     })

  })

}//modules.exports
