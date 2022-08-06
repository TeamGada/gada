import { UpdateDto, UserDocument, IUser, IUserModel } from "../../types";
import { model } from "mongoose";
import { UserSchema } from "../schemas/userSchema";

export const User = model<IUser>("User", UserSchema);

class UserModel implements IUserModel {
  async create(userInfo: UserDocument): Promise<IUser> {
    const createdUser = await User.create({ ...userInfo });
    return createdUser;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email });
    return user;
  }

  async findByUserId(userId: string) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async findByUsername(username: string) {
    const user = await User.findOne({ username });
    return user;
  }

  async findByEmailAndWay(email: string, way: string) {
    const user = await User.findOne({ email, way });
    return user;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async findAllByEmail(email: string) {
    const users = await User.find({ email });
    return users;
  }

  async update(userId: string, updateInfo: UpdateDto) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { ...updateInfo } },
      { new: true }
    );
    return updatedUser;
  }

  async delete(userId: string) {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    return deletedUser;
  }

  //나중에 인자를 _id로 리팩토링 고려
  async reset(email: string, password: string) {
    const resetedUser = await User.findOneAndUpdate(
      { email },
      { $set: { password } }
    );
    return resetedUser;
  }

  async auth(email: string) {
    const authorizedUser = await User.findOneAndUpdate(
      { email },
      { $set: { emailAuth: true } }
    );
    return authorizedUser;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          refreshToken,
        },
      }
    );

    return updatedUser;
  }

  async deleteRefreshToken(userId: string) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $unset: {
          refreshToken: "",
        },
      }
    );

    return updatedUser;
  }
}

const userModel = new UserModel();

export { userModel };
