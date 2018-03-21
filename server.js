
const express = require('express')
const app = express()

app.use(express.static('public'))


app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})


app.get("/:time", (req, res) => {
  res.set('Content-Type', "application/json"); 
  var date_obj = {"unix": null, "natural": null};
  var time_int = Number.parseInt(req.params.time);
  var time_date = new Date(req.params.time);
  var unix_date;
  var natural_date;
  
  if(time_int) {
    unix_date = time_int;
    natural_date = new Date(time_int * 1000);
    natural_date = natural_date.toDateString();
  }
  else if(time_date != "Invalid Date"){
    natural_date = time_date.toDateString();
    unix_date = Date.parse(natural_date) / 1000;
  }
  
  if(unix_date) date_obj.unix = unix_date;
  if(natural_date) date_obj.natural = natural_date;
  
  res.send(JSON.stringify(date_obj));  
})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
