//jshint esversion:6
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended : true}));

app.get('/',function(req,res){
res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req,res){
   var cityName=  req.body.cityName;

   const query = cityName;
   const apiKey = '87c6264cd1917ad7cad0b9bbb97ba0ff';
   const unit = 'metric';
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
   https.get(url, function(response){


   response.on('data',function(data){
     var weatherData = JSON.parse(data);
     var city = weatherData.name;

     var temp = weatherData.main.temp;
     temp = temp.toFixed(1);

     var description = weatherData.weather[0].description;

     var iconId= weatherData.weather[0].icon;
     res.write('<p> the weather is currently '+ description +' in ' + city  + '  </p>');
     res.write('<img src="http://openweathermap.org/img/wn/' +iconId + '@2x.png">');
     res.write('<h1> the  temperature in ' +  city +  '  is  '  + temp +  ' degree celcius <h1>');
     res.send();
   });
   });

});


app.listen(process.env.PORT || 3000,  function(){
  console.log('server is running on port 3000');
});
