import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
 
const Authenticate = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    return next();
  } catch (error) {

     if (error.name === "TokenExpiredError") {
      try {

        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
          return res.status(401).json({ message: "Refresh token required" });
        }

        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decodedRefresh.id).select("-password");

        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }

      const newAccessToken = generateAccessToken(user);

        res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 60 * 1000, 
    });
      //console.log(`New access token: ${newAccessToken}`);
        
        res.setHeader("x-access-token", newAccessToken);

        req.user = user;

        return next(); 
      } catch (refreshErr) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
    }

    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

const validate = (schema) => (req,res,next) => {
    const {error} = schema.validate(req.body);
  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    const err = new Error(message);
    res.status(400);
    return next(err);
  }
  next();
};

export { Authenticate,validate };