import jwt from 'jsonwebtoken'
import User from '../Models/User.model.js'
import asyncHandler from './asyncHandler.middleware.js'

export const authenticate = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized,Token Expired");
        }
    }
    else {
        res.status(401);
        throw new Error("Not Authorized,no Token");
    }

});

export const authroizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(403);
        throw new Error("Not Authorized,Admin Privileges Required");
    }
}