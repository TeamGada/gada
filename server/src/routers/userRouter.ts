import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import logger from "jet-logger";

import { isAuthenticated } from "../passport/isAuthenticate";
import { EmailAuth, UpdateDto, UserDocument } from "../types";
import { likeServie, userService } from "../services";
import emailValidator from "../utils/emailValidator";

const userRouter: Router = Router();

userRouter.post(
  "/auth-email",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //1. 회원 가입을 위한 이메일
      const email: string = req.body.email || "";

      //2. 이메일 형식 확인
      if (!emailValidator(email)) {
        throw new Error("이메일 형식이 맞지 않습니다.");
      }

      //3. 이메일 중복 여부 확인
      const isDuplicate = await userService.checkDuplicateEmail(email, "basic");

      //4. 이메일 중복시
      if (isDuplicate) {
        return res.status(409).json({
          result: "fail",
          message:
            "이미 존재하는 계정입니다. '다른 계정으로 로그인' 으로 로그인해 주십시오.",
        });
      }

      //4. 이메일 중복이 아니라면 회원가입 링크를 해당 이메일로 전달.
      userService.sendRegisterLink(email);

      return res.status(200).json({ result: "success" });
    } catch (err) {
      next(err);
      return;
    }
  }
);

userRouter.get(
  "/confirm-email",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //1. 이메일 인증로 전달된 회원가입 페이지로 이동을 위한 값들
      const email = req.query.email as string;
      const authToken = req.query.authToken as string;

      const emailAuthInfo: EmailAuth = {
        email,
        authToken,
      };

      //2. 링크 유효 검사
      const authData = await userService.verifyRegisterLink(emailAuthInfo);

      //3. 데이터가 없다면 접근 불가
      if (!authData) {
        throw new Error("유효하지 않는 링크입니다.");
      }

      //4. 유효헌 링크라면 회원가입 페이지로 이동
      return res
        .status(302)
        .redirect(
          `http://kdt-sw2-seoul-team05.elicecoding.com/register?email=${email}&authToken=${authToken}`
        );
    } catch (err) {
      next(err);
      return;
    }
  }
);

userRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //다시 한번 링크를 체크하는 이유는 만약 누군가 쿼리를 이용하여 url로 접근한다면
      //막을 방법이 없기 때문에 reigster페이지로 이동 했을 시 한번 더 확인
      const username: string = req.body.username;
      const email: string = req.body.email;
      const password: string = req.body.password;
      const authToken: string = req.body.authToken;

      //1. 유효한 링크임이 확인 되면 회원가입 시작
      const emailAuthInfo: EmailAuth = {
        email,
        authToken,
      };

      const authData = await userService.verifyRegisterLink(emailAuthInfo);

      if (!authData) {
        throw new Error("잘못된 접근 입니다.");
      }

      //2. 필수값 검사
      if (!username || !email || !password) {
        throw new Error("이름, 이메일, 패스워드를 모두 입력해 주세요.");
      }

      //3. 이메일 형식 검사
      const isCorrect = emailValidator(email);

      if (!isCorrect) {
        throw new Error("이메일 형식이 올바르지 않습니다.");
      }

      //4. 유저정보 객체화
      const userInfo: UserDocument = {
        username,
        email,
        password,
        emailAuth: true,
      };

      //5. 유저 저장을 위한 로직을 service에서 처리
      await userService.addUser(userInfo);

      res.status(200).json({ result: "success" });
    } catch (err) {
      next(err);
      return;
    }
  }
);

userRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          logger.warn(info.message);
          return res.status(400).json(info);
        }

        req.login(user, async (err) => {
          if (err) {
            next(err);
            return;
          }

          //accessToken 발급
          const accessToken = await userService.getAccessToken(
            user._id,
            user.way
          );

          //refreshToken 발급
          await userService.saveRefreshToken(user._id);

          res.cookie("accessToken", accessToken);

          return res.status(200).json({ result: "success" });
        });
      })(req, res);
    } catch (err) {
      next(err);
      return;
    }
  }
);

userRouter.get("/login/kakao", passport.authenticate("kakao"));

userRouter.get(
  "/oauth/kakao",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      passport.authenticate("kakao", async (err, user, info) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          logger.warn(info.message);
          return res.status(400).json(info);
        }

        req.login(user, async (err) => {
          if (err) {
            next(err);
            return;
          }

          //accessToken 발급
          const accessToken = await userService.getAccessToken(
            user._id,
            user.way
          );

          //refreshToken 발급
          await userService.saveRefreshToken(user._id);

          res.cookie("accessToken", accessToken);

          return res
            .status(302)
            .redirect("http://kdt-sw2-seoul-team05.elicecoding.com/main");
        });
      })(req, res);
    } catch (err) {
      next(err);
      return;
    }
  }
);

userRouter.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/oauth/google",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      passport.authenticate("google", async (err, user, info) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          logger.warn(info.message);
          return res.status(400).json(info);
        }

        req.login(user, async (err) => {
          if (err) {
            next(err);
            return;
          }

          //accessToken 발급
          const accessToken = await userService.getAccessToken(
            user._id,
            user.way
          );

          //refreshToken 발급
          await userService.saveRefreshToken(user._id);

          res.cookie("accessToken", accessToken);

          return res
            .status(302)
            .redirect("http://kdt-sw2-seoul-team05.elicecoding.com/main");
        });
      })(req, res);
    } catch (err) {
      next(err);
      return;
    }
  }
);

userRouter.get(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("잘못된 접근 입니다.");
      }

      const userId = req.user._id;

      req.session.destroy((err) => {
        if (err) next(err);
      });

      //refreshToken 제거
      await userService.clearRefreshToken(userId);

      //passport에 의해 생선된 인증용 쿠키 제거
      res.clearCookie("connect.sid");

      res.clearCookie("accessToken");

      res.status(200).json({ result: "success" });
    } catch (err) {
      next(err);
    }
  }
);

userRouter.get(
  "/profile/user",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("유저 정보를 가져올 수 없습니다.");
      }

      const userId = req.user._id;

      const user = await userService.getUser(userId);

      if (!user) {
        throw new Error("존재 하지 않는 회원입니다.");
      }

      return res.status(200).json({
        result: "success",
        data: {
          user,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

userRouter.get(
  "/info/user",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("유저 정보를 가져올 수 없습니다.");
      }

      return res.status(200).json({
        result: "success",
        data: {
          email: req.user.email,
          username: req.user.username,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

//닉네임 수정
userRouter.patch(
  "/username",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("유저 정보를 가져올 수 없습니다.");
      }

      const username: string = req.body.username;
      const userId = req.user._id;

      const updateInfo: UpdateDto = {
        username,
      };

      const updatedUser = await userService.updateUser(userId, updateInfo);

      if (!updatedUser) {
        throw new Error("회원 정보를 수정하는데 에러가 발생했습니다.");
      }

      res.status(200).json({
        result: "success",
        data: {
          username: updatedUser.username,
        },
      });
    } catch (err) {
      next(err);
      return;
    }
  }
);

//비밀 번호 수정
userRouter.patch(
  "/password",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("유저 정보를 가져올 수 없습니다.");
      }

      const currentPassword: string = req.body.currentPassword;
      const newPassword: string = req.body.newPassword;
      const userId = req.user._id;

      const isMatch = await userService.checkPassword(userId, currentPassword);

      if (!isMatch) {
        throw new Error("현재 비밀번호를 정확하게 입력해 주세요.");
      }

      const encodedNewPassword = await userService.encodePassword(newPassword);

      const updateInfo: UpdateDto = {
        password: encodedNewPassword,
      };

      const updatedUser = await userService.updateUser(userId, updateInfo);

      res.status(200).json({
        result: "success",
      });
    } catch (err) {
      next(err);
      return;
    }
  }
);

userRouter.post(
  "/reset",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email: string = req.body.email;

      await userService.findPassword(email);

      return res.status(200).json({
        result: "success",
      });
    } catch (err) {
      next(err);
      return;
    }
  }
);

userRouter.delete(
  "/withdraw",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("유저 정보를 가져올 수 없습니다.");
      }

      const userId = req.user._id;
      const email = req.user.email;
      const likes = req.user.likes;

      await likeServie.deleteAll(userId, likes);
      await userService.deleteUser(userId, email);

      req.session.destroy((err) => {
        if (err) next(err);
      });

      res.clearCookie("accessToken");

      res.clearCookie("connect.sid");

      res.status(200).json({ result: "success" });
    } catch (err) {
      next(err);
      return;
    }
  }
);

export { userRouter };
