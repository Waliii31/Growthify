import Analysis from '../models/analysisModel.js';

const MONTHLY_ANALYSIS_LIMIT = 10;

const getMonthStart = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

// @desc    Get all analyses for logged in user
// @route   GET /api/analyses
// @access  Private
const getAnalyses = async (req, res) => {
  const analyses = await Analysis.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(analyses);
};

// @desc    Create a new analysis (Draft only, no AI yet)
// @route   POST /api/analyses
// @access  Private
const createAnalysis = async (req, res) => {
  const { draftText, tone, audience } = req.body;

  if (!draftText) {
    return res.status(400).json({ message: 'Please add draft text' });
  }

  const monthStart = getMonthStart();
  const monthlyUsage = await Analysis.countDocuments({
    user: req.user._id,
    createdAt: { $gte: monthStart },
  });

  if (monthlyUsage >= MONTHLY_ANALYSIS_LIMIT) {
    return res.status(429).json({
      message: 'Monthly post limit reached. Your 10 free posts reset next month.',
      limit: MONTHLY_ANALYSIS_LIMIT,
      used: monthlyUsage,
      remaining: 0,
      resetsAt: new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1),
    });
  }

  const title = draftText.length > 50 ? `${draftText.substring(0, 50)}...` : draftText;

  let aiResult = null;

  try {
    // Forward the request to the Python AI Microservice
    const agentResponse = await fetch('http://127.0.0.1:8000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ draftText, tone, audience }),
    });

    if (agentResponse.ok) {
      aiResult = await agentResponse.json();
    } else {
      console.error('Python Agent Error:', await agentResponse.text());
    }
  } catch (error) {
    console.error('Failed to connect to Python Agent:', error.message);
  }

  // If the agent succeeds, save the full result. Otherwise, fallback to a Draft state.
  const analysisData = {
    user: req.user._id,
    title,
    originalText: draftText,
    optimizedText: aiResult?.optimizedText || 'AI Optimization Pending...',
    category: aiResult ? 'Tech & Innovation' : 'Draft',
    subCategory: aiResult ? 'AI Optimized' : 'Pending',
    score: aiResult?.score || 0,
    status: aiResult ? 'Ready' : 'Draft',
    hookStrength: aiResult?.hookStrength || 'Pending',
    readability: aiResult?.readability || 'Pending',
    engagementProbability: aiResult?.engagementProbability || 'Pending',
    tags: aiResult?.tags || [],
    alternativeHooks: aiResult?.alternativeHooks || [],
    aiFeedback: aiResult?.aiFeedback || [],
  };

  const analysis = await Analysis.create(analysisData);

  res.status(201).json({
    ...analysis.toObject(),
    usage: {
      limit: MONTHLY_ANALYSIS_LIMIT,
      used: monthlyUsage + 1,
      remaining: Math.max(MONTHLY_ANALYSIS_LIMIT - monthlyUsage - 1, 0),
      resetsAt: new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1),
    },
  });
};

// @desc    Update an analysis
// @route   PUT /api/analyses/:id
// @access  Private
const updateAnalysis = async (req, res) => {
  const analysis = await Analysis.findById(req.params.id);

  if (!analysis) {
    return res.status(404).json({ message: 'Analysis not found' });
  }

  // Make sure the logged in user matches the analysis user
  if (analysis.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  const updatedAnalysis = await Analysis.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedAnalysis);
};

// @desc    Delete an analysis
// @route   DELETE /api/analyses/:id
// @access  Private
const deleteAnalysis = async (req, res) => {
  const analysis = await Analysis.findById(req.params.id);

  if (!analysis) {
    return res.status(404).json({ message: 'Analysis not found' });
  }

  // Make sure the logged in user matches the analysis user
  if (analysis.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  await analysis.deleteOne();

  res.json({ id: req.params.id });
};

export { getAnalyses, createAnalysis, updateAnalysis, deleteAnalysis };
