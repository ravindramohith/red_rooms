import User from "../models/User"
import ErrorHandler from "../utils/errorController"
import catchAsync from "../middlewares/catchAsync"
import APIFeatures from "../utils/apiFeatures"
import cloudinary from "cloudinary"
import absoluteUrl from "next-absolute-url"
import sendEmail from "../utils/sendEmail"
import crypto from "crypto"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const register = catchAsync(async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'RedRooms/avatars',
        width: '150',
        crop: 'scale',
    })
    const { name, email, password } = req.body
    const user = await User.create({
        name, email, password, avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    });

    res.status(200).json({
        success: true,
        message: 'User created successfully'
    })
})


export const getCurrentUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user,
    })
})

export const getAllUsersAdmin = catchAsync(async (req, res) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
})

export const getUserAdmin = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.query.id);

    if (!user) {
        return next(new ErrorHandler('User not found with id ' + req.query.id))
    }

    res.status(200).json({
        success: true,
        user,
    })
})

export const deleteUserAdmin = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.query.id);

    if (!user) {
        return next(new ErrorHandler('User not found with id ' + req.query.id))
    }

    await cloudinary.v2.uploader.destroy(user.avatar.public_id)

    await user.remove()

    res.status(200).json({
        success: true,
    })
})

export const updateUserAdmin = catchAsync(async (req, res) => {

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.query.id, newUser, { new: true, runValidators: true, useFindAndModify: false });
    res.status(200).json({
        success: true,
    })
})

//update user
export const updateCurrentUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name
        user.email = req.body.email
        if (req.body.password) {
            user.password = req.body.password
        }
    }

    //Update avatar 
    if (req.body.avatar !== '') {
        const image_id = user.avatar.public_id
        //destroying prev image
        await cloudinary.v2.uploader.destroy(image_id)
        //uploading new image
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'RedRooms/avatars',
            width: '150',
            crop: 'scale',
        })
        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    await user.save()

    res.status(200).json({
        success: true,
    })
})

//forgot password => /api/forgot/password
export const forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found with this email", 404))
    }

    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })


    const { origin } = absoluteUrl(req)
    const resetUrl = `${origin}/password/reset/${resetToken}`
    const message = `Your password reset url is \n\n${resetUrl} \n\n If you have not requested this email, ignore it.`
    try {
        await sendEmail({
            email: user.email,
            subject: 'Red Rooms Password Recovery',
            message: message
        })
        res.status(200).json({
            success: true,
            message: `Password reset email sent successfully to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})

//reset password => /api/password/reset/:token
export const resetPassword = catchAsync(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = await crypto.createHash('sha256').update(req.query.token).digest('hex')
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
        return next(new ErrorHandler("Password token expired or invalid", 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400))
    }

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save()

    res.status(200).json({
        success: true,
        message: `Password updated successfully`
    })
})

