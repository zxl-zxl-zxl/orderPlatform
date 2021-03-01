const { userName } = require("./User");
let user = require("./User");
console.log(`username:${userName}`);
console.log(`I'm ${userName}, I say ${user.sayHello()}`);

let http = require("http");
let url = require("url");
let util = require("util");

let server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  console.log("url:"+req.url)
  res.end(util.inspect(url.parse("http://192.168.226.1:3000/test.html?a=1223#tag")));
});
server.listen(3000, "192.168.226.1", () => {
  console.log(
    "服务器已经运行，请打开浏览器，输入：http://192.168.226.1:3000/来进行访问"
  );
});
