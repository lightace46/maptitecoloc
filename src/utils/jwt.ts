import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your_secret_key";

export const generateToken = (user: any): string => {
  return jwt.sign({id: user._id, email: user.email}, secretKey, {expiresIn: "1m"});
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid token");
  }
};