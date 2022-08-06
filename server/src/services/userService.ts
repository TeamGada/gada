import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  UpdateDto,
  UserDocument,
  IWithdrawalModel,
  EmailAuth,
  IUserService,
  IUserModel,
  IEmailAuthModel,
  IEmailService,
} from "../types";
import {
  emailAuthModel,
  userModel,
  withdrawalModel,
  planModel,
  planDetailModel,
} from "../db";
import { emailService } from "./emailService";
import { IPlanModel } from "../types/planTypes";
import { IPlanDetailModel } from "../types/planDetailTypes";

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

class UserService implements IUserService {
  private userModel;
  private emailAuthModel;
  private withdrawalModel;
  private emailService;
  private planModel;
  private planDetailModel;

  constructor(
    userModel: IUserModel,
    emailAuthModel: IEmailAuthModel,
    withdrawalModel: IWithdrawalModel,
    emailService: IEmailService,
    planModel: IPlanModel,
    planDetailModel: IPlanDetailModel
  ) {
    this.userModel = userModel;
    this.emailAuthModel = emailAuthModel;
    this.withdrawalModel = withdrawalModel;
    this.emailService = emailService;
    this.planModel = planModel;
    this.planDetailModel = planDetailModel;
  }

  /**
   * 회원 정보 저장
   */
  async addUser(userInfo: UserDocument) {
    const { email, password } = userInfo;

    //1. 이메일 중복 확인
    const foundUser = await this.userModel.findByEmail(email);

    if (foundUser) {
      if (foundUser.way === "basic") {
        throw new Error("이미 가입된 계정입니다.");
      }
    }
    //2. 패스워드 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    //3. 해쉬회된 패스워드 저장
    const transformedUserInfo: UserDocument = {
      ...userInfo,
      password: hashedPassword,
    };

    //4. db에 저장
    const user = await this.userModel.create(transformedUserInfo);

    return user;
  }

  async getUser(userId: string) {
    return await this.userModel.findByUserId(userId);
  }

  async getUsers() {
    return await this.userModel.findAll();
  }

  async updateUser(userId: string, updateInfo: UpdateDto) {
    const updatedUser = await this.userModel.update(userId, updateInfo);
    return updatedUser;
  }

  async deleteUser(userId: string, email: string) {
    await this.withdrawalModel.createWithdrawalInfo(email);
    await this.planModel.deleteAll(userId);
    await this.planDetailModel.deleteAll(userId);
    return await this.userModel.delete(userId);
  }

  /**
   * 비밀번호 찾기
   */
  async findPassword(email: string) {
    const foundUser = await this.userModel.findByEmailAndWay(email, "basic");

    if (!foundUser) {
      throw new Error("존재하지 않는 이메일 입니다. 다시 한번 확인해 주세요.");
    }

    const newPassword = Math.floor(Math.random() * 10 ** 8).toString();
    const hashedResetPassword = await bcrypt.hash(newPassword, 10);

    await this.userModel.reset(email, hashedResetPassword);

    this.emailService.sendResettedPassword(email, newPassword);

    return newPassword;
  }

  /**
   * 이메일 중복 확인
   */
  async checkDuplicateEmail(email: string, way: string) {
    const foundUser = await userModel.findByEmailAndWay(email, way);
    return foundUser;
  }

  /**
   * 이메일 인증 및 회원가입 링크 전송
   */
  async sendRegisterLink(email: string) {
    this.emailService.sendLink(email);
  }

  /**
   * 유효한 회원가입 링크인지 확인
   */
  async verifyRegisterLink(emailAuthInfo: EmailAuth) {
    const authData = await this.emailAuthModel.findByEmailAndToken(
      emailAuthInfo
    );

    return authData;
  }

  async saveRefreshToken(userId: string) {
    const refreshToken = jwt.sign({}, jwtSecretKey, { expiresIn: "14d" });

    const savedInfo = await this.userModel.updateRefreshToken(
      userId,
      refreshToken
    );

    if (!savedInfo) {
      throw new Error("존재하지 않는 계정입니다.");
    }

    return savedInfo;
  }

  async clearRefreshToken(userId: string) {
    return await this.userModel.deleteRefreshToken(userId);
  }

  async getAccessToken(userId: string, way: string) {
    return jwt.sign(
      {
        id: userId,
        way,
      },
      jwtSecretKey,
      {
        expiresIn: "2h", // 유효기간
      }
    );
  }

  async checkPassword(userId: string, currentPassword: string) {
    const user = await this.userModel.findByUserId(userId);

    if (!user) {
      throw new Error("유저 정보를 가져오는데 알 수 없는 에러가 발생했습니다.");
    }

    const password = user.password;

    const isMatch = await bcrypt.compare(currentPassword, password);

    return isMatch;
  }

  async encodePassword(newPassword: string) {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    return hashedNewPassword;
  }
}

const userService = new UserService(
  userModel,
  emailAuthModel,
  withdrawalModel,
  emailService,
  planModel,
  planDetailModel
);

export { userService };
