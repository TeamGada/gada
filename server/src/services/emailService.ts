import randomstring from "randomstring";
import nodemailer from "nodemailer";

import { emailAuthModel } from "../db";
import { IEmailAuthModel, IEmailService } from "../types";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

class EmailService implements IEmailService {
  private emailAuthModel;

  constructor(emailAuthModel: IEmailAuthModel) {
    this.emailAuthModel = emailAuthModel;
  }

  async sendLink(email: string) {
    const authToken = randomstring.generate(7);

    const emailAuthInfo = {
      email,
      authToken,
    };

    await this.emailAuthModel.create(emailAuthInfo);

    const template = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    
    <body>
        <div>
            <h2>여행가다 회원 가입</h2>
            <a href=
              "http://kdt-sw2-seoul-team05.elicecoding.com:5000/users/confirm-email?email=${email}&authToken=${authToken}"
            >
              인증하기
            </a>
        </div>
    </body>
    <script>

    </script>
    </html>
    `;

    transporter.sendMail({
      from: process.env.MAILER_EMAIL,
      to: email,
      subject: "여행가다 회원가입✔", // Subject line
      html: template, // html body
    });
  }

  async sendResettedPassword(email: string, newPassword: string) {
    const template = `
    <div><h2>여행가다 임시 비밀번호 발급</h2>
      <p>여행가다에서 아래와 같이 비밀번호를 재발급 해드립니다.</p>
      <h4>${newPassword}</h4>
      <a href="http://kdt-sw2-seoul-team05.elicecoding.com/login-form">바로가기</a>     
    </div>
    `;

    transporter.sendMail({
      from: process.env.MAILER_EMAIL,
      to: email,
      subject: "여행가다 임시비밀번호 발급✔", // Subject line
      html: template, // html body
    });
  }
}

const emailService = new EmailService(emailAuthModel);

export { emailService };
