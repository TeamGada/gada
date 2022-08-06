import passport from "passport";
import { Strategy as KakaoStrategy, Profile } from "passport-kakao";
import bcrypt from "bcrypt";
import randomstring from "randomstring";

import { UserDocument } from "../types";
import { userModel } from "../db";
import { userService } from "../services";

const kakaoConfig = {
  clientID: process.env.KAKAO_ID || "", // REST API KEY
  callbackURL:
    "http://kdt-sw2-seoul-team05.elicecoding.com:5000/users/oauth/kakao", // Redirect URI
};

async function kakaoVerify(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: any
) {
  try {
    const foundUser = await userModel.findByEmailAndWay(
      profile._json.kakao_account.email,
      profile.provider
    );

    if (!foundUser) {
      const kakaoEmail = profile._json && profile._json.kakao_account.email;
      const kakaoUsername = profile.displayName;
      const kakaoPassword = randomstring.generate(10);
      const provider = profile.provider;
      const hashedKakaoPassword = await bcrypt.hash(kakaoPassword, 10);

      const newUserInfo: UserDocument = {
        username: kakaoUsername,
        email: kakaoEmail,
        way: provider,
        password: hashedKakaoPassword,
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

export default function kakaoPassportConfig() {
  passport.use(new KakaoStrategy(kakaoConfig, kakaoVerify));
}
