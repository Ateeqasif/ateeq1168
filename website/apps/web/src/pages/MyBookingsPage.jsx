import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Loader2, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';

const statusStyle = {
  confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const MyBookingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/signin', { state: { from: '/my-bookings' } });
      return;
    }
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const records = await pb.collection('bookings').getFullList({
        filter: `userId = "${user.id}"`,
        sort: '-created',
      });
      setBookings(records);
    } catch {
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await pb.collection('bookings').update(id, { status: 'cancelled' });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Bookings — PaddlesPK</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-bold text-white mb-2">My Bookings</h1>
              <p className="text-muted-foreground mb-10">View and manage your court reservations</p>

              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-2xl border border-border">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-bold text-white mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground mb-6">Book your first padel court to get started.</p>
                  <Button onClick={() => navigate('/')}>Book a Court</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking, i) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-card rounded-2xl border border-border p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-lg font-bold text-white">{booking.arenaName}</h3>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusStyle[booking.status] || statusStyle.confirmed}`}>
                              {booking.status || 'confirmed'}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" /> {booking.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" /> {booking.timeSlot}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Users className="w-4 h-4" /> {booking.players} players
                            </span>
                          </div>
                        </div>
                        {booking.status !== 'cancelled' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => cancelBooking(booking.id)}
                            className="shrink-0 border-red-500/40 text-red-400 hover:bg-red-500/10"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MyBookingsPage;
