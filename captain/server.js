const app = require("./index");
const http = require("http");

const server = http.createServer(app);

server.listen(3002, () => {
  console.log("captain service is running at port 3002");
});
