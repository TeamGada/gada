import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import { userModel } from "../db";

const localConfig = { usernameField: "email", passwordField: "password" };

async function localVerify(email: string, password: string, done: any) {
  try {
    const user = await userModel.findByEmailAndWay(email, "basic");

    if (!user) {
      done(null, false, {
        result: "fail",
        message: "해당 이메일은 가입 내역이 없습니다. 다시 한번 확인해 주세요.",
      });
      return;
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      done(null, false, {
        result: "fail",
        message: "패스워드가 일치하지 않습니다. 다시 한번 확인해 주세요.",
      });
      return;
    }

    if (!user.emailAuth) {
      done(null, false, {
        result: "fail",
        message:
          "이메일 인증이 완료 되지 않았습니다. 이메일 인증을 완료해 주십시오.",
      });
      return;
    }

    done(null, user);
    return;
  } catch (err) {
    done(err);
    return;
  }
}

export default function localPassportConfig() {
  passport.use(new LocalStrategy(localConfig, localVerify));
}
