import type { FAQItem } from '@/types';

export const landingFAQs: FAQItem[] = [
  {
    question: "What is the 'Viral Hook Generator'?",
    answer: "The Viral Hook Generator uses a specialized AI model trained on top-performing LinkedIn posts across various industries. It analyzes your core topic and suggests multiple high-engagement opening lines designed to stop the scroll and encourage 'read more' clicks."
  },
  {
    question: "How does Predictive Content Scoring work?",
    answer: "Our models evaluate factors including text readability level, sentence pacing, bullet pattern structural integrity, topic focus, call-to-action alignment, and initial 'hook' power. It maps these against a knowledge base of high-impressions posts to predict final response success."
  },
  {
    question: "Can I cancel my subscription any time?",
    answer: "Yes, you can upgrade, downgrade, or cancel your active subscription plan immediately from your account settings interface with no extra termination fees."
  }
];

export const pricingFAQs: FAQItem[] = [
  ...landingFAQs,
  {
    question: "Does the AI use my personal data to train models?",
    answer: "No. We prioritize your confidentiality. Your proprietary drafted content, ideas, and schedule are owned entirely by you and are never ingested into standard foundation models without your active consent."
  },
  {
    question: "Is there a trial period?",
    answer: "Yes, our Starter plan is completely free forever to check out the basic optimization metrics and format checks."
  }
];
