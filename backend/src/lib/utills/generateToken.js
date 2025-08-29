import jwt from 'jsonwebtoken';

export const generateToken = (res, user) => { 
    const token = jwt.sign(
        { user },
        process.env.JWT_SECRET,
        { expiresIn: '15d' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "none",
        maxAge: 15*24*60*60*1000,
    });

    return token;
}