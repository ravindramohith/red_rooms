const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your Name'],
        maxLength: [50, 'Your name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//get reset password token 
userSchema.methods.getResetPasswordToken = async function () {
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    //hash and set password to reset token field
    this.resetPasswordToken = await crypto.createHash('sha256').update(resetToken).digest('hex')
    //set token expire time:(30 minutes)
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    return resetToken;
}
module.exports = mongoose.models.User || mongoose.model('User', userSchema);