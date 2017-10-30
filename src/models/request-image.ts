import * as path from 'path'
import * as fs from 'fs'
import * as sharp from 'sharp'
import * as mkdirp from 'mkdirp'
import * as co from 'co'

import Size from './size'

class RequestImage {
  private _name: string
  private _size: Size
  private _config: object

  constructor (name: string, size: string, config: object) {
    this._config = config
    this.name = name
    this.size = new Size(size)
  }

  set name (name: string) {
    if (!this.isAcceptedFileType(name)) {
      throw new Error('Inacceptable file type.')
    }
    this._name = name
  }

  set size (size: Size) {
    const maxSize = new Size(this.config['MaxResolution'])
    if (size.getArea() > maxSize.getArea()) {
      throw new Error('Inacceptable image size.')
    }
    this._size = size
  }

  get name (): string {
    return this._name
  }

  get size (): Size {
    return this._size
  }

  get config (): object {
    return this._config
  }

  public getFileType (name): string {
    return path.extname(name)
  }

  public hasSize (): boolean {
    return this.size.getArea() > 0
  }

  private isAcceptedFileType (name: string): boolean {
    return this.config['AcceptedFileTypes'].indexOf(this.getFileType(name).substring(1)) !== -1
  }

  private getImagePath (): string {
    return `${this.config['ImagesFolder']}/${this.name}`
  }

  public getImage (): Buffer {
    return fs.readFileSync(this.getImagePath())
  }

  private getCachedImagePath (): string {
    return `${this.config['CacheFolder']}/${this.size.toString()}/${this.name}`
  }

  public getCachedImage (): Buffer {
    return fs.readFileSync(this.getCachedImagePath())
  }

  public generateCachedImage () {
    const image = this
    return co(function * () {
      try {
        mkdirp.sync(`${image.config['CacheFolder']}/${image.size.toString()}`)
        yield sharp(image.getImagePath())
          .resize(image.size.width, image.size.height)
          .toFile(image.getCachedImagePath())
        return image.getCachedImage()
      } catch (e) {
        throw new Error(e)
      }
    }).catch((e) => { throw new Error(e) })
  }
}

export default RequestImage
