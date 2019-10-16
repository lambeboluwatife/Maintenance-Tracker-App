const express = require('express');
const router = express.Router();
const Request = require("../models/requests");


// INDEX ROUTE
router.get("/", isLoggedIn, (req, res) => {
  Request.find({}, (err, requests) => {
    if (err) {
      console.log(err);
    } else {
      res.render("admin/index", {requests: requests});
    }
  });
});

// // NEW ROUTE
// router.get("/new", isLoggedIn, (req, res) => {
//   res.render("user/new");
// });

// // CREATE ROUTE
// router.post("/", isLoggedIn, (req, res) => {
//   let title = req.body.title;
//   let body = req.body.body;
//   let author = {
//     id: req.user._id,
//     username: req.user.username
//   }
//
//   let newRequest = {title: title, body: body, author: author}
//   Request.create(newRequest, (err, newlyCreated) => {
//     if (err) {
//       res.render("new");
//     } else {
//       console.log(newlyCreated);
//       res.redirect("/user/requests")
//     }
//   });
// });

// SHOW ROUTE
router.get("/:id", isLoggedIn, (req, res) => {
  Request.findById(req.params.id, (err, foundRequest) => {
    if (err) {
      res.redirect(back);
    } else {
      res.render("admin/show", {request: foundRequest});
    }
  });
});

// // EDIT ROUTE
// router.get("/:id/edit", isLoggedIn, (req, res) => {
//   Request.findById(req.params.id, (err, foundRequest) => {
//     if (err) {
//       res.redirect(back);
//     } else {
//       res.render("admin/edit", {request: foundRequest});
//     }
//   });
// });

// UPDATE ROUTE
router.put("/:id", isLoggedIn, (req, res) => {
  // req.body.blog.body = req.sanitize(req.body.blog.body);
  Request.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect(back);
    } else {
      res.redirect("/user/requests/" + req.params.id);
    }
  });
});

// // DELETE ROUTE
// router.delete("/:id", isLoggedIn, (req, res) => {
//   // Destroy Blog
//   Request.findByIdAndRemove(req.params.id, (err) => {
//     if (err) {
//       res.redirect("/user/requests");
//     } else {
//       res.redirect("/user/requests");
//     }
//   });
// });

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/admin/login");
}

function checkCampgroundOwnership (req, res, next) {
    if (req.isAuthenticated()) {
      Request.findById(req.params.id, (err, foundRequest) => {
        if (err) {
          res.redirect("back");
        } else {
          // does user own the request?
          if (foundRequest.author.id.equals(req.user._id)) {
              next();
          } else {
            res.redirect("back");
          }
        }
      });
    } else {
      res.redirect("back");
    }
}


module.exports = router;
