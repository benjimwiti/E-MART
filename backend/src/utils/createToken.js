import jwt from "jsonwebtoken";

export const createToken = (res, userId) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "30d", }
  );

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: 'None',
    maxAge: 100 * 30 * 24 * 60 * 60 * 1000,
  });
  console.log(`token : ${token}`)
  console.log(`cookie : ${res.cookie}`)

  return token;
};

