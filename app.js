const mongoose          = require('mongoose'),
      methodOverride    = require('method-override');
      express           = require('express'),
      ejs               = require('ejs'),
      bodyParser        = require('body-parser'),
      passport          = require('passport'),
      LocalStrategy     = require('passport-local'),
      User              = require('./models/user'),
      Admin             = require('./models/admin'),
      Request           = require('./models/requests'),
      app               = express();

      // Requiring Routes
      const requestsRoutes    = require("./routes/requests"),
            adminRoutes       = require("./routes/admin"),
            indexRoutes       = require("./routes/index"),
            adminIndexRoutes  = require("./routes/adminIndex");

      // APP CONFIG
      mongoose.connect("mongodb://localhost/request", {useNewUrlParser: true});
      mongoose.set('useFindAndModify', false);
      app.set("view engine", "ejs");
      app.use(express.static(__dirname + "/public"));
      app.use(bodyParser.urlencoded({extended: true}));
      app.use(methodOverride("_method"));

      // PASSPORT CONFIGURATION
      app.use(require("express-session")({
        secret: "Dani is Awesome",
        resave: false,
        saveUninitialized: false
      }));
      app.use(passport.initialize());
      app.use(passport.session());
      passport.use(new LocalStrategy(User.authenticate()));
      passport.serializeUser(User.serializeUser());
      passport.deserializeUser(User.deserializeUser());

      app.use((req, res, next) => {
        res.locals.currentUser = req.user;
        next();
      });

      app.use("/", indexRoutes);
      app.use("/", adminIndexRoutes);
      app.use("/user/requests", requestsRoutes);
      app.use("/users/requests", adminRoutes);


app.listen(3000, () => {
  console.log("Server Has Started!");
})
