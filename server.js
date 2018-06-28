const express  = require('express');
const app      = express();                               
const morgan = require('morgan');            
const bodyParser = require('body-parser');    
const cors = require('cors');
const path = require('path');
 
app.use(morgan('dev'));                                        
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(cors());
 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
app.use(express.static(path.resolve(__dirname, "www")));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/www/index.html'));
});
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});