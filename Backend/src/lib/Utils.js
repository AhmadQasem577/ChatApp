import jwt from 'jsonwebtoken';
// This function generates a JWT token and sets it as a cookie in the response object.
// It takes a userID and a response object as parameters.
export const generateToken = (userID, res) => {
// The token is generated using the jwt.sign method, which takes the userID and a secret key from the environment variables as parameters.
// The token is set to expire in a duration specified in the environment variables.
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    // The token is set as a cookie in the response object with various options for security and expiration.
    // The cookie is set to be HTTP only, secure in production, and has a max age of 4 days.
    
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days in milliseconds
        httpOnly: true,// Secure cookie prevent XSS attacks
        sameSite: 'strict', // CSRF protection
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production

    });
    return token;// The generated token is returned for further use if needed.
    
}