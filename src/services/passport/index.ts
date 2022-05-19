import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import passportLocal from "passport-local";
import passportFacebook from "passport-facebook";
import { UserService } from "../../apis/user/user.services";
import {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_CALLBACK_URL,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../../constant";
import { compare } from "../bcrypt";

passport.serializeUser<any, any>((req, user: any, done) => {
  done(undefined, user);
});

passport.deserializeUser(function (user: any, done) {
  done(undefined, user);
});

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;
const FacebookStrategy = passportFacebook.Strategy;

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

/** Sign in using Google */
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken,
      refreshToken,
      { id, displayName, provider, photos, emails },
      cb
    ) => {
      let user = await UserService.getOne({ "profile.id": id });

      if (!user) {
        user = await UserService.create({
          profile: { id, displayName, provider, photos, emails },
        });
      }

      return cb(null, user);
    }
  )
);

/** Sign in using Facebook */
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (
      accessToken,
      refreshToken,
      { id, displayName, provider = "facebook", photos, emails },
      cb
    ) => {
      let user = await UserService.getOne({ "profile.id": id });

      if (!user) {
        user = await UserService.create({
          profile: { id, displayName, provider, photos, emails },
        });
      }

      return cb(null, user);
    }
  )
);
