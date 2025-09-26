import User from '../models/UserModel.js';
import { hashPassword, comparePassword } from '../utils/hasher.js';
import { generateAccessToken,generateRefreshToken } from '../utils/generateToken.js';

const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({email});
        
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
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
        workEmail: newUser.workEmail,
        role: newUser.role,
      },
    });

    }
    catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const Login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ message: 'User not found!' });
        
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials!' });
        
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
        res.status(500).json({ message: error.message });
        }    
}

    
const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      // Remove refresh token from DB
      await User.updateOne(
        { refreshToken },
        { $unset: { refreshToken: "" } }
      );
    }

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
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export { Register, Login, Logout };