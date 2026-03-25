import jwt from 'jsonwebtoken';

export const generateToken = (res, user) => { 
    const token = jwt.sign(
        { user },
        process.env.JWT_SECRET,
        { expiresIn: '15d' }
    );

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 15*24*60*60*1000,
    });

    return token;
}
