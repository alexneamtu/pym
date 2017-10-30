import * as express from 'express'

import ImageRouter from './routes/image-router'
import StatRouter from './routes/stat-router'

class App {
  public express: express
  private config: object

  constructor (config: object) {
    this.express = express()
    this.config = config
    this.routes()
  }

  private routes (): void {
    this.express.use('/image', new ImageRouter(this.config).router)
    this.express.use('/stats', new StatRouter(this.config).router)
    this.express.use((req, res) => {
      res.sendStatus(404)
    })
  }
}

export default App
