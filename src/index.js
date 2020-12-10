const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/dev.env" });
const URL = require("./models/URL");

const app = express();
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  // autoIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.get("/", async (req, res) => {
  const shortUrl = await URL.find();
  res.render("../src/views/dashboard", { shortUrl: shortUrl });
});
app.post("/shortUrl", async (req, res) => {
  await URL.create({ longUrl: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:ShortURL", async (req, res) => {
  const shortUrl = await URL.findOne({ shortUrls: req.params.ShortURL });
  try {
    if (shortUrl) {
      shortUrl.count++;
      shortUrl.save();
      res.redirect(shortUrl.longUrl);
    } else {
      console.log("not found ");
    }
  } catch (e) {
    console.log(e);
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is on ");
});
