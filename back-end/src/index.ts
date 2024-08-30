'use strict';

const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`alive on port: ${PORT}`);
});

app.get('/image', (req, res) => {
  const image = fs.readFileSync('./data/imageResult.png');
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Origin', 'https://observe-oceans.web.app');
  res.status(200).send(image);
});

app.get('/grid', (req, res) => {
  const grid = fs.readFileSync('./data/sst.grid.zip');
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Origin', 'https://observe-oceans.web.app');
  res.status(200).send(grid);
});
