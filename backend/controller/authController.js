import User from '../models/UserModel.js';
import { hashPassword, comparePassword } from '../utils/hasher.js';
import { generateAccessToken,generateRefreshToken } from '../utils/generateToken.js';

const Register = async (req, res,next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({email});
        
        if (existingUser) {
            const error = new Error('Email already in use');
            res.status(400);
            return next(error);
        }
        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        
        });

        await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

    }
    catch (error) {
    next(error);
  }
}

const Login = async (req, res,next) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user){
          const error = new Error('User not found!');
          res.status(401);
          return next(error);
          } 
        
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch){
          const error = new Error('Invalid credentials!');
          res.status(401);
          return next(error);
        }
        
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        
         await user.save();

    // Set cookies
        res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 60 * 1000, // 30 min
    });


    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send tokens
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        workEmail: user.workEmail,
        role: user.role,
      },
      accessToken,
    });
    }
    catch (error) {
       next(error);
  }    
}

    
const Logout = async (req, res,next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    // Clear cookies (both tokens)
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

export { Register, Login, Logout };