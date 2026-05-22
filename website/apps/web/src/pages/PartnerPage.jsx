import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Briefcase, TrendingUp, BarChart3, Clock, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PartnerRegistrationForm from '@/components/PartnerRegistrationForm';

const benefits = [
  { icon: Users, title: 'Reach More Players', description: 'Access thousands of active padel enthusiasts searching for courts every day across Pakistan.' },
  { icon: Briefcase, title: 'Effortless Management', description: 'Streamline operations with our booking and scheduling tools built specifically for court owners.' },
  { icon: TrendingUp, title: 'Increase Revenue', description: 'Maximize court utilization and minimize empty slots with smart real-time availability management.' },
  { icon: BarChart3, title: 'Real-Time Analytics', description: 'Track bookings, revenue, and player trends with your dedicated partner dashboard.' },
  { icon: Clock, title: 'Save Time', description: 'Automated confirmations, reminders, and cancellations free up your team to focus on the game.' },
  { icon: Shield, title: 'Trusted Platform', description: "PaddlesPK is Pakistan's leading padel platform — your brand gains visibility and credibility." },
];

const steps = [
  { num: '01', title: 'Register Your Arena', desc: 'Fill in your arena details — location, courts, pricing, and amenities.' },
  { num: '02', title: 'Get Verified', desc: 'Our team reviews your listing within 24–48 hours and activates your profile.' },
  { num: '03', title: 'Start Receiving Bookings', desc: 'Your arena goes live, players book instantly, and revenue flows directly to you.' },
];

const stats = [
  { value: '500+', label: 'Active Players' },
  { value: '20+', label: 'Partner Arenas' },
  { value: '3', label: 'Cities' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const PartnerPage = () => {
  return (
    <>
      <Helmet>
        <title>Partner With Us — PaddlesPK</title>
        <meta name="description" content="Register your padel arena on PaddlesPK and reach thousands of players across Pakistan. Manage bookings, increase revenue, and grow your business." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-background pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Grow Your Padel Business<br />
                <span className="text-primary">with PaddlesPK</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join Pakistan's fastest-growing padel network. List your arena, reach thousands of players,
                and manage bookings — all in one place.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="py-12 bg-card/40 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Partner With Us?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Everything you need to run a successful padel arena business
              </p>
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

        {/* How it works */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-extrabold text-primary">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration form */}
        <section id="register" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Register Your Arena</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Fill in the details below and our team will get in touch within 24 hours.
              </p>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <PartnerRegistrationForm />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PartnerPage;
