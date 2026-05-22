
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import pb from '@/lib/pocketbaseClient.js';
import { Loader2 } from 'lucide-react';

const VIPSubscriptionForm = ({ onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    paymentMethod: '',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const ensureAuthenticatedUser = async () => {
    if (pb.authStore.isValid && pb.authStore.model?.id) {
      return pb.authStore.model.id;
    }
    
    // For demo purposes: Auto-create and sign in a temporary user if not authenticated
    // This satisfies the PocketBase userId relation requirement seamlessly
    const tempEmail = `vip_${Date.now()}@example.com`;
    const tempPass = 'password123';
    
    try {
      await pb.collection('users').create({
        email: tempEmail,
        password: tempPass,
        passwordConfirm: tempPass,
        name: formData.fullName
      }, { $autoCancel: false });
      
      const authData = await pb.collection('users').authWithPassword(tempEmail, tempPass, { $autoCancel: false });
      return authData.record.id;
    } catch (err) {
      throw new Error("Authentication failed. Please sign in to continue.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.terms) {
      toast({
        title: 'Terms Required',
        description: 'You must agree to the VIP Membership Terms.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Ensure we have a valid userId
      const userId = await ensureAuthenticatedUser();
      
      const subDate = new Date();
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + 30);
      
      const payload = {
        userId: userId,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        paymentMethod: formData.paymentMethod,
        subscriptionDate: subDate.toISOString(),
        expiryDate: expDate.toISOString(),
        status: 'active'
      };

      await pb.collection('vip_members').create(payload, { $autoCancel: false });
      
      toast({
        title: 'Welcome to VIP!',
        description: 'Your membership has been activated successfully.',
      });
      
      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.error(error);
      toast({
        title: 'Subscription Failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-card-foreground">Full Name *</label>
        <Input 
          required name="fullName" value={formData.fullName} onChange={handleChange}
          placeholder="Enter your full name"
          className="bg-background text-foreground"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-semibold text-card-foreground">Email Address *</label>
        <Input 
          required type="email" name="email" value={formData.email} onChange={handleChange}
          placeholder="you@example.com"
          className="bg-background text-foreground"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-card-foreground">Phone Number *</label>
        <Input 
          required type="tel" name="phone" value={formData.phone} onChange={handleChange}
          placeholder="e.g., +92 300 1234567"
          className="bg-background text-foreground"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-card-foreground">Payment Method *</label>
        <Select required value={formData.paymentMethod} onValueChange={(val) => handleSelectChange('paymentMethod', val)}>
          <SelectTrigger className="bg-background text-foreground">
            <SelectValue placeholder="Select Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Credit Card">Credit Card</SelectItem>
            <SelectItem value="Debit Card">Debit Card</SelectItem>
            <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
            <SelectItem value="JazzCash">JazzCash</SelectItem>
            <SelectItem value="EasyPaisa">EasyPaisa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="pt-2">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input 
            type="checkbox" 
            name="terms" 
            checked={formData.terms} 
            onChange={handleChange}
            className="w-5 h-5 mt-0.5 rounded border-input text-primary focus:ring-primary bg-background shrink-0"
          />
          <span className="text-sm text-muted-foreground leading-snug">
            I agree to the recurring monthly charge of 1,000 PKR and the VIP Membership terms and conditions.
          </span>
        </label>
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full mt-4 h-12 text-base font-semibold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          'Complete Subscription'
        )}
      </Button>
    </form>
  );
};

export default VIPSubscriptionForm;
