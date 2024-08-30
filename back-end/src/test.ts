'use strict';

const assert = require('chai').assert;

function fromBytes(buffer: any): number {
  const bytes = new Uint8ClampedArray(buffer);
  const size = bytes.byteLength;
  let x = 0;
  for (let i = 0; i < size; i++) {
    const byte = bytes[i];
    x *= 0x100;
    x += byte;
  }
  return x;
}

describe('simple test', function () {
  it('function fromBytes should return number', function () {
    assert.typeOf(fromBytes(Buffer.from([200])), 'number');
  });
});
