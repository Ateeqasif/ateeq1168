
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Zap, MapPin, DollarSign, Award, Search, Filter, Briefcase, TrendingUp, Users } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArenaCard from '@/components/ArenaCard.jsx';
import FeatureCard from '@/components/FeatureCard.jsx';
import BookingForm from '@/components/BookingForm.jsx';
import PartnerRegistrationForm from '@/components/PartnerRegistrationForm.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const allArenas = [
    {
      name: 'Elite Padel Club',
      location: 'Lahore',
      courtType: 'Professional Glass Court',
      price: 'Rs. 2,500',
      image: 'https://images.unsplash.com/photo-1642352684040-ac721f390031',
    },
    {
      name: 'Court Masters',
      location: 'Karachi',
      courtType: 'Premium Indoor Court',
      price: 'Rs. 2,800',
      image: 'https://images.unsplash.com/photo-1691258571040-dd64c51532b4',
    },
    {
      name: 'Padel Paradise',
      location: 'Islamabad',
      courtType: 'Professional Glass Court',
      price: 'Rs. 2,600',
      image: 'https://images.unsplash.com/photo-1642352684040-ac721f390031',
    },
    {
      name: 'DHA Sports Complex',
      location: 'Lahore',
      courtType: 'Outdoor Court',
      price: 'Rs. 2,000',
      image: 'https://images.unsplash.com/photo-1691258571040-dd64c51532b4',
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book your court in seconds with our streamlined reservation system. No waiting, no hassle.',
    },
    {
      icon: MapPin,
      title: 'Multiple Locations',
      description: 'Access premium padel courts across major cities in Pakistan. Find the perfect court near you.',
    },
    {
      icon: DollarSign,
      title: 'Competitive Pricing',
      description: 'Transparent pricing with no hidden fees. Get the best value for professional-grade courts.',
    },
    {
      icon: Award,
      title: 'Professional Courts',
      description: 'Play on world-class courts with proper lighting, surfaces, and facilities maintained to the highest standards.',
    },
  ];

  const filteredArenas = allArenas.filter(arena => {
    const matchesSearch = arena.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          arena.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = selectedCity === 'all' || 
                        arena.location.toLowerCase() === selectedCity.toLowerCase();
                        
    let matchesPrice = true;
    const priceValue = parseInt(arena.price.replace(/\D/g, ''));
    if (selectedPrice === 'low') matchesPrice = priceValue < 2600;
    if (selectedPrice === 'high') matchesPrice = priceValue >= 2600;
    
    return matchesSearch && matchesCity && matchesPrice;
  });

  const scrollToBooking = () => {
    const element = document.querySelector('#booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookArena = (arena) => {
    scrollToBooking();
  };

  return (
    <>
      <Helmet>
        <title>PaddlesPK - Find Your Perfect Padel Court in Pakistan</title>
        <meta name="description" content="Book premium padel arenas instantly with thousands of courts available across Pakistan. Find courts in Lahore, Karachi, and Islamabad." />
      </Helmet>

      <div className="min-h-screen" id="home">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1642352684040-ac721f390031"
              alt="Professional padel court"
              className="w-full h-full object-cover"
            />
            {/* Dark semi-transparent overlay */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-4xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-md" style={{ letterSpacing: '-0.02em' }}>
                Find Your Perfect Padel Court in Pakistan
              </h1>
              <p className="text-lg md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow">
                Book premium padel arenas instantly with thousands of courts available
              </p>

              {/* Search/Filter Bar */}
              <div className="bg-white/10 backdrop-blur-md p-4 md:p-3 rounded-2xl border border-white/20 shadow-2xl w-full">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <Input 
                      placeholder="Arena Name or Location" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-12 bg-white/90 border-white text-black placeholder:text-gray-500 focus-visible:ring-primary text-base"
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="h-12 bg-white/90 border-white text-black text-base">
                        <SelectValue placeholder="All Cities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        <SelectItem value="lahore">Lahore</SelectItem>
                        <SelectItem value="karachi">Karachi</SelectItem>
                        <SelectItem value="islamabad">Islamabad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                      <SelectTrigger className="h-12 bg-white/90 border-white text-black text-base">
                        <SelectValue placeholder="Price Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Price</SelectItem>
                        <SelectItem value="low">Under Rs. 2,600</SelectItem>
                        <SelectItem value="high">Rs. 2,600 & Above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="h-12 md:w-32 bg-[#22c55e] hover:bg-[#16a34a] text-white text-base font-semibold shadow-lg transition-all duration-200"
                    onClick={() => {
                      document.getElementById('arenas').scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              {/* Advanced Filter Button */}
              <div className="mt-6 flex justify-center">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filter
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Arenas Section */}
        <section id="arenas" className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Explore Arenas</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover top-rated padel courts across Pakistan based on your search
              </p>
            </motion.div>

            {filteredArenas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArenas.map((arena, index) => (
                  <ArenaCard key={index} arena={arena} onBook={handleBookArena} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-2xl border border-border">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-bold text-white mb-2">No arenas found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search term to find what you're looking for.</p>
                <Button 
                  variant="outline" 
                  className="mt-6 border-white/20 hover:bg-white/5"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCity('all');
                    setSelectedPrice('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Booking Section */}
        <section 
          id="booking" 
          className="relative py-24 parallax-bg"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1642352684040-ac721f390031")' }}
        >
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-black/75 md:bg-black/60 pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">Reserve Your Court</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow">
                Select your preferred date, time, and location to book instantly
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="rounded-2xl border border-white/10 shadow-2xl overflow-hidden bg-card/95 backdrop-blur-sm">
                <BookingForm arenas={allArenas} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="about" className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Why Choose PaddlesPK</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The easiest way to find and book premium padel courts
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Partner Section */}
        <section id="partner-section" className="py-24 bg-card/50 border-t border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  Partner with <span className="text-primary">PaddlesPK</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Are you a padel court owner? Join Pakistan's fastest-growing padel community. Register your arena today and seamlessly manage your bookings, increase your visibility, and boost your revenue.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary mt-1">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-bold text-white mb-1">Reach More Players</h4>
                      <p className="text-muted-foreground text-sm">Access thousands of active padel enthusiasts looking for courts daily.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary mt-1">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-bold text-white mb-1">Effortless Management</h4>
                      <p className="text-muted-foreground text-sm">Streamline your operations with our robust booking and scheduling tools.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary mt-1">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-bold text-white mb-1">Increase Revenue</h4>
                      <p className="text-muted-foreground text-sm">Maximize your court utilization and minimize empty slots.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <PartnerRegistrationForm />
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
