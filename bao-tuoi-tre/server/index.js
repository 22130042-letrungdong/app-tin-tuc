const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/rss/tuoitre", async (req, res) => {
  const rss = await axios.get("https://tuoitre.vn/rss/tin-moi-nhat.rss");
  xml2js.parseString(rss.data, { explicitArray: false }, (err, result) => {
    res.json(result.rss.channel.item);
  });
});

app.listen(3001, () => {
    console.log("Server chạy tại http://localhost:3001");
});
