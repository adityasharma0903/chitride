import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface JwtUserPayload {
  sub: string;
  email: string;
  role: "user" | "admin";
}

export const signAccessToken = (payload: JwtUserPayload) =>
  jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });

export const signRefreshToken = (payload: JwtUserPayload) =>
  jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtUserPayload & jwt.JwtPayload;
