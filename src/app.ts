import bodyParser from "body-parser";
import compression from "compression";
import MongoStore from "connect-mongo";
import express from "express";
import flash from "express-flash";
import session from "express-session";
import lusca from "lusca";
import morgan from "morgan";
import passport from "passport";
import path from "path";
import routes from "./apis/routes";
import { MONGODB_URI, SESSION_SECRET } from "./constant/secrets";
import { connectMongo } from "./services/mongoose";
import "./services/passport";

/** create & configuration server */
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(morgan("dev"));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      mongoUrl: MONGODB_URI,
      mongoOptions: {
        connectTimeoutMS: 60000,
      },
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use(express.static(path.join(__dirname, "public")));

/** connect database */
connectMongo();

app.use("/api", routes);

export default app;
