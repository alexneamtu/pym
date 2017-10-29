class Size {
  private _width: number
  private _height: number

  constructor(size: string) {
    const sizeParts = this.splitSize(size)
    this._width = sizeParts.width
    this._height = sizeParts.height
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  splitSize(size: string): {width: number, height: number} {
    const sizeParts = size ? size.match(/^(-?\d+)x(-?\d+)$/i) : null
    const width = sizeParts ? Math.abs(parseInt(sizeParts[1])) : 0
    const height = sizeParts ? Math.abs(parseInt(sizeParts[2])) : 0
    return {width, height}
  }

  getArea(): number {
    return this._width * this._height
  }

  toString(): string {
    return `${this._width}x${this._height}`
  }
}

export default Size
