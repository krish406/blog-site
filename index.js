import express from "express";
import methodOverride from "method-override";

const app = express();
const port = 3000;
const blogs = []; //holds all user created blog objects

//middleware, this can read forms and json
app.use(express.urlencoded({ extended: true }), express.json());
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

//for the stylesheets
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { blogs: blogs });
});

app.post("/create", (req, res) => {
  const blogObj = {
    title: req.body["post-title"],
    content: req.body["post-content"],
    id: crypto.randomUUID(), //generate a unique ID for each of the blogs
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

app.get("/load-edit/:id", (req, res) => {
  const userID = req.params.id;
  const currentBlog = blogs.find((blog) => {
    console.log(blog.id, userID);
    return blog.id === userID;
  });
  console.log(currentBlog);
  if (currentBlog) {
    res.json({
      blogs: blogs,
      title: currentBlog.title,
      content: currentBlog.content,
      edit: true,
    });
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
});

app.put("/edit/:id", (req, res) => {
  console.log("hello");
  console.log("Request body: ", req.body); // Add this to see what's being sent
  const userID = req.params.id;
  const currentBlogNum = blogs.findIndex((blog) => {
    return blog.id === userID;
  });

  console.log(currentBlogNum);
  if (currentBlogNum !== -1) {
    console.log(blogs);
    blogs[currentBlogNum].title = req.body["post-title"];
    blogs[currentBlogNum].content = req.body["post-content"];
    console.log(blogs);
    res.redirect("/");
  } else {
    res.status(404).json({
      error: {
        name: "Blog not found",
      },
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
