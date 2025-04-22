const userService = require("../services/userService");

// @desc    Get user details
// @route   GET /api/users/me
// @access  Private
const getUserDetails = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user details
// @route   PUT /api/users/me
// @access  Private
const updateUserDetails = async (req, res, next) => {
  try {
    const user = await userService.updateUserDetails(req.user.id, req.body);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserDetails,
  updateUserDetails,
};
