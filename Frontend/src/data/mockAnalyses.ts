import type { PostAnalysis } from '@/types';

export const mockTestimonials = [
  {
    quote: "Growthify changed how I approach personal branding. It doesn't write for me; it structures my chaotic thoughts into high-impact narratives. My inbound leads have tripled since using the hook optimizer.",
    author: "Sarah Jenkins",
    role: "VP of Growth • Top LinkedIn Voice",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
  },
  {
    quote: "As a founder, I had zero time to spend on LinkedIn. Growthify helps me compress 4 hours of writing into 15 minutes of crisp editing. The predicted engagement scores are incredibly accurate.",
    author: "Alex Mercer",
    role: "Senior Product Manager | Founder",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop"
  }
];

export const initialAnalyses: PostAnalysis[] = [
  {
    id: '1',
    title: "The future of B2B marketing isn't just about more content...",
    originalText: "We make a lot of content but we need to think about context. 10k posts were analyzed. People don't want generic advice. They want specific insights. Here is how we improve it by 300%. First expose friction. Challenging norms helps. Make micro case studies.",
    optimizedText: `🚀 The future of B2B marketing isn't just about more content; it's about context.

We analyzed over 10,000 successful LinkedIn posts this quarter, and the data reveals a fascinating shift. Gone are the days of broad, generalized advice. Today's professionals crave deep, hyper-specific insights.

Here are 3 micro-strategies outperforming standard content by 300%:

1️⃣ The "Friction Expose"
Instead of sharing a solution, detail the exact moment a common industry process breaks down. This creates immediate resonance.

2️⃣ Anti-Best Practices
Challenge a widely accepted norm in your field. Provide data to back up why the "old way" is costing companies money.

3️⃣ The Micro-Case Study
Zero in on a single, tiny metric you improved, and explain the exact 3 steps taken. Skip the generic success story.

When you shift from broad broadcasting to narrow, high-utility sharing, you stop being noise and start becoming a signal.

What's a common "best practice" in your industry that you think is secretly outdated? Let's discuss below. 👇`,
    category: "Tech & Innovation",
    subCategory: "Thought Leadership",
    score: 92,
    dateStr: "Today, 09:41 AM",
    status: "Ready",
    hookStrength: "Excellent",
    readability: "8th Grade",
    engagementProbability: "High",
    tags: ["#B2BMarketing", "#ContentStrategy", "#LinkedInTips"],
    alternativeHooks: [
      { type: "Direct Question", text: '"Are your B2B marketing efforts feeling like shouting into the void? You\'re not alone. The data shows..."' },
      { type: "Bold Statement", text: '"Stop writing general advice. We analyzed 10k posts, and here is why hyper-specificity is the new king."' },
      { type: "Curiosity Gap", text: '"There\'s a reason standard content is failing right now. I found 3 micro-strategies outperforming it by 300%."' }
    ],
    aiFeedback: [
      { type: 'success', text: "Strong use of numbered list formatting increases post legibility." },
      { type: 'success', text: "Clear call-to-action at the end encourages comment threads." },
      { type: 'info', text: "Consider adding an extra line break before the final CTA for optimal screen spacing on mobile." }
    ]
  },
  {
    id: '2',
    title: "3 mental models that helped me scale my team from scratch...",
    originalText: "I want to share 3 quick models for leadership. First assume good intent. Second write things down (async is good). Third protect quiet focus hours so people can actually do work. This helped us scale.",
    optimizedText: `Scaling a team is chaotic. If you don't build operational pillars early, your culture breaks at 15+ employees.

Here are 3 hard-won mental models that helped our leadership team scale from scratch without losing our speed:

1. The "Assume Good Intent" Buffer
In fully remote teams, tone gets lost in Slack. Establishing a base rule of positive intent removes 80% of passive-aggressive anxiety.

2. Document Over Sync
If it's not written down, it doesn't exist. We replaced 4 status meetings a week with a structured Monday digest.

3. Silent Core Hours
Block 1:00 PM to 4:00 PM for raw deep work. No Slack, no quick huddles.

What is your most non-negotiable team rule? Let's share tips.`,
    category: "Entrepreneurship",
    subCategory: "Personal Story",
    score: 74,
    dateStr: "Yesterday",
    status: "Draft",
    hookStrength: "Average",
    readability: "6th Grade",
    engagementProbability: "Medium",
    tags: ["#ScalingUp", "#RemoteTeams", "#Leadership"],
    alternativeHooks: [
      { type: "Contrarian View", text: '"Most scaling advice is written for companies that already succeeded. Here is the messy truth of doing it live..."' },
      { type: "Metric Hook", text: '"How we saved 12 team-hours a week by eliminating just two routine syncs. Step-by-step framework inside:"' }
    ],
    aiFeedback: [
      { type: 'success', text: "Tone feels highly approachable and relatable for peers." },
      { type: 'warning', text: "The opening hook is a bit generic. Consider a stronger opening metric Hook." }
    ]
  }
];
