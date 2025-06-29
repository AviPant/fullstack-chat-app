import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'default_secret', {
        expiresIn: '7d'
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set to true only in HTTPS production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return token;
};