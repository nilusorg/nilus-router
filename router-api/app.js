var express = require('express');
var app = express();
app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/', function (req, res) {
    res.json(req.body)
});
  
app.listen(3050, function () {
  console.log('app listening on port 3050!');
});