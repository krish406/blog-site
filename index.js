import express from "express";
const app = express();
const port = 3000;
const blogs = [];

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render("index.ejs", {blogs: blogs});
});

app.post("/create", (req, res) => {
  const blogObj = {
    title: req.body["post-title"],
    content: req.body["post-content"]
  }
  blogs.push(blogObj);
  console.log(blogs)

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
