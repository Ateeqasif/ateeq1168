import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, Eye, Heart, Users, MapPin, TrendingUp, Shield, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const stats = [
  { value: '50+', label: 'Partner Arenas' },
  { value: '5,000+', label: 'Active Players' },
  { value: '3', label: 'Cities Covered' },
  { value: '10,000+', label: 'Bookings Made' },
];

const values = [
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'We build honest relationships with arena owners and players. No hidden fees, no surprises — just straightforward service.',
  },
  {
    icon: Zap,
    title: 'Simplicity First',
    description: 'Booking a court should take seconds, not minutes. We obsess over making every interaction fast, clear, and effortless.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'PaddlesPK exists to grow the padel community in Pakistan. Every feature we build serves the players and arena owners who trust us.',
  },
  {
    icon: TrendingUp,
    title: 'Constant Growth',
    description: 'We are committed to expanding across Pakistan, bringing world-class padel to more cities, more arenas, and more players.',
  },
];

const team = [
  { name: 'Muhammad Ateeq', role: 'Founder & CEO', initials: 'MA' },
  { name: 'Operations Team', role: 'Arena Partnerships', initials: 'OP' },
  { name: 'Tech Team', role: 'Platform & Product', initials: 'TT' },
  { name: 'Support Team', role: 'Customer Success', initials: 'ST' },
];

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us — PaddlesPK</title>
        <meta name="description" content="Learn about PaddlesPK — Pakistan's premier padel court booking platform. Our vision, mission, and the team behind it." />
      </Helmet>
      <Header />

      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-background pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div {...fadeUp()} className="max-w-3xl">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4">About PaddlesPK</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Bringing Padel to<br />
                <span className="text-primary">Every Corner of Pakistan</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                We started with a simple belief: finding and booking a padel court in Pakistan should be as easy as ordering food online. PaddlesPK is the platform we built to make that a reality.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-y border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center">
                  <p className="text-4xl md:text-5xl font-extrabold text-primary mb-2">{s.value}</p>
                  <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
              <motion.div {...fadeUp()}>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why We Built PaddlesPK</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Padel is one of the fastest-growing sports in the world, and Pakistan is no exception. Arenas are opening across Lahore, Karachi, and Islamabad — but finding a court, checking its availability, and booking a slot was still a fragmented, frustrating experience.
                  </p>
                  <p>
                    Players relied on WhatsApp groups, phone calls, and word of mouth. Arena owners had no digital presence. That's the gap we set out to fill.
                  </p>
                  <p>
                    PaddlesPK launched to bring structure to this growing sport — a single platform where players discover courts, compare prices, and book instantly, while arena owners gain a professional digital storefront and a steady flow of bookings.
                  </p>
                </div>
              </motion.div>
              <motion.div {...fadeUp(0.15)} className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-2xl border border-border p-6 flex flex-col items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Pakistan-First</h3>
                  <p className="text-xs text-muted-foreground">Built specifically for Pakistan's padel ecosystem, with local payment methods and local support.</p>
                </div>
                <div className="bg-card rounded-2xl border border-border p-6 flex flex-col items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Passion-Driven</h3>
                  <p className="text-xs text-muted-foreground">We're padel players ourselves. We built what we wished existed.</p>
                </div>
                <div className="bg-card rounded-2xl border border-border p-6 flex flex-col items-start gap-3 col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Growing Fast</h3>
                  <p className="text-xs text-muted-foreground">From a handful of arenas to a national network — and we're just getting started. New cities, new features, new partnerships every month.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp()} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Vision &amp; Mission</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">What drives us every day</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                {...fadeUp(0.1)}
                className="bg-card rounded-2xl border border-primary/20 p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the platform that makes padel accessible to every Pakistani — from beginners picking up a racket for the first time to elite players competing at a national level.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  We envision a Pakistan where every city has thriving padel courts, and where booking one is as natural as booking a ride.
                </p>
              </motion.div>
              <motion.div
                {...fadeUp(0.2)}
                className="bg-card rounded-2xl border border-border p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To connect padel players with the best arenas in Pakistan through a seamless, transparent, and trustworthy platform — while helping arena owners grow their businesses with the tools they need.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  We do this by building great technology, forging strong arena partnerships, and putting our community first in every decision we make.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp()} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">The principles that guide everything we build and every decision we make</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.1)}
                  className="bg-card rounded-2xl border border-border hover:border-primary/40 p-6 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-24 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp()} className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What PaddlesPK Offers</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">A complete ecosystem for Pakistan's padel community</p>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { emoji: '🎾', title: 'For Players', items: ['Discover and compare arenas near you', 'Instant online court booking', 'VIP membership for priority access & discounts', 'Booking history and management', 'Directions to any court'] },
                  { emoji: '🏟️', title: 'For Arena Owners', items: ['Professional digital listing on PaddlesPK', 'Streamlined booking management', 'Verified partner badge', 'Marketing exposure to thousands of players', 'Dedicated partner support'] },
                ].map((card, i) => (
                  <motion.div key={i} {...fadeUp(i * 0.15)} className="bg-card rounded-2xl border border-border p-8">
                    <div className="text-3xl mb-4">{card.emoji}</div>
                    <h3 className="text-xl font-bold text-white mb-5">{card.title}</h3>
                    <ul className="space-y-3">
                      {card.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp()} className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4">Where We Are</span>
                  <h2 className="text-3xl font-bold text-white mb-6">Based in Lahore,<br />Serving All of Pakistan</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Our headquarters are in the heart of DHA Lahore, but our reach extends across Pakistan. We are actively expanding our arena network to Karachi, Islamabad, and beyond.
                  </p>
                  <div className="flex items-start gap-3 bg-card rounded-xl border border-border p-4">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold text-sm">PaddlesPK HQ</p>
                      <p className="text-muted-foreground text-sm">678/E, DHA Phase-5<br />Lahore, Pakistan 54000</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { city: 'Lahore', status: 'Live', count: '30+ arenas', color: 'text-green-400 bg-green-400/10' },
                    { city: 'Karachi', status: 'Coming Soon', count: 'Expanding', color: 'text-yellow-400 bg-yellow-400/10' },
                    { city: 'Islamabad', status: 'Coming Soon', count: 'Expanding', color: 'text-yellow-400 bg-yellow-400/10' },
                    { city: 'More Cities', status: 'Planned', count: '2025–2026', color: 'text-blue-400 bg-blue-400/10' },
                  ].map((city, i) => (
                    <motion.div key={i} {...fadeUp(i * 0.1)} className="flex items-center justify-between bg-card rounded-xl border border-border px-5 py-4">
                      <div>
                        <p className="text-white font-semibold text-sm">{city.city}</p>
                        <p className="text-muted-foreground text-xs">{city.count}</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${city.color}`}>{city.status}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp()} className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Play?</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Join thousands of players already using PaddlesPK to book courts, discover arenas, and grow their game.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold h-12 px-8">
                  <Link to="/#arenas">Find an Arena <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 font-semibold h-12 px-8">
                  <Link to="/partner">Partner With Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default AboutUsPage;
