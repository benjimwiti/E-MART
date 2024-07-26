import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'

export const checkDuplicateUser = async (email) => {
    const userExists = await User.findOne({ email });
    if (userExists) res.status(400).send("User already exists");
}

export const createNewUser = async ({ username, email, hash }) => {
    const registeringUser = new User({
        username,
        email,
        password: hash
    })

    try {
        const savedUser = await registeringUser.save()
        const userDetails = returnMinimalUserDetails(savedUser)
        return userDetails
    } catch (error) {
        throw new Error(`unable to save User; ${error.message}`)
    }
}

export const returnMinimalUserDetails = (user) => {
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    }
}

export const findUser = async (email) => {
    try {
        const user = await User.findOne({ email })
        return user
    } catch (error) {
        throw new Error(`unable to find User; ${err.message}`)
    }
}

export const findAllUsers = async () => {
    try {
        const users = await User.find({})
        return users
    } catch (error) {
        throw new Error(`unable to find All Users; ${err.message}`)
    }
}
export const findUserById = async (id) => {
    try {
        const user = await User.findById(id)
        return user
    } catch (error) {
        throw new Error(`unable to find User by Id; ${err.message}`)
    }
}
