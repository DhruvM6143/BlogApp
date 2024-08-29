import asyncHandler from '../Middleware/asyncHandler.middleware.js'
import User from '../Models/User.model.js';
import bcryptjs from 'bcryptjs';
import generateToken from '../Utils/generateToken.js';

export const register = asyncHandler(async (req, res) => {
    try {
        const { email, password, username, Name } = req.body;
        if (!username || !email || !password || !Name) {
            throw new Error("Please fill all the input")
        }


        const user = await User.findOne({ email });
        if (user) res.status(400).send("User already exists")

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({ username, email, Name, password: hashedPassword })

        try {
            await newUser.save();
            generateToken(res, newUser._id);
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                Name: newUser.Name
            })
        } catch (error) {
            res.status(500);
            throw new error("Invalid user data", error)
        }



    } catch (error) {
        console.log(error);

    }
})

export const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Please provide email and password")
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("Invalid email or password")

        if (user) {
            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid password")
            }
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                email: user.email,
                username: user.username,
                Name: user.Name
            })
            return;
        }

    } catch (error) {
        throw new Error(error.message);
    }
})

export const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: "Logged out" })
})

export const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

export const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            email: user.email,
            Name: user.Name,
            username: user.username
        });
    }
    else {
        res.status(404);
        throw new Error("User not found.");
    }
})

export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.Name = req.body.Name || user.Name;

        if (req.body.password) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            Name: updatedUser.Name,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.status(200).send("User deleted successfully");
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }


})

export const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error("Cannot delete admin user");
        }
        await User.deleteOne({ _id: user._id })
    }
    else {
        throw new Error("User not found");
    }

})

export const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.Name = req.body.Name || user.Name;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            Name: updatedUser.Name,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})