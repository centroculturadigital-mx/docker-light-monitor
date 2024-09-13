import express  from "express";
import cors from "cors"
import Docker from 'dockerode';
const docker = new Docker({ socketPath: '/var/run/docker.sock' })

import bodyParser  from 'body-parser';
const app = express();

app.use(express.json());
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}));

const hostname = "127.0.0.1";
const port = process.env.PORT || 3003;



app.get("/docker", async (req, res) => {

  console.log('/docker')
  res.json({
    data: docker.listContainers()
  })
})

app.get("/docker/:container", async (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  console.log('/docker/container', req.params.container);


  const container = docker.getContainer(req.params.container);
  docker.listContainers
  const containerInfo = await container.inspect();

  console.log(containerInfo)
  res.json({
    data: containerInfo
  })
});


app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
