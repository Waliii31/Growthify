import { Check, Sparkles, Building, Star } from 'lucide-react';
import { Button } from '@/components/ui';
import type { PlanOption } from '@/types';

interface PlanCardProps {
  plan: PlanOption;
  isActive: boolean;
  isAnnual: boolean;
  onSelect: (id: PlanOption['id']) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, isActive, isAnnual, onSelect }) => {
  const displayPrice = isAnnual ? plan.priceAnnually : plan.priceMonthly;

  return (
    <div
      className={`relative flex flex-col group transition-all duration-300 ${
        plan.highlighted ? 'md:-mt-3 md:mb-3 z-10' : ''
      }`}
    >
      {/* Backglow for highlighted plan */}
      {plan.highlighted && (
        <div className="absolute -inset-1.5 bg-linear-to-b from-secondary to-primary rounded-2xl blur-xl opacity-35 group-hover:opacity-45 transition-all duration-500" />
      )}

      <div
        className={`relative bg-surface-lowest rounded-2xl p-5 sm:p-6 md:p-8 border flex-col flex grow h-full ${
          plan.highlighted
            ? 'border-secondary shadow-xl'
            : isActive
              ? 'border-primary shadow-md'
              : 'border-outline-variant/60 shadow-xs hover:border-outline'
        }`}
      >
        {/* Popular badge */}
        {plan.highlighted && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-secondary text-white font-display text-xs font-bold px-4 py-1 rounded-full shadow-sm flex items-center gap-1.5 uppercase tracking-wider select-none whitespace-nowrap">
            <Star className="w-3.5 h-3.5 fill-current" /> Most Popular
          </div>
        )}

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="font-display font-black text-xl text-on-surface flex items-center gap-2">
              {plan.name}
              {plan.id === 'pro' && <Sparkles className="w-4 h-4 text-secondary fill-secondary" />}
              {plan.id === 'enterprise' && <Building className="w-4.5 h-4.5 text-primary" />}
            </h3>
            {isActive && (
              <span className="text-[10px] uppercase font-black bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full select-none whitespace-nowrap">
                Current Active
              </span>
            )}
          </div>
          <p className="font-sans text-xs text-on-surface-variant h-10 mt-2 leading-relaxed">
            {plan.description}
          </p>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="font-display font-black text-3xl sm:text-4xl text-on-surface leading-none">
              ${displayPrice}
            </span>
            <span className="font-sans text-xs text-outline font-semibold uppercase">/ month</span>
          </div>
          {isAnnual && plan.priceAnnually > 0 && (
            <span className="text-[10px] text-secondary font-semibold mt-1 block">
              Billed ${plan.priceAnnually * 12} annually
            </span>
          )}
        </div>

        {/* Features */}
        <ul className="grow space-y-4 mb-8">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <div
                className={`p-1 rounded-full shrink-0 flex items-center justify-center ${
                  plan.highlighted ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3px]" />
              </div>
              <span className="font-sans text-sm text-on-surface font-medium leading-tight">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant={plan.highlighted ? 'ai' : isActive ? 'primary' : 'secondary'}
          className="w-full py-3 mt-auto font-display font-bold uppercase tracking-wider text-xs"
          onClick={() => onSelect(plan.id)}
        >
          {isActive ? 'Current Plan' : plan.id === 'enterprise' ? 'Contact Sales' : `Upgrade to ${plan.name}`}
        </Button>
      </div>
    </div>
  );
};
