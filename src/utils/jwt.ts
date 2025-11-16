import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret";

export const signToken = (userId: string, role: string) => {
  // example token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDFhY2YyZTBiM2RiZTc0YjI4ZDIxYjAiLCJpYXQiOjE2OTg0MjI0MDAsImV4cCI6MTY5ODQ4NTgwMH0.DX1fVJt8KXJz3Fz3vY9c3PZ8Q9KfX1Z5Yz5G7QZ6kYkU
  return jwt.sign({ userId, role }, SECRET, {
    expiresIn: "7d",
  });
};
