const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const moment = require("moment");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const accessToken = process.env.GITHUB_TOKEN;

// API calls
app.get("/api/:user/:repo", (req, res) => {
  const query = `
  query {
    repository(owner:"${req.params.user}", name:"${req.params.repo}") {
      updatedAt
    }
  }`;

  fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
    .then(json => {
      const rawUpdatedAt = json.data.repository.updatedAt;
      const processedUpdatedAt = { updatedAt: moment(rawUpdatedAt).fromNow() };
      res.send(processedUpdatedAt);
    })
    .catch(error => console.error(error));
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
