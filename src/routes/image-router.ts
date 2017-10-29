import {Router, Request, Response} from 'express'
import * as co from 'co'

import RequestImage from "../models/request-image"

class ImageRouter {
  router: Router

  private config: object

  constructor(config) {
    this.router = Router()
    this.config = config
    this.init()
  }

  init() {
    this.router.get('/:image', this.getImage.bind(this))
  }
  private getImage(req: Request, res: Response): void {
    let image
    try {
      image = new RequestImage(req.params.image, req.query.size, this.config)
    } catch (e) {
      console.log(e.message)
      res.writeHead(400)
      res.end()
      return
    }

    let img
    if (image.hasSize()) {
      try {
        img = image.getCachedImage()
        res.writeHead(200, {'Content-Type': `image/${image.getFileType(image.name).substring(1)}`});
        res.end(img, 'binary');
        return
      } catch (e) {
        console.log(e.message)
      }

      if (!img) {
        co (function *(){
          try {
            img = yield image.generateCachedImage()
            res.writeHead(200, {'Content-Type': `image/${image.getFileType(image.name).substring(1)}`});
            res.end(img, 'binary');
          } catch (e) {
            console.log(e.message)
            res.writeHead(500)
            res.end()
            return
          }
        }).catch((e) => {
          console.log(e.message)
          res.writeHead(500)
          res.end()
          return
        })
      }
    } else {
      try {
        img = image.getImage()
        res.writeHead(200, {'Content-Type': `image/${image.getFileType(image.name).substring(1)}`});
        res.end(img, 'binary');
        return
      } catch (e) {
        console.log(e.message)
        res.writeHead(404)
        res.end()
        return
      }
    }
  }
}

export default ImageRouter
