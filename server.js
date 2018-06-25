'use strict';

var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser')

// require and use "multer"...
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// end point for file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({filename: req.file.originalname, size: req.file.size})
})


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
