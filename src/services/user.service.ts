import User, { IUser } from "../models/User";

export const listUsers = async () => {
  return User.find().select("-password");
};

export const updateUserRole = async (userId: string, role: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.role = role as any;
  await user.save();

  return user;
};
