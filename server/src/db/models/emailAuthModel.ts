import { model } from "mongoose";
import { IEmailAuthModel, EmailAuth, IEmailAuth } from "../../types";
import { EmailAuthSchema } from "../schemas/emailAuthSchema";

const EmailAuth = model<IEmailAuth>("EmailAuth", EmailAuthSchema);

class EmailAuthModel implements IEmailAuthModel {
  async create(emailAuthInfo: EmailAuth) {
    return await EmailAuth.create({ ...emailAuthInfo });
  }

  async findByEmailAndToken(emailAuthInfo: EmailAuth) {
    return await EmailAuth.findOne({ ...emailAuthInfo });
  }
}

const emailAuthModel = new EmailAuthModel();

export { emailAuthModel };
