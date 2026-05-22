import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Crown, CheckCircle2, Calendar, Percent, Trophy, Star, Headphones, Newspaper } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VIPSubscriptionForm from '@/components/VIPSubscriptionForm';
import { Badge } from '@/components/ui/badge';

const benefits = [
  { icon: Calendar, title: 'Priority Booking', description: 'Get first access to peak-hour slots before they open to regular members.' },
  { icon: Percent, title: '20% Off All Courts', description: 'Enjoy exclusive discounts on every booking across all partner arenas.' },
  { icon: Trophy, title: 'Exclusive Tournaments', description: 'Participate in VIP-only padel tournaments and competitive leagues.' },
  { icon: Star, title: 'Premium Court Access', description: 'Unlock access to premium and newly added courts before anyone else.' },
  { icon: Headphones, title: 'Dedicated Support', description: '24/7 priority customer support with faster response times.' },
  { icon: Newspaper, title: 'Monthly Newsletter', description: 'Receive curated padel tips, event highlights, and community news.' },
];

const VIPPage = () => {
  return (
    <>
      <Helmet>
        <title>VIP Membership — PaddlesPK</title>
        <meta name="description" content="Join PaddlesPK VIP for priority bookings, exclusive discounts, and premium padel court access across Pakistan." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <Crown className="w-10 h-10 text-primary" />
                </div>
              </div>
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 text-sm px-4 py-1">
                Exclusive Membership
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Unlock the Full<br />
                <span className="text-primary">PaddlesPK Experience</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join our VIP community for just{' '}
                <span className="text-white font-semibold">Rs. 1,000/month</span>{' '}
                and enjoy priority access, exclusive discounts, and premium perks at every court.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits grid */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What You Get</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to elevate your padel game</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing card + form */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl border border-primary/30 p-8 shadow-2xl"
              >
                <div className="text-center mb-6">
                  <Crown className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-white">VIP Membership</h2>
                  <div className="mt-3">
                    <span className="text-4xl font-extrabold text-primary">Rs. 1,000</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Cancel anytime. No hidden fees.</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {b.title}
                    </li>
                  ))}
                </ul>

                <VIPSubscriptionForm onSuccess={() => {}} />
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default VIPPage;
