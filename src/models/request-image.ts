import Size from './size'
import * as path from 'path'


class RequestImage {
  private _name: string
  private _size: Size
  private _config: Object

  constructor(name, size, config) {
    this._name = name
    this._size = new Size(size)
    this._config = config
  }

  get name(): string {
    return this._name;
  }

  get size(): Size {
    return this._size;
  }

  get config(): Object {
    return this._config;
  }

  getFileType(): string {
    return path.extname(this._name)
  }

  hasSize(): boolean {
    return this.size.getArea() > 0
  }

  public isAcceptedFileType(): boolean {
    return this.getFileType().indexOf(this.config['AcceptedFileTypes']) === -1
  }

  public isAcceptedSize(): boolean {
    const configSize = new Size(this.config['MaxResolution'])
    return this.size.getArea() <= configSize.getArea()
  }
}

export default RequestImage