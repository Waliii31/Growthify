import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, HelpCircle } from 'lucide-react';
import { Toggle, Accordion, Toast } from '@/components/ui';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useToast } from '@/hooks/useToast';
import { plans } from '@/data/plans';
import { pricingFAQs } from '@/data/faqs';
import { PlanCard } from './PlanCard';
import { SUBSCRIPTION_TOAST_DURATION_MS } from '@/lib/constants';

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentTier, setCurrentTier } = useAnalysis();
  const toast = useToast(SUBSCRIPTION_TOAST_DURATION_MS);

  const [isAnnual, setIsAnnual] = useState(true);

  const handleSelectPlan = (tierId: 'starter' | 'pro' | 'enterprise') => {
    setCurrentTier(tierId);
    toast.show(`Success! You have activated the ${tierId.toUpperCase()} plan.`);
  };

  return (
    <div className="space-y-10 sm:space-y-12 animate-fade-in pb-16">
      {/* Hero */}
      <section className="text-center max-w-2xl mx-auto pt-6 sm:pt-10 px-4">
        <div className="inline-flex items-center gap-2 bg-surface-low border border-outline-variant/50 rounded-full px-4 py-1.5 mb-5 select-none">
          <Zap className="w-4 h-4 text-secondary fill-secondary" />
          <span className="text-xs font-bold text-on-surface-variant">New: Enterprise Fine-tuning Now Available</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-black text-on-surface tracking-tight leading-none">
          Simple, Transparent Pricing.
        </h1>
        <p className="font-sans text-sm md:text-base text-on-surface-variant mt-4 leading-relaxed">
          Supercharge your marketing network. Choose a plan tailored to your personal or agency growth ambitions, from casual drafting to hyper-focused thought leadership.
        </p>
      </section>

      {/* Toggle */}
      <div className="flex justify-center my-10 sm:my-16">
        <Toggle isAnnual={isAnnual} onChange={setIsAnnual} />
      </div>

      {/* Plan cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-7xl mx-auto px-4 sm:px-0">
        {plans.map((p) => (
          <PlanCard
            key={p.id}
            plan={p}
            isActive={currentTier === p.id}
            isAnnual={isAnnual}
            onSelect={handleSelectPlan}
          />
        ))}
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto pt-12 sm:pt-16 px-4 sm:px-0">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 p-1.5 bg-surface-low rounded-full mb-3 text-primary">
            <HelpCircle className="w-5.5 h-5.5" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-black text-on-surface">Frequently Asked Questions</h2>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant mt-2">Clear answers to help you choose the right path.</p>
        </div>
        <Accordion items={pricingFAQs} />
      </section>

      {/* Toast */}
      <Toast message={toast.message} isOpen={toast.isOpen} onClose={toast.close} />
    </div>
  );
};
