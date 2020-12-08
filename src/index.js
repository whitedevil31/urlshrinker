const express = require("express");
const mongoose = require("mongoose");
const URL = require("./models/URL");
const app = express();
mongoose.connect(
  "mongodb+srv://admin:87654321@cluster0.0haku.mongodb.net/travel-partner-database?retryWrites=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
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

  //   if (!shortUrl) {
  //     res.sendStatus(404);
  //   }
});

app.listen(process.env.port || 5000, () => {
  console.log("server is on ");
});
