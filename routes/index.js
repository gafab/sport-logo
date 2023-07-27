var express = require('express');
var router = express.Router();
const http = require('http');
const https = require('https');
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', {
    title: 'Express'
  });
});


router.get('/download/:tid', (req, res) => {
  const tid = req.params.tid;
  const fileUrl = 'https://sportteamslogo.com/api?key=64f10b2f920f42b6ae1270b302cf2817&size=big&tid=' + tid;

  // Download the file from the URL
  const protocol = fileUrl.startsWith('https') ? https : http;
  protocol.get(fileUrl, (response) => {
    if (response.statusCode !== 200) {
      return res.status(404).send('File not found.');
    }

    // Set the appropriate content type for the response
    res.setHeader('Content-Type', response.headers['content-type']);

    // Pipe the file download stream directly to the response
    response.pipe(res);

    // Handle errors during file download
    response.on('error', (err) => {
      console.error('Error downloading the file:', err);
      res.status(500).send('Error while downloading the file.');
    });
  });
});

module.exports = router;