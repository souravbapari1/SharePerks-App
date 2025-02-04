import JWT from "expo-jwt";

import { SupportedAlgorithms } from "expo-jwt/dist/types/algorithms";
import { JWTBody } from "expo-jwt/dist/types/jwt";
import { SC_Secret } from "./keys";
export const createJwt = (data: JWTBody) => {
  const expirationTimeInSeconds =
    Math.floor(Date.now() / 1000) + 180 * 24 * 60 * 60; // 30 days
  data.exp = expirationTimeInSeconds;
  return JWT.encode(data, SC_Secret, {
    algorithm: SupportedAlgorithms.HS512,
  });
};
