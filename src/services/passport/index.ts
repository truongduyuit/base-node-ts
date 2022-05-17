import passport from "passport";
import passportLocal from "passport-local";
import { UserService } from "../../apis/user/user.services";
import { compare } from "../bcrypt";

passport.serializeUser<any, any>((req, user: any, done) => {
  done(undefined, user);
});

passport.deserializeUser(function (user: any, done) {
  done(undefined, user);
});

const LocalStrategy = passportLocal.Strategy;

/** Sign in using Email and Password */
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await UserService.getOne({ email });

      if (!user || !compare(password, user.password)) return done(null, {});

      user.password = undefined;
      return done(null, user);
    }
  )
);
