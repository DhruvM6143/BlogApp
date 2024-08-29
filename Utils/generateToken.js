import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true
    })
    return token;

}

export default generateToken;