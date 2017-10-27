import {Router, Request, Response} from 'express';
import * as fs from 'fs'
import * as sharp from 'sharp';
import * as mkdirp from 'mkdirp';

import RequestImage from "../models/request-image";

class ImageRouter {
  router: Router

  private config: object

  constructor(config) {
    this.router = Router();
    this.config = config
    this.init();
  }

  init() {
    this.router.get('/:image', this.getImage.bind(this));
  }

  private getCachedImage(image: RequestImage): Buffer {
    if (image.hasSize()) {
      try {
        return fs.readFileSync(`${this.config['CacheFolder']}/${image.size.toString()}/${image.name}`)
      } catch (e) {
        console.log(e.message)
      }
    } else {
      return fs.readFileSync(`${this.config['ImagesFolder']}/${image.name}`)
    }
  }

  private getImage(req: Request, res: Response) {
     const image = new RequestImage(req.params.image, req.query.size, this.config)

    // Checking if the file type is in the accepted file types
    if (!image.isAcceptedFileType()) {
      console.log("Filetype not accepted.")
      res.writeHead(400);
      res.end();
    }

    if (!image.isAcceptedSize()) {
      console.log("Size not accepted.")
      res.writeHead(400);
      res.end();
    }

    const img = this.getCachedImage(image)
    if (img) {
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.end(img, 'binary');
    } else {
      mkdirp.sync(`${this.config['CacheFolder']}/${image.size.toString()}`)
      sharp(fs.readFileSync(`${this.config['ImagesFolder']}/${image.name}`))
        .resize(image.size.width, image.size.height)
        .toFile(`${this.config['CacheFolder']}/${image.size.toString()}/${image.name}`, (err, info) => {
          if (err) {
            console.log(err.message)
            res.writeHead(500);
            res.end();
          } else {
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.end(this.getCachedImage(image), 'binary');
          }
        });
    }

  }

}

export default ImageRouter