import jwt from 'jsonwebtoken';

const generateAccessToken  = (user)=>{
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_ACCESS_SECRET || 'test-secret',
        {expiresIn: '30m'}
    );
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET || 'test-refresh' ,
        { expiresIn: '7d' } 
    );
};

export { generateAccessToken, generateRefreshToken };