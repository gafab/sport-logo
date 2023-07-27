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

  // Extract the filename from the URL
  const fileName = tid+'.png';

  // Download the file from the URL
  const protocol = fileUrl.startsWith('https') ? https : http;
  protocol.get(fileUrl, (response) => {
    if (response.statusCode !== 200) {
      return res.status(404).send('File not found.');
    }

    // Save the file to the server
    const fileStream = fs.createWriteStream(fileName);
    response.pipe(fileStream);

    // Handle events when the file is fully written
    fileStream.on('finish', () => {
      fileStream.close(() => {
        // Serve the downloaded file for download
        res.download(fileName, (err) => {
          if (err) {
            res.status(500).send('Error while downloading the file.');
          }

          // Remove the file after download is completed
          fs.unlink(fileName, (err) => {
            if (err) {
              console.error('Error deleting the downloaded file:', err);
            }
          });
        });
      });
    });

    // Handle errors during file download
    fileStream.on('error', (err) => {
      console.error('Error downloading the file:', err);
      res.status(500).send('Error while downloading the file.');
    });
  });
});

module.exports = router;