import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt); // example hashed password: $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36W0f6b6j7l4b5j6b6j7l4b5j
};

export const comparePassword = async (
  plain: string,
  hashed: string
): Promise<boolean> => {
  return bcrypt.compare(plain, hashed);
};
