import express from "express";
import methodOverride from "method-override";

const app = express();
const port = 3000;
const blogs = [];

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      console.log(method, req.body._method);
      delete req.body._method;
      return method;
    }
  })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { blogs: blogs });
});

//routes
app.post("/create", (req, res) => {
  const blogObj = {
    title: req.body["post-title"],
    content: req.body["post-content"],
    id: crypto.randomUUID(),
  };

  blogs.push(blogObj);
  console.log(blogs);

  res.redirect("/");
});

app.get("/read/:id", (req, res) => {
  const userID = req.params.id;
  const currentBlog = blogs.find((blog) => blog.id === userID);
  console.log(`current Blog is ${currentBlog}`);

  if (currentBlog && currentBlog.content) {
    console.log(currentBlog);
    res.send(currentBlog.content);
  } else {
    res.status(404).send("Blog not found");
  }
});

app.delete("/remove", (req, res) => {
  const userID = req.body.id;
  console.log(userID);
  const currentBlogNum = blogs.findIndex((blog) => blog.id === userID);
  console.log(`current Blog is ${currentBlogNum}`);
  if (currentBlogNum !== -1) {
    blogs.splice(currentBlogNum, 1);
    console.log("Blog deleted successfully");
  }
  
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
