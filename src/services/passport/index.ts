import passport from "passport";
import passportLocal from "passport-local";

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser(function (id, done) {
  done(null, { name: "duy" });
});

const LocalStrategy = passportLocal.Strategy;

/** Sign in using Email and Password */
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    const isMatch =
      email === "abc@gmail.com" && password === "123456" ? true : false;
    if (isMatch) {
      const user = { email: "abc@gmail.com" };
      console.log("user: ", user);
      return done(undefined, user);
    }
    return done(undefined, false, { message: "Invalid email or password." });
  })
);
