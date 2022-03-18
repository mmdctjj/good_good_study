const http = require("http")
const fs = require('fs')
const path = require('path');
const { url } = require("inspector");

// let PUBLIC_PATH = path.resolve(__dirname, 'test.html');
const server = http.createServer()

server.on("request", (req, res) => {
  if (req.url == '/index') {
    console.log('test')
    fs.readFile(process.cwd() + '/index.html', (err, data) => {

      if (err) console.log(err)

      res.end(data)
    })
  } else if (req.url.endsWith('.png') || req.url.endsWith('.jpg') || req.url.endsWith('.html')){
    console.log(req.url)
    fs.readFile(process.cwd() + req.url, (err, data) => {
      if (err) console.log(err)
      res.end(data)
    })
  }
})

server.listen(3000, '127.0.0.1',() => {
  console.log('start 3000')
})