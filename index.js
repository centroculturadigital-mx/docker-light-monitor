const express = require("express");
const fs = require("fs");
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static("public"));
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));

const hostname = "127.0.0.1";
const port = 3000;


app.get("/dashboard", (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  let containers  = fs.readdirSync('./logs')
  
  res.render("main", { 
    layout: "index", 
    containers: containers.map(c => c.split('.')[0]),
  });
});

app.get("/dashboard/:container", (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  let logs  = fs.readFileSync('./logs/'+req.params.container+'.log', 'utf8')

  res.render("container", { 
    layout: "index", 
    logs: logs.split('\n').reverse(),
  });
});


app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
