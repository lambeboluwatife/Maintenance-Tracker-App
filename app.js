const mongoose          = require('mongoose'),
      methodOverride    = require('method-override');
      expressSanitizer  = require('express-sanitizer')
      express           = require('express'),
      ejs               = require('ejs'),
      bodyParser        = require('body-parser'),
      app               = express();

      // APP CONFIG
      mongoose.connect("mongodb://localhost/request", {useNewUrlParser: true});
      mongoose.set('useFindAndModify', false);
      app.set("view engine", "ejs");
      app.use(express.static("public"));
      app.use(bodyParser.urlencoded({extended: true}));
      app.use(expressSanitizer());
      app.use(methodOverride("_method"));

//  MONGOOSE/MODEL CONFIG
const requestSchema = new mongoose.Schema({
title: String,
body: String,
created: {type: Date, default: Date.now}
});

const Request = mongoose.model("Request", requestSchema);

// INDEX ROUTE
app.get("/", (req, res) => {
  res.redirect("/user");
});

// INDEX ROUTE
app.get("/user", (req, res) => {
  res.send("This is the authetecation route");
});

// INDEX ROUTE 2
app.get("/user/requests", (req, res) => {
  Request.find({}, (err, requests) => {
    if (err) {
      console.log("ERROR");
    } else {
      res.render("index", {requests: requests});
    }
  });
});

// NEW ROUTE
app.get("/user/requests/new", (req, res) => {
  res.render("new");
});

// CREATE ROUTE
app.post("/user/requests", (req, res) => {
  Request.create(req.body.request, (err, newRequest) => {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/user/requests")
    }
  });
});

// SHOW ROUTE
app.get("/user/requests/:id", (req, res) => {
  Request.findById(req.params.id, (err, foundRequest) => {
    if (err) {
      res.redirect("/user/requets");
    } else {
      res.render("show", {request: foundRequest});
    }
  });
});

// EDIT ROUTE
app.get("/user/requests/:id/edit", (req, res) => {
  Request.findById(req.params.id, (err, foundRequest) => {
    if (err) {
      res.redirect("/user/requets");
    } else {
      res.render("edit", {request: foundRequest});
    }
  });
});

// UPDATE ROUTE
app.put("/user/requests/:id", (req, res) => {
  // req.body.blog.body = req.sanitize(req.body.blog.body);
  Request.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect("/user/requests");
    } else {
      res.redirect("/user/requests/" + req.params.id);
    }
  });
});

// DELETE ROUTE
app.delete("/user/requests/:id", (req, res) => {
  // Destroy Blog
  Request.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect("/user/requests");
    } else {
      res.redirect("/user/requests");
    }
  });
});



app.listen(3000, () => {
  console.log("Server Has Started!");
})
