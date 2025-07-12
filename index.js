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
    content: req.body["post-content"],
    id: crypto.randomUUID()
  }

  blogs.push(blogObj);
  console.log(blogs)

  res.redirect("/");
});

app.get("/read/:id", (req, res) => {
  const userID = req.params.id;
  const currentBlog = blogs.find((blog) => blog.id === userID);
  console.log(`current Blog is ${currentBlog}`);

  if(currentBlog && currentBlog.content){
    console.log(currentBlog);
    res.send(currentBlog.content);
  }
  else{
    res.status(404).send("Blog not found");
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
