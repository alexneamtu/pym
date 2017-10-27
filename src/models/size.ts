class Size {
  private _width: number
  private _height: number

  constructor(size: string) {
    const sizeParts = size ? size.match(/^(-?\d+)x(-?\d+)$/i) : null
    this._width = sizeParts ? Math.abs(parseInt(sizeParts[1])) : 0
    this._height = sizeParts ? Math.abs(parseInt(sizeParts[2])) : 0
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  getArea(): number {
    return this._width * this._height
  }

  toString(): string {
    return `${this._width}x${this._height}`
  }
}

export default Size