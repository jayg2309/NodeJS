const http = require("http"); // http has alot of modules
const fs = require("fs");
const path = require("path");
const { log } = require("console");

const port = 3000;

//create server
// inside .createServer - give functionality of what you want it to do
const server = http.createServer((req, res) => {
  // request and response
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url // if true execute left else right of ?
  );
  console.log(filePath);

  const extName = String(path.extname(filePath)).toLowerCase();

  //allowing what type of file supporting
  const mimeType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "text/png",
  };

  //generic file type --- application/octet-stream
  const contentType = mimeType[extName] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "content-Type": "text/html" });
        res.end("404 : FILE NATHI BHAI");
      }
    } else {
      // sending response
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

//listen - 2 parameters - what port no, what should it do
server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
