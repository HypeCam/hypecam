const express = require('express');
const app = express();




module.exports = (app) => {

  //ROOT INDEX (Should display most recent)
  app.get('/', (req, res) => {
    res.render('root.handlebars');
  })

  //SHOW VIDEO Page
  app.get('/hype/video', (req, res) => {
    res.render('video-page.handlebars')
  })


}//modules.exports
