import {Router, Request, Response} from 'express'
import * as co from 'co'
import * as mkdirp from 'mkdirp'
import * as recursive from 'recursive-readdir'

class StatRouter {
  router: Router

  private config: object

  constructor(config) {
    this.router = Router()
    this.config = config
    this.init()
  }

  init() {
    this.router.get('/', this.showInfo.bind(this))
  }

  private showInfo(req: Request, res: Response): void {
    try{
      mkdirp.sync(`${this.config['CacheFolder']}`)
      mkdirp.sync(`${this.config['ImagesFolder']}`)
    } catch (e) {
      console.log(e)
    }

    const stat = this
    co(function *(){
      try {
        const filesCount = yield stat.filesCount(stat.config['ImagesFolder'])
        const cachedFilesCount = yield stat.filesCount(stat.config['CacheFolder'])

        let result = {
          storedImages: filesCount.length,
          cachedImages: cachedFilesCount.length
        }
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(result))
        return
      } catch (e) {
        console.log(e)
        res.writeHead(500)
        res.end()
        return
      }
    })
  }

  private filesCount(folder): object {
    return (cb) => {
      return recursive(folder, cb)
    }
  }
}

export default StatRouter
