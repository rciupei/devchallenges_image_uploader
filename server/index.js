const express = require('express')
const cloudinary = require('cloudinary').v2;
const multer = require('multer')()
const cors = require('cors')
require('dotenv').config({ path: './.env.local' });


const app = express()
app.use(cors())


cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
});

app.post('/upload', multer.single('img'), (req, result) => {
      if (req.file) {
            let file = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
            cloudinary.uploader.upload
                  (file, { width: 600, fetch_format: "auto", quality: "auto" }, (err, res) => {
                        if (err) {
                              res.status(500)
                        }
                        result.json(res)
                  })
      }

})

app.listen(5000, 'localhost', () => console.log("Server started"))