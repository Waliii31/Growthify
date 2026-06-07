export interface PostMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface PostAnalysis {
  _id?: string;
  id: string;
  title: string;
  originalText: string;
  optimizedText: string;
  category: string;
  subCategory: string;
  score: number;
  dateStr: string;
  status: 'Draft' | 'Ready' | 'Analyzing';
  hookStrength: 'Poor' | 'Average' | 'Strong' | 'Excellent';
  readability: string;
  engagementProbability: 'Low' | 'Medium' | 'High';
  tags: string[];
  alternativeHooks: Array<{
    type: string;
    text: string;
  }>;
  aiFeedback: Array<{
    type: 'success' | 'info' | 'warning';
    text: string;
  }>;
}
