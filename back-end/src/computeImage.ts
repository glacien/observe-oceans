'use strict';

const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const canvas = createCanvas(3600, 1800);
const ctx = canvas.getContext('2d');

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

const dataArr: number[][] = Array.from({ length: 1800 }, () => {
  return Array.from({ length: 3600 });
});

//creating readable stream
const readStream = fs.createReadStream('./src/assets/sst.grid', {
  encoding: null,
  highWaterMark: 1024 * 1024, // 1 MB buffer size, adjust as needed
});

//processing every chunk of big file
const helperObj = { currentArrY: 0, currentArrX: 0, currentChunkI: 0 };
readStream.on('data', (chunk) => {
  console.log('Received chunk of length:', chunk.length);

  for (let y = helperObj.currentArrY; y < 1800; y++) {
    for (let x = helperObj.currentArrX; x < 3600; x++) {
      dataArr[y][x] = fromBytes(
        chunk.subarray(helperObj.currentChunkI, helperObj.currentChunkI + 1)
      );
      //here im writting every tenth byte to match image reasolution
      helperObj.currentChunkI += 10;
      helperObj.currentArrX += 1;

      if (helperObj.currentChunkI > chunk.length - 1) {
        break;
      }
    }
    if (helperObj.currentChunkI > chunk.length - 1) {
      helperObj.currentChunkI = helperObj.currentChunkI - chunk.length;
      break;
    } else {
      helperObj.currentArrX = 0;
      //here im also skipping ten rows of data to match image resolution
      helperObj.currentChunkI += 324_000;
      helperObj.currentArrY += 1;
      if (helperObj.currentChunkI > chunk.length - 1) {
        helperObj.currentChunkI = helperObj.currentChunkI - chunk.length;
        break;
      }
    }
  }
});

readStream.on('end', () => {
  console.log('File reading completed.');
  console.log('Painting image...');
  loadImage('./src/assets/empty-map.jpg').then((image) => {
    ctx.drawImage(image, 0, 0, 3600, 1800);

    for (let a = 0; a < 1800; a++) {
      for (let i = 1; i < 3600; i++) {
        if (dataArr[a][i] === 255) continue;

        //colors can be adjustible
        ctx.fillStyle = `hsl(${320 - +dataArr[a][i] * 3.25}, 100%, 50%)`;
        ctx.fillRect(i, 1800 - a, 1, 1);
      }
    }

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./imageResult.png', buffer);
  });
});

readStream.on('error', (err) => {
  console.error(`Error reading the file: ${err.message}`);
});
