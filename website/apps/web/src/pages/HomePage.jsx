
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, MapPin, DollarSign, Award, Search, Filter, Briefcase, TrendingUp, Users, SlidersHorizontal, LayoutGrid, List, X } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArenaCard from '@/components/ArenaCard.jsx';
import FeatureCard from '@/components/FeatureCard.jsx';
import BookingForm from '@/components/BookingForm.jsx';
import AdvancedFilterPanel from '@/components/AdvancedFilterPanel.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DEFAULT_ADVANCED_FILTERS = {
  cities: [],
  priceFrom: '',
  priceTo: '',
  courtTypes: [],
  environments: [],
  surfaces: [],
  facilities: [],
  sortBy: 'default',
};

const allArenas = [
  {
    name: 'Elite Padel Club',
    location: 'Lahore',
    courtType: 'Professional Glass Court',
    price: 'Rs. 2,500',
    priceNum: 2500,
    image: 'https://images.unsplash.com/photo-1642352684040-ac721f390031',
    indoor: true,
    surface: 'Glass',
    facilities: ['Parking', 'Locker Rooms', 'Coaching', 'Cafe'],
  },
  {
    name: 'Court Masters',
    location: 'Karachi',
    courtType: 'Premium Indoor Court',
    price: 'Rs. 2,800',
    priceNum: 2800,
    image: 'https://images.unsplash.com/photo-1691258571040-dd64c51532b4',
    indoor: true,
    surface: 'Artificial Grass',
    facilities: ['Parking', 'Locker Rooms'],
  },
  {
    name: 'Padel Paradise',
    location: 'Islamabad',
    courtType: 'Professional Glass Court',
    price: 'Rs. 2,600',
    priceNum: 2600,
    image: 'https://images.unsplash.com/photo-1642352684040-ac721f390031',
    indoor: true,
    surface: 'Glass',
    facilities: ['Parking', 'Coaching', 'Cafe'],
  },
  {
    name: 'DHA Sports Complex',
    location: 'Lahore',
    courtType: 'Outdoor Court',
    price: 'Rs. 2,000',
    priceNum: 2000,
    image: 'https://images.unsplash.com/photo-1691258571040-dd64c51532b4',
    indoor: false,
    surface: 'Concrete',
    facilities: ['Parking'],
  },
  {
    name: 'Smash Arena',
    location: 'Rawalpindi',
    courtType: 'Standard Court',
    price: 'Rs. 1,800',
    priceNum: 1800,
    image: 'https://images.unsplash.com/photo-1642352684040-ac721f390031',
    indoor: false,
    surface: 'Synthetic',
    facilities: ['Parking', 'Equipment Rental'],
  },
  {
    name: 'Peshawar Padel Hub',
    location: 'Peshawar',
    courtType: 'Premium Indoor Court',
    price: 'Rs. 2,200',
    priceNum: 2200,
    image: 'https://images.unsplash.com/photo-1691258571040-dd64c51532b4',
    indoor: true,
    surface: 'Artificial Grass',
    facilities: ['Parking', 'Locker Rooms', 'First Aid'],
  },
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

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [advancedFilters, setAdvancedFilters] = useState(DEFAULT_ADVANCED_FILTERS);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const arenaCounts = useMemo(() => {
    const counts = {};
    allArenas.forEach(a => {
      counts[a.location] = (counts[a.location] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredArenas = useMemo(() => {
    const af = advancedFilters;

    let results = allArenas.filter(arena => {
      const matchesSearch =
        !searchTerm ||
        arena.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        arena.location.toLowerCase().includes(searchTerm.toLowerCase());

      const activeCities = af.cities.length > 0 ? af.cities : (selectedCity !== 'all' ? [selectedCity] : []);
      const matchesCity =
        activeCities.length === 0 ||
        activeCities.some(c => arena.location.toLowerCase() === c.toLowerCase());

      let matchesBasicPrice = true;
      if (selectedPrice === 'low') matchesBasicPrice = arena.priceNum < 2600;
      if (selectedPrice === 'high') matchesBasicPrice = arena.priceNum >= 2600;

      const matchesPriceFrom = !af.priceFrom || arena.priceNum >= parseInt(af.priceFrom);
      const matchesPriceTo = !af.priceTo || arena.priceNum <= parseInt(af.priceTo);

      const matchesCourtType =
        af.courtTypes.length === 0 || af.courtTypes.includes(arena.courtType);

      const matchesEnvironment =
        af.environments.length === 0 ||
        (af.environments.includes('Indoor') && arena.indoor) ||
        (af.environments.includes('Outdoor') && !arena.indoor);

      const matchesSurface =
        af.surfaces.length === 0 || af.surfaces.includes(arena.surface);

      const matchesFacilities =
        af.facilities.length === 0 ||
        af.facilities.every(f => arena.facilities.includes(f));

      return (
        matchesSearch &&
        matchesCity &&
        matchesBasicPrice &&
        matchesPriceFrom &&
        matchesPriceTo &&
        matchesCourtType &&
        matchesEnvironment &&
        matchesSurface &&
        matchesFacilities
      );
    });

    if (af.sortBy === 'price_asc') results = [...results].sort((a, b) => a.priceNum - b.priceNum);
    if (af.sortBy === 'price_desc') results = [...results].sort((a, b) => b.priceNum - a.priceNum);
    if (af.sortBy === 'name_asc') results = [...results].sort((a, b) => a.name.localeCompare(b.name));

    return results;
  }, [searchTerm, selectedCity, selectedPrice, advancedFilters]);

  const activeFilterCount = useMemo(() => {
    const af = advancedFilters;
    return [
      af.cities.length,
      af.courtTypes.length,
      af.environments.length,
      af.surfaces.length,
      af.facilities.length,
      af.priceFrom ? 1 : 0,
      af.priceTo ? 1 : 0,
      af.sortBy !== 'default' ? 1 : 0,
    ].reduce((a, b) => a + b, 0);
  }, [advancedFilters]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setSelectedPrice('all');
    setAdvancedFilters(DEFAULT_ADVANCED_FILTERS);
  };

  const scrollToBooking = () => {
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
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
                      onChange={e => setSearchTerm(e.target.value)}
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
                        <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
                        <SelectItem value="peshawar">Peshawar</SelectItem>
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
                      document.getElementById('arenas')?.scrollIntoView({ behavior: 'smooth' });
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
                  onClick={() => {
                    setFilterSheetOpen(true);
                    document.getElementById('arenas')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Advanced Filter
                  {activeFilterCount > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Arenas Section */}
        <section id="arenas" className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Explore Arenas</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover top-rated padel courts across Pakistan
              </p>
            </motion.div>

            <div className="flex gap-6 items-start">
              {/* Left Sidebar — desktop only */}
              <aside className="hidden lg:block w-72 shrink-0 sticky top-6">
                <AdvancedFilterPanel
                  filters={advancedFilters}
                  onFiltersChange={setAdvancedFilters}
                  arenaCounts={arenaCounts}
                  onClear={clearAllFilters}
                />
              </aside>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-3 mb-6 bg-card border border-border rounded-xl px-4 py-3">
                  {/* Mobile filter button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilterSheetOpen(true)}
                    className="lg:hidden border-border flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full font-bold">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>

                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{filteredArenas.length}</span> arenas found
                  </span>

                  {/* Active filter chips */}
                  {activeFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-xs text-muted-foreground hover:text-foreground ml-auto"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear all filters
                    </Button>
                  )}

                  {/* View toggle */}
                  <div className="ml-auto flex items-center gap-1 border border-border rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={cn(
                        'p-1.5 rounded transition-colors',
                        viewMode === 'grid'
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                      title="Grid view"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={cn(
                        'p-1.5 rounded transition-colors',
                        viewMode === 'list'
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                      title="List view"
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {filteredArenas.length > 0 ? (
                  <div className={viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                  }>
                    {filteredArenas.map((arena, index) => (
                      <ArenaCard
                        key={index}
                        arena={arena}
                        onBook={scrollToBooking}
                        listView={viewMode === 'list'}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-card rounded-2xl border border-border">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-2xl font-bold text-white mb-2">No arenas found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
                    <Button
                      variant="outline"
                      className="mt-6 border-white/20 hover:bg-white/5"
                      onClick={clearAllFilters}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filter Sheet */}
        <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
          <SheetContent side="left" className="w-80 p-0 overflow-y-auto">
            <SheetHeader className="px-4 py-4 border-b border-border">
              <SheetTitle className="text-left">Filters</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <AdvancedFilterPanel
                filters={advancedFilters}
                onFiltersChange={setAdvancedFilters}
                arenaCounts={arenaCounts}
                onApply={() => setFilterSheetOpen(false)}
                onClear={clearAllFilters}
                className="border-0 rounded-none"
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* Booking Section */}
        <section
          id="booking"
          className="relative py-24 parallax-bg"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1642352684040-ac721f390031")' }}
        >
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
                <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* Partner CTA Section */}
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
                <div className="space-y-6 mb-10">
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
                <Button
                  onClick={() => navigate('/partner')}
                  className="h-12 px-8 text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-200"
                >
                  Register Your Arena
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:block"
              >
                <img
                  src="https://images.unsplash.com/photo-1642352684040-ac721f390031"
                  alt="Padel court"
                  className="rounded-2xl w-full h-96 object-cover shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default HomePage;
