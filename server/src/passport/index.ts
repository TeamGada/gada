import passport from "passport";

import { userModel } from "../db";
import local from "./localStrategy";
import kakao from "./kakaoStrategy";
import google from "./googleStrategy";

export default function passportConfig() {
  //유저 정보 암호화
  passport.serializeUser<any, any>((req, user, done) => {
    done(null, user._id);
  });

  //유저 정보 복호화 이때 cookie의 sessionId를 활용
  passport.deserializeUser<any>(async (userId, done) => {
    const user = await userModel.findByUserId(userId);
    done(null, user);
  });

  local();

  kakao();

  google();
}
