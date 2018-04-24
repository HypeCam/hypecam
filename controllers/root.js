const express = require('express');
const app = express();

const Video = require('../models/video');




module.exports = (app) => {

  //ROOT INDEX (Should display most recent)
  app.get('/', (req, res) => {
    res.render('root.handlebars');
  })

  //SHOW VIDEO Page
  app.get('/hype/:id', (req, res) => {
    Video.findById(req.params.id, (err, video) => {
      if(video){
        res.render('video-page.handlebars', video);
      }else{
        res.render('video-page.handlebars');
      }
    });
  })


  //post video link
  app.post('/hype/video', (req, res,) => {

    Video.findOne({url : req.body.url}).then((video) => {
      if(video){
        res.send({err : "Video Already Exists"});
      }else{
        Video.create({url : req.body.url}).then((video) => {
          video.save(function(err, video){
            res.send({webUrl : "/hype/" + video._id});
          });
        }).catch((err) => {
          console.log(err.message);
        })
      }
    })

  })

}//modules.exports
