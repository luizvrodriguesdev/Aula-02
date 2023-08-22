
const http = require("http");
const url = require("url");
const fs = require("fs");
const {​​ v4: uuidv4 }​​ = require("uuid");
const server = http.createServer((req, res) => {​​
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;
  if (method === "GET" && path === "/users") {​​
    // READ
    const users = fs.readFileSync("users.json");
    res.end(users);
  }​​ else if (method === "POST" && path === "/users") {​​
    // CREATE
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {​​
      const newUser = JSON.parse(body);
      const users = JSON.parse(fs.readFileSync("users.json") || "[]");
      users.push({​​
        id: uuidv4(),
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
      }​​);
      fs.writeFileSync("users.json", JSON.stringify(users));
      res.end("User Created");
    }​​);
  }​​ else if (method === "DELETE" && path.startsWith("/users/")) {​​
    // DELETE
    const idToDelete = path.split("/")[2];
    const users = JSON.parse(fs.readFileSync("users.json") || "[]");
    const updatedUsers = users.filter((user) => user.id !== idToDelete);
    fs.writeFileSync("users.json", JSON.stringify(updatedUsers));
    res.end("User Deleted");
  }​​ else {​​
    res.end("Not Found");
  }​​
}​​);
server.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
