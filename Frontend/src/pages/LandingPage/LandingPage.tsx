import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Activity,
  Donut,
  Hash,
  BarChart3,
  Check,
  HelpCircle,
  AlertTriangle,
  Plus,
} from 'lucide-react';
import { Button, Card, ProgressRing, Accordion } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { landingFAQs } from '@/data/faqs';
import { ComparisonCard } from './ComparisonCard';
import { EngagementChart } from './EngagementChart';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Unable to send message');
      }

      setStatus('success');
      setFeedback(data.message || 'Your message was sent successfully.');
      setName('');
      setEmail('');
      setMessage('');
      setWebsite('');
    } catch (err: any) {
      setStatus('error');
      setFeedback(err.message || 'Unable to send message right now.');
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-base text-on-surface flex flex-col overflow-x-hidden">
      {/* Hero */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 text-center flex flex-col items-center gap-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-3xl h-112.5 bg-secondary-purple/10 blur-3xl rounded-full -z-10" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-low text-primary font-display text-xs font-bold border border-primary/20 shadow-xs cursor-pointer hover:bg-surface-high transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-secondary" />
          <span>AI-Powered LinkedIn Optimization</span>
        </motion.div>

        <motion.h1
          className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-on-surface max-w-4xl tracking-tight leading-none mt-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Write LinkedIn Posts that <br className="hidden sm:block" />
          <span className="ai-gradient-text">Actually Get Noticed</span>
        </motion.h1>

        <motion.p
          className="font-sans text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mt-4 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Elevate your professional brand with augmented competence. Our AI analyzes, scores, and refines your drafts to maximize engagement, reach, and authority before you publish.
        </motion.p>
        <motion.p
          className="font-sans text-sm sm:text-base text-primary/80 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Free for every user: 10 AI-powered LinkedIn posts each calendar month, automatically resetting at the start of the next month.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Button
            variant="ai"
            size="lg"
            icon={<ArrowRight className="w-5 h-5 animate-pulse" />}
            iconPosition="right"
            onClick={() => navigate('/analysis')}
          >
            Start Optimizing Free
          </Button>
          {user && (
            <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')}>
              View My Dashboard
            </Button>
          )}
        </motion.div>
      </section>

      {/* Comparison */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <ComparisonCard />
        </motion.div>
      </section>

      {/* Feature Bento */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-on-surface mb-4">
            Precision Engineering for Your Content
          </h2>
          <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Stop guessing what the algorithm wants. Growthify provides real-time, actionable insights to construct the perfect professional narrative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Predictive scoring */}
          <Card hoverGlow className="md:col-span-2 flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/15 transition-colors">
              <Activity className="w-20 sm:w-24 h-20 sm:h-24 stroke-[1px]" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Donut className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-on-surface">Predictive Content Scoring</h3>
              </div>
              <p className="font-sans text-on-surface-variant leading-relaxed text-sm max-w-md">
                Our proprietary analyzer assesses your draft against high-performing patterns, generating live scores for engagement and click potential.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 border-t border-outline-variant/30 pt-6 relative z-10">
              <ProgressRing score={87} size={110} />
              <div className="flex flex-col gap-2.5 w-full sm:w-auto text-sm">
                <div className="flex items-center gap-2 font-semibold text-on-surface">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3px]" /> Hook Strength: Strong
                </div>
                <div className="flex items-center gap-2 font-semibold text-on-surface">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3px]" /> Readability: Optimal
                </div>
                <div className="flex items-center gap-2 font-semibold text-on-surface-variant">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Call to Action: Missing
                </div>
              </div>
            </div>
          </Card>

          {/* Hook Optimization */}
          <Card hoverGlow className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-purple/10 flex items-center justify-center text-secondary mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-on-surface mb-2">Hook Optimization</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                The first two lines determine whether readers click "See more." Growthify suggests scroll-stopping alternatives built on trending insights.
              </p>
            </div>
            <div className="mt-6 border-t border-outline-variant/30 pt-4">
              <div
                className="text-xs bg-bg-base hover:bg-surface-low border border-outline-variant/50 hover:border-primary/50 rounded-lg p-2.5 text-on-surface-variant font-medium flex items-center gap-2 cursor-pointer transition-colors"
                onClick={() => navigate('/analysis')}
              >
                <Sparkles className="w-3.5 h-3.5 text-secondary" /> Highlight current hooks
              </div>
            </div>
          </Card>

          {/* Smart Hashtags */}
          <Card hoverGlow className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Hash className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-on-surface mb-2">Smart Hashtags</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Stop over-saturating keys. We inject a balanced mix of broad and specialized niching hashtags derived from your message graph.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-1.5 pt-4 border-t border-outline-variant/30">
              <span className="text-xs bg-surface-low text-primary-linkedin border border-primary-linkedin/15 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                #Leadership <Plus className="w-3 h-3" />
              </span>
              <span className="text-xs bg-surface-low text-primary-linkedin border border-primary-linkedin/15 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                #SaaSGrowth <Plus className="w-3 h-3" />
              </span>
            </div>
          </Card>

          {/* Engagement Forecasting */}
          <Card hoverGlow className="md:col-span-2 flex flex-col md:flex-row items-center gap-6 sm:gap-8 justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-on-surface">Engagement Forecasting</h3>
              </div>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6">
                Visualize potential reach and demographics before publication. Track time slots, user timezone matches, and corporate tier impressions.
              </p>
              <Button
                variant="ghost"
                size="sm"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={() => navigate('/dashboard')}
              >
                Explore My Analytics
              </Button>
            </div>
            <div className="w-full md:w-1/2">
              <EngagementChart />
            </div>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-outline-variant/20 bg-surface-low/30 rounded-2xl">
        <div className="text-center">
          <p className="text-xs font-bold text-outline uppercase tracking-widest mb-8">
            Trusted by Creators & Executives at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-6 opacity-60">
            <span className="font-display text-lg sm:text-xl font-black text-on-surface-variant tracking-wider">TechCorp</span>
            <span className="font-display text-lg sm:text-xl font-bold text-on-surface-variant tracking-tighter">GlobalFinance</span>
            <span className="font-display text-lg sm:text-xl font-semibold italic text-on-surface-variant">Innovate.io</span>
            <span className="font-display text-lg sm:text-xl font-black text-on-surface-variant uppercase">Apex</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-12 sm:mt-16 text-center flex flex-col items-center">
          <p className="font-display text-lg md:text-xl text-on-surface font-semibold italic leading-relaxed z-10 relative px-4">
            "Growthify changed how I approach personal branding. It doesn't write for me; it structures my chaotic thoughts into high-impact narratives. My inbound leads have tripled since using the hook optimizer."
          </p>
          <div className="flex items-center gap-4 mt-8">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
              alt="Sarah Jenkins"
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-full border-2 border-primary object-cover"
            />
            <div className="text-left">
              <h5 className="font-display font-bold text-sm text-on-surface">Sarah Jenkins</h5>
              <p className="text-xs text-on-surface-variant">VP of Growth • Top LinkedIn Voice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              <Sparkles className="w-4 h-4" /> Contact Us
            </div>
            <div className="space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl font-black text-on-surface max-w-xl">
                Send a message. We'll reply within one business day.
              </h2>
              <p className="font-sans text-sm text-on-surface-variant max-w-xl leading-relaxed">
                Need help, feedback, or want to share a use case? Use the form below and your message will be delivered directly through our secure backend.
              </p>
              <div className="rounded-3xl border border-outline-variant/40 bg-surface-lowest p-6 shadow-sm">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Spam is blocked automatically with a hidden field and rate limits, so your message lands cleanly and safely.
                </p>
              </div>
            </div>
          </div>

          <form
            className="space-y-4 rounded-3xl border border-outline-variant/50 bg-white p-6 shadow-sm"
            onSubmit={handleContactSubmit}
          >
            <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} className="sr-only" autoComplete="off" />
            <label className="block">
              <span className="text-sm font-semibold text-on-surface">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="mt-2 w-full rounded-2xl border border-outline-variant/50 bg-surface-lowest px-4 py-3 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-on-surface">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-outline-variant/50 bg-surface-lowest px-4 py-3 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-on-surface">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how we can help, what you want to build, or if you have feedback about the app."
                rows={6}
                className="mt-2 w-full rounded-2xl border border-outline-variant/50 bg-surface-lowest px-4 py-3 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
                required
              />
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-on-surface-variant">
                {status === 'success' ? (
                  <span className="text-emerald-600">{feedback}</span>
                ) : status === 'error' ? (
                  <span className="text-rose-600">{feedback}</span>
                ) : (
                  <span>We reply quickly and keep your contact info private.</span>
                )}
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 p-1 bg-surface-low rounded-full mb-3 text-primary">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-on-surface">Frequently Asked Questions</h2>
          <p className="font-sans text-sm text-on-surface-variant mt-2">Everything you need to know about optimizing your profile impact.</p>
        </div>
        <Accordion items={landingFAQs} />
      </section>
    </div>
  );
};
