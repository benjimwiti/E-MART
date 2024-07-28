import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/createToken.js";
import { validateInputs } from "../utils/validateInputs.js";
import { checkDuplicateUser, findAllUsers, findUser, findUserById, returnMinimalUserDetails, createNewUser } from "../services/userServices.js";
import { authenticatePassword, encryptPassword } from "../services/authServices.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  validateInputs(req.body, ["username", "email", "password"])

  checkDuplicateUser(email)

  const hash = await encryptPassword(password)

  const userDetails = await createNewUser({ username, email, hash })

  createToken(res, userDetails._id)

  res.status(201)
    .json({
      ...userDetails
    });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  validateInputs(req.body, ["email", "password"])

  const user = await findUser(email)
  const userDetails = returnMinimalUserDetails(user)

  await authenticatePassword(password, user.password)

  createToken(res, userDetails._id);
  res.cookie("token-test", "tokensecret")
  console.log(`check me out, user: ${user.username}`)

  res.status(200)
    .json({
      ...userDetails
    });

});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200)
    .json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await findAllUsers()
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await findUserById(req.user._id);
  const userDetails = returnMinimalUserDetails(user)

  res.status(200)
    .json({
      ...userDetails
    })
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await findUserById(req.user._id);

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    const hash = await encryptPassword(req.body.password)
    user.password = hash
  }

  const updatedUser = await user.save();
  const userDetails = returnMinimalUserDetails(updatedUser)

  res.json({
    ...userDetails
  });

});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: `User ${user.username} removed` });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
