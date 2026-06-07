import type { PlanOption } from '@/types';

export const plans: PlanOption[] = [
  {
    id: 'starter',
    name: "Starter",
    priceMonthly: 0,
    priceAnnually: 0,
    description: "Essential tools to optimize your casual posting rhythm and basic checks.",
    features: [
      "10 AI Post Generations / mo",
      "Standard formatting feedback",
      "Basic Hashtag Suggestions",
      "Single-user library"
    ]
  },
  {
    id: 'pro',
    name: "Pro",
    priceMonthly: 29,
    priceAnnually: 23,
    description: "Advanced AI capabilities for serious creators, founders, and professionals.",
    features: [
      "Unlimited AI Suggestions",
      "Viral Hook Generator",
      "Advanced Post Analytics",
      "Tone & Voice Customization",
      "Scheduling & Calendar integration"
    ],
    highlighted: true
  },
  {
    id: 'enterprise',
    name: "Enterprise",
    priceMonthly: 99,
    priceAnnually: 79,
    description: "Bespoke fine-tuned models and multi-user team workspaces for agencies.",
    features: [
      "Everything in Pro",
      "Team Workspaces & Roles",
      "Custom AI Model Fine-tuning",
      "Dedicated account manager",
      "API programmatic access"
    ]
  }
];
