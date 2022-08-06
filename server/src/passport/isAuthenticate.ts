import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { userModel } from "../db";

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //refreshToken을 데이터베이스에서 가져오기 위한 accsessToken verify
  try {
    const accessToken = req.headers.authorization?.split("Bearer ")[1];

    if (typeof accessToken === "undefined") {
      throw new Error("올바른 접근이 아닙니다.");
    }

    const decodedAccessToken = jwt.verify(accessToken, jwtSecretKey, {
      ignoreExpiration: true,
    }) as JwtPayload;

    //accessToken을 decode하여 얻어온 userId를 통해 refreshToken을 가져온후 verify
    const user = await userModel.findByUserId(decodedAccessToken.id);

    if (!user) {
      throw new Error("올바른 접근이 아닙니다.");
    }

    const refreshToken = user.refreshToken;

    //실질적으로 passport에 사용되는 암호화된 세션쿠키 -> 이것이 로그인의 유무를 판단
    const substituteToken = req.cookies["connect.sid"];

    jwt.verify(refreshToken, jwtSecretKey, (err, decodedRefreshToken) => {
      if (err) {
        if (substituteToken) {
          if (req.isAuthenticated()) next();
        }

        next(err);
      }

      if (!substituteToken) {
        req.login(user, async (err) => {
          if (err) next(err);

          next();
        });
      }

      if (req.isAuthenticated()) next();
    });
  } catch (err) {
    next(err);
  }
}

export { isAuthenticated };
