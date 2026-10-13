import crypto from "crypto";

export const generateReference = () => {
  return `${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
};

export const generateRquestId = () => {
  return `${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
};
