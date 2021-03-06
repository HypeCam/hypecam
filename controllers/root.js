const express = require('express');
const app = express();
const fetch = require('node-fetch');
const https = require('https');

const Video = require('../models/video');

const giphyApikey = 'I2KENcVhowMf11pBaABXlHTNVQwmIWjS';



module.exports = (app) => {

  //ROOT INDEX (Should display most recent)
  app.get('/', (req, res) => {

    Video.find({}).limit(6).sort({createdAt: 'desc'}).exec(function(err, videos){
      if(err) throw err;
      res.render('index.pug', {videos : videos});
    });

  });


  //ROOT INDEX (Should display most recent)
  app.get('/landing', (req, res) => {

    Video.find({}).limit(6).sort({createdAt: 'desc'}).exec(function(err, videos){
      if(err) throw err;
      res.render('states.pug', {videos : videos});
    });

  });





  //SHOW VIDEO Page
  app.get('/hype/:id', (req, res) => {
        console.log("HERE");
        // console.log(gifs);
        Video.findById(req.params.id, (err, videos) => {
          if(err) throw err;
          if(videos){
            Video.find({}).limit(6).sort({createdAt: 'desc'}).exec(function(err, videos2){
              if(err) throw err;
              res.render('detail.pug', {videos : videos, videos2: videos2});
            });

          } else {
            res.render('detail.pug');
          }
        });
      });




  //post video link
  app.post('/hype/video', (req, res) => {
    Video.findOne({url : req.body.url}).then((video) => {
      if(video){
        res.send({err : "Video Already Exists"});
      }else{
        d = new Date();
        utcTime = d.toUTCString()
        Video.create({
          url : req.body.url,
          thumbnail : req.body.thumbnail,
          createdAt : utcTime
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
