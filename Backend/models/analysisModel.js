import mongoose from 'mongoose';

const alternativeHookSchema = new mongoose.Schema({
  type: { type: String, required: true },
  text: { type: String, required: true },
});

const aiFeedbackSchema = new mongoose.Schema({
  type: { type: String, enum: ['success', 'info', 'warning'], required: true },
  text: { type: String, required: true },
});

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: { type: String, required: true },
    originalText: { type: String, required: true },
    optimizedText: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    score: { type: Number, required: true },
    status: { type: String, required: true, default: 'Ready' },
    hookStrength: { type: String, required: true },
    readability: { type: String, required: true },
    engagementProbability: { type: String, required: true },
    tags: [{ type: String }],
    alternativeHooks: [alternativeHookSchema],
    aiFeedback: [aiFeedbackSchema],
  },
  {
    timestamps: true, // Will automatically handle date tracking (instead of dateStr)
  }
);

const Analysis = mongoose.model('Analysis', analysisSchema);

export default Analysis;
