import jwt from 'jsonwebtoken';
export const generateToken = (userID, res) => {

    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days in milliseconds
        httpOnly: true,// Secure cookie prevent XSS attacks
        sameSite: 'strict', // CSRF protection
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production

    });
    return token;
    
}