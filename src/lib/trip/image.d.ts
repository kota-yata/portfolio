export interface bitmap {
  data: Uint8ClampedArray,
  width: number,
  height: number
}

export interface encodeResult {
  extension: string,
  binary: NodeJS.ArrayBufferView
}
