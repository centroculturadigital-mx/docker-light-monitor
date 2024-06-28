import express  from "express";
import { engine }  from 'express-handlebars';
import { formatDistance } from "date-fns";
import fetch from "node-fetch"

const projectsQuery = `
query {
  projects {
    id
    title
  }
}
`
const projectMetrics = `
query ($where: ProjectWhereUniqueInput!) {
  project(where: $where) {
    id 
    title
    metrics {
      cpu
      ram
      createdAt
    }
  }
}
`

import bodyParser  from 'body-parser';
const app = express();

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static("public"));
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));

const hostname = "127.0.0.1";
const port = process.env.PORT || 3003;


app.get("/dashboard", async (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  const resp  = await fetch(process.env.API_URL || 'https://test.centroculturadigital.mx/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: projectsQuery
    })
  })
  
  const projects = await resp.json()
  console.log('projects', projects.data);
  
  res.render("main", { 
    layout: "index", 
    projects: projects.data.projects
  });
});

app.get("/dashboard/:container", async (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  const resp  = await fetch(process.env.API_URL || 'https://test.centroculturadigital.mx/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: projectMetrics,
      variables: {
        where: {
          id: req.params.container
        }
      }
    })
  })
  
  const metrics = await resp.json()

  console.log('metrics', metrics);
  

  res.render("container", { 
    layout: "index", 
    metrics: metrics.data.project.metrics.map(m => {
      m.date = formatDistance(m.createdAt, new Date())
      return m
    })
  });
});


app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
