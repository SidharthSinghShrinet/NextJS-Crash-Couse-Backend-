// import http from "http";
function Page() {
  return <h1>Page is here...</h1>;
}

export default Page;

// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   console.log("Server started successfully..");
//   res.end("Hello, Guy's!");
// });

// server.listen(5000, (err) => {
//   if (err) console.log(err);
//   console.log("Server running at port 5000");
// });

import fs from "fs";

const data = fs.readFileSync("./app/todos/page.js", "utf-8");
console.log("File read successfully...");
console.log(data);
