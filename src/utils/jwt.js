import jwt from "jsonwebtoken";

const TOKEN_SECRET = "api-node-tesis";

export const createToken = (email, id) => {
  const token = jwt.sign(
    {
      email: email,
      id: id,
    },
    TOKEN_SECRET
  );

  return token;
};

export const decodeToken = (token) => {
  const decode = jwt.decode(token);
  return decode.id;
};
