import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

//GENERATE TOKEN
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "180d",
  });
};

// MIDDLEWARE TO USE BEFORE CONTROLLER TO VERIFY TOKEN AND SET USER ID
export const checkToken = asyncHandler(async (req, res, next) => {
  const token = req.body.access_token;
  // case no Token passed in body
  if (!token) {
    res.status(401).json({ message: "Not authorized, no Token" });
    return;
  }
  try {
    // Verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
});

// MIDDLEWARE TO USE IT IN GET ROUTES :
export const checkTokenFromHeader = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
});
