import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/passwords";
import { signToken } from "../utils/jwt";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: "student" | "instructor" | "admin" = "student"
) => {
  // 1. Check existing email
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");

  // 2. Hash password
  const hashed = await hashPassword(password);

  // 3. Create user
  const user = await User.create({
    name,
    email,
    password: hashed,
    role,
  });

  // 4. Create token
  const token = signToken(user._id.toString(), role);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const loginUser = async (email: string, password: string) => {
  // 1. Find user
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  // 2. Compare passwords
  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid email or password");

  // 3. Sign token
  const token = signToken(user._id.toString(), user.role);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};
