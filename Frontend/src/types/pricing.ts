export interface PlanOption {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  priceMonthly: number;
  priceAnnually: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
