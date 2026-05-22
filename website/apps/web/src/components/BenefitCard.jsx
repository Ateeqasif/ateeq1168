
import React from 'react';
import { motion } from 'framer-motion';

const BenefitCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-5 text-primary">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-card-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed flex-grow">{description}</p>
    </motion.div>
  );
};

export default BenefitCard;
