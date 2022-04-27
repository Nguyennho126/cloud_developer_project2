import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import {Application, Request, Response, NextFunction, Errback} from "express";

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/", async (req:Request, res:Response) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });

  // test get  params id http://localhost:8082/testparams/?id=nhon1
  app.get("/testparams", async (req:Request, res:Response) => {
    var id = req.query.id;
    res.send(id)
  });

  //test load image function
  app.get("/testfilteredimage", async (req:Request, res:Response) => {
    let file_path = await filterImageFromURL('https://picsum.photos/200');
    console.log(`test save image ${file_path}`)
    res.send(file_path);
  });

  //test http://localhost:8082/filteredimage/?image_url=https://picsum.photos/200
  app.get("/filteredimage", async (req:Request, res:Response) => {
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
    let image_url = req.query.image_url;
    if (!image_url || image_url == "") {
      return res.status(400).send({ message: "Not URL" });
    }
    try {
      console.log(`url image ${image_url}`);
      let filteredpath: string = await filterImageFromURL(image_url) as string;
      res.sendFile(filteredpath, async (error) => {
        if (error) {
          return res.status(201).send({ message: "not found image" });
        }
        deleteLocalFiles([filteredpath]);
        return res.status(200);
      })
    } catch (error) {
      res.status(201).send(error);
    }
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
