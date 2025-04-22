const passport = require("passport");
const authService = require("../services/authService");

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
// controllers/authController.ts
const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      token,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      token,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Google OAuth login
// @route   GET /api/auth/google
// @access  Public
const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
const googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.redirect("/login?error=google-auth-failed");
    }

    const token = generateToken(user._id);

    // Redirect with token or set cookie
    res.redirect(`/auth/success?token=${token}`);
  })(req, res, next);
};

module.exports = {
  register,
  login,
  getMe,
  googleLogin,
  googleCallback,
};
