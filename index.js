const http = require("http");
const url = require("url");
const fs = require("fs"); //filesystem//

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/json");
  //   res.statusCode = 200;
  //   res.end("Deu Boa !");
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  const method = req.method;
  if (method === "GET" && path === "/users") {
    const users = fs.readFileSync("users.json");
    res.end(users);
    // res.end("Meu método é get!");
  }

  if (method === "POST" && path === "/users") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const newUser = JSON.parse(body);
      const users = JSON.parse(fs.readFileSync("users.json") || "[]");
      users.push({
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
      });
      fs.writeFileSync("users.json", JSON.stringify(users));
      res.end("User Created");
    });
    // res.end("Meu método é POST!");
  }

  if (method === "DELETE" && path === "/users") {
    res.end("Meu método é DELETE!");
  }

  if (method === "PATCH" && path === "/users") {
    res.end("Meu método é UPDATE!");
  }
});

server.listen(4000, () => {
  console.log("Servidor rodando!!!");
});
