const express = require('express');
const app = express();
const fetch = require('node-fetch');
const https = require('https');

const Video = require('../models/video');

const giphyApikey = 'I2KENcVhowMf11pBaABXlHTNVQwmIWjS';



module.exports = (app) => {

  //ROOT INDEX (Should display most recent)
  app.get('/', (req, res) => {

    Video.find({}).sort({createdAt: 'desc'}).exec(function(err, videos){
      if(err) throw err;
      console.log(videos);
      res.render('root.handlebars', {videos : videos});
    });

  });







  //SHOW VIDEO Page
  app.get('/hype/:id', (req, res) => {

        // console.log(gifs);
        Video.findById(req.params.id, (err, video) => {
          if(video){
            res.render('video-page.handlebars', {video : video});
          } else {
            res.render('video-page-no-video.handlebars');
          }
        });
      });




  //post video link
  app.post('/hype/video', (req, res,) => {
    Video.findOne({url : req.body.url}).then((video) => {
      if(video){
        res.send({err : "Video Already Exists"});
      }else{
        Video.create({
          url : req.body.url,
          thumbnail : req.body.thumbnail,
          createdAt : Date.now().toUTCString()
        }).then((video) => {
          video.save(function(err, video){
            res.send({webUrl : "http://hypecam.io/hype/" + video._id});
          });
        }).catch((err) => {
          console.log(err.message);
        })
      }
    })

  })

}//modules.exports
