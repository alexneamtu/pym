import * as express from 'express'

import RequestImage from './models/request-image'
import Size from "./models/size";
import ImageRouter from "./routes/image-router";

class App {
  public express: express
  private config: object

  constructor(config: object) {
    this.express = express()
    this.config = config
    this.routes()
  }

  private routes(): void {
    this.express.use('/image', new ImageRouter(this.config).router);
    this.express.use(function (req, res) {
      res.sendStatus(404);
    });
  }

}

export default App
