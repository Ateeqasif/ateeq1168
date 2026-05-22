
import React from 'react';
import { MapPin, Wifi, ParkingCircle, Dumbbell, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const FACILITY_ICONS = {
  Parking: ParkingCircle,
  Coaching: Dumbbell,
  Cafe: Coffee,
  'Locker Rooms': Wifi,
};

const ArenaCard = ({ arena, onBook, listView = false }) => {
  if (listView) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="group bg-card rounded-xl overflow-hidden border border-border shadow hover:shadow-md hover:border-primary/30 transition-all duration-300 flex"
      >
        {/* Image */}
        <div className="relative w-40 sm:w-52 shrink-0 overflow-hidden">
          <img
            src={arena.image}
            alt={arena.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center gap-3 p-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground truncate">{arena.name}</h3>
            <div className="flex items-center text-muted-foreground mt-1 mb-2">
              <MapPin className="h-3.5 w-3.5 mr-1 shrink-0" />
              <span className="text-sm">{arena.location}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                {arena.courtType}
              </span>
              <span className="inline-block px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                {arena.indoor ? 'Indoor' : 'Outdoor'}
              </span>
              {arena.surface && (
                <span className="inline-block px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                  {arena.surface}
                </span>
              )}
            </div>
            {arena.facilities?.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1.5">
                {arena.facilities.slice(0, 3).join(' · ')}
                {arena.facilities.length > 3 && ` +${arena.facilities.length - 3} more`}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="text-right">
              <span className="text-xl font-bold text-primary">{arena.price}</span>
              <span className="text-xs text-muted-foreground block">/hour</span>
            </div>
            <Button
              size="sm"
              onClick={() => onBook(arena)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-4"
            >
              Book Court
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border hover:border-primary/30"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={arena.image}
          alt={arena.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          <span className="inline-block px-2.5 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            {arena.courtType}
          </span>
          {arena.indoor !== undefined && (
            <span className="inline-block px-2.5 py-1 bg-black/50 text-white text-xs font-medium rounded-full backdrop-blur-sm">
              {arena.indoor ? 'Indoor' : 'Outdoor'}
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold mb-1 text-foreground">{arena.name}</h3>
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="text-sm">{arena.location}</span>
        </div>

        {arena.facilities?.length > 0 && (
          <p className="text-xs text-muted-foreground mb-3">
            {arena.facilities.slice(0, 3).join(' · ')}
            {arena.facilities.length > 3 && ` +${arena.facilities.length - 3}`}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">{arena.price}</span>
            <span className="text-sm text-muted-foreground">/hour</span>
          </div>
        </div>

        <Button
          onClick={() => onBook(arena)}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
        >
          Book Court
        </Button>
      </div>
    </motion.div>
  );
};

export default ArenaCard;
