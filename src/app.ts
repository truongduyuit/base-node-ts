import bodyParser from "body-parser";
import compression from "compression";
import MongoStore from "connect-mongo";
import express from "express";
import flash from "express-flash";
import session from "express-session";
import lusca from "lusca";
import path from "path";
import { connectMongo } from "./services/mongoose";
import { MONGODB_URI, SESSION_SECRET } from "./utils/secrets";

// Create Express server
const app = express();

// Connect Database
connectMongo();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      mongoUrl: MONGODB_URI,
      mongoOptions: {
        connectTimeoutMS: 300000,
      },
    }),
  })
);
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// app.use((req, res, next) => {
//   // After successful login, redirect back to the intended page
//   if (
//     !req.user &&
//     req.path !== "/login" &&
//     req.path !== "/signup" &&
//     !req.path.match(/^\/auth/) &&
//     !req.path.match(/\./)
//   ) {
//     req.session.returnTo = req.path;
//   } else if (req.user && req.path == "/account") {
//     req.session.returnTo = req.path;
//   }
//   next();
// });

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */

export default app;
