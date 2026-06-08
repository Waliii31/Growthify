import { OAuth2Client } from 'google-auth-library';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      subscriptionTier: user.subscriptionTier,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      subscriptionTier: user.subscriptionTier,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Google OAuth login/register
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
  const { tokenId, accessToken } = req.body;

  try {
    let payload;
    if (accessToken) {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!response.ok) throw new Error('Invalid access token');
      const userInfo = await response.json();
      payload = { email_verified: userInfo.email_verified, name: userInfo.name, email: userInfo.email, sub: userInfo.sub };
    } else {
      let ticket;
      try {
          ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
          });
      } catch (e) {
          // Fallback for mocked token in local dev if CLIENT_ID is not configured properly
          if(tokenId === 'mock_google_token') {
               const mockUser = await User.findOne({ email: 'mock@google.com' }) || await User.create({
                  name: 'Mock Google User',
                  email: 'mock@google.com',
                  googleId: '1234567890'
               });
               return res.json({
                  _id: mockUser._id,
                  name: mockUser.name,
                  email: mockUser.email,
                  subscriptionTier: mockUser.subscriptionTier,
                  token: generateToken(mockUser._id),
               });
          }
          throw e;
      }
      payload = ticket.getPayload();
    }

    const { email_verified, name, email, sub: googleId } = payload;

    if (email_verified) {
      let user = await User.findOne({ email });

      if (user) {
        // User exists, login
        if (!user.googleId) {
          user.googleId = googleId;
          await user.save();
        }
      } else {
        // Create new user
        user = await User.create({
          name,
          email,
          googleId,
        });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        subscriptionTier: user.subscriptionTier,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Email not verified with Google' });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid Google Token' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      subscriptionTier: user.subscriptionTier,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export { registerUser, loginUser, googleAuth, getUserProfile };
