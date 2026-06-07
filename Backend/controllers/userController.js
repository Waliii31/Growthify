import User from '../models/userModel.js';
import Analysis from '../models/analysisModel.js';

const MONTHLY_ANALYSIS_LIMIT = 10;

const getMonthStart = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

// @desc    Update user subscription tier
// @route   PATCH /api/users/tier
// @access  Private
const updateSubscriptionTier = async (req, res) => {
  const { tier } = req.body;

  const validTiers = ['starter', 'pro', 'enterprise'];
  if (!validTiers.includes(tier)) {
    return res.status(400).json({ message: 'Invalid subscription tier' });
  }

  const user = await User.findById(req.user._id);

  if (user) {
    user.subscriptionTier = tier;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      subscriptionTier: updatedUser.subscriptionTier,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get current user's free monthly analysis usage
// @route   GET /api/users/usage
// @access  Private
const getUsage = async (req, res) => {
  const monthStart = getMonthStart();
  const used = await Analysis.countDocuments({
    user: req.user._id,
    createdAt: { $gte: monthStart },
  });

  res.json({
    limit: MONTHLY_ANALYSIS_LIMIT,
    used,
    remaining: Math.max(MONTHLY_ANALYSIS_LIMIT - used, 0),
    resetsAt: new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1),
  });
};

export { updateSubscriptionTier, getUsage };
