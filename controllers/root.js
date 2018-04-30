const express = require('express');
const app = express();
const fetch = require('node-fetch');
const https = require('https');

const Video = require('../models/video');

const giphyApikey = 'I2KENcVhowMf11pBaABXlHTNVQwmIWjS';


module.exports = (app) => {

  //ROOT INDEX (Should display most recent)
  app.get('/', (req, res) => {
    const httpOptions = {
      hostname : 'api.giphy.com',
      path : '/v1/gifs/trending',
      headers : {
        api_key : giphyApikey,
        limit : 9
      },
    }

    https.get(httpOptions, (resp) => {
      resp.setEncoding("utf8");
      let gifs = "";
      resp.on("data", data => {
          gifs += data;
      });
      resp.on("end", () => {
        gifs = JSON.parse(gifs).data.slice(0,6);
        // console.log(gifs);
            res.render('root.handlebars', {gifs : gifs });
        });
      });
    });







  //SHOW VIDEO Page
  app.get('/hype/:id', (req, res) => {
    const httpOptions = {
      hostname : 'api.giphy.com',
      path : '/v1/gifs/trending',
      headers : {
        api_key : giphyApikey,
        limit : 9
      },
    }

    https.get(httpOptions, (resp) => {
      resp.setEncoding("utf8");
      let gifs = "";
      resp.on("data", data => {
          gifs += data;
      });
      resp.on("end", () => {
        gifs = JSON.parse(gifs).data.slice(0,6);
        // console.log(gifs);
        Video.findById(req.params.id, (err, video) => {
          if(video){
            res.render('video-page.handlebars', {video : video, gifs : gifs });
          } else {
            res.render('video-page-no-video.handlebars', {gifs : gifs});
          }
        });
      });
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
          thumbnail : req.body.thumbnail
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
