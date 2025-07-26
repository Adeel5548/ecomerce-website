import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// ✅ Protect route with token
export const requireSignIn = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // ✅ Support "Bearer <token>" or raw token
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "❌ No token provided",
      });
    }

    const decode = JWT.verify(token, process.env.JWT_TOKEN);
    req.user = decode;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).send({
      success: false,
      message: "❌ Invalid or expired token",
    });
  }
};

// ✅ Admin access middleware
export const isAddmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user || user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "⛔ Unauthorized - Admins only",
      });
    }

    next();
  } catch (error) {
    console.log("Admin check error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error checking admin access",
    });
  }
};
