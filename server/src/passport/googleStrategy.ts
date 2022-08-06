import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import randomstring from "randomstring";

import { UserDocument } from "../types";
import { userModel } from "../db";
import { userService } from "../services";

const googleConfig = {
  clientID: process.env.GOOGLE_ID || "", // REST API KEY
  clientSecret: process.env.GOOGLE_SECRET || "",
  callbackURL:
    "http://kdt-sw2-seoul-team05.elicecoding.com:5000/users/oauth/google", // Redirect URI
};

async function googleVerify(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: any
) {
  try {
    const email = profile._json.email as string;

    const foundUser = await userModel.findByEmailAndWay(
      email,
      profile.provider
    );

    if (!foundUser) {
      const googleEmail = email;
      const googleUsername = profile.displayName;
      const googlePassword = randomstring.generate(10);
      const provider = profile.provider;
      const hashedGooglePassword = await bcrypt.hash(googlePassword, 10);

      const newUserInfo: UserDocument = {
        username: googleUsername,
        email: googleEmail,
        way: provider,
        password: hashedGooglePassword,
        emailAuth: true,
      };

      const newUser = await userService.addUser(newUserInfo);

      done(null, newUser);
      return;
    }

    done(null, foundUser);
    return;
  } catch (err) {
    done(err);
  }
}

export default function googlePassportConfig() {
  passport.use(new GoogleStrategy(googleConfig, googleVerify));
}
