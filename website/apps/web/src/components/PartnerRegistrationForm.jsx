
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

const PartnerRegistrationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    courtName: '',
    location: '',
    numberOfCourts: '',
    courtType: '',
    pricePerHour: '',
    ownerName: '',
    email: '',
    phone: '',
    description: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.terms) {
      toast({
        title: 'Terms Required',
        description: 'You must agree to the Terms & Conditions.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const payload = {
        courtName: formData.courtName,
        location: formData.location,
        numberOfCourts: Number(formData.numberOfCourts),
        courtType: formData.courtType,
        pricePerHour: Number(formData.pricePerHour),
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        description: formData.description,
      };

      await pb.collection('partners').create(payload, { $autoCancel: false });
      
      toast({
        title: 'Registration Successful!',
        description: 'Your court has been registered. Our team will contact you shortly.',
      });
      
      // Reset form
      setFormData({
        courtName: '', location: '', numberOfCourts: '', courtType: '', pricePerHour: '', ownerName: '', email: '', phone: '', description: '', terms: false
      });
      
    } catch (error) {
      console.error(error);
      toast({
        title: 'Registration Failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-xl p-8 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-card-foreground">Court/Arena Name *</label>
          <Input 
            required name="courtName" value={formData.courtName} onChange={handleChange}
            placeholder="e.g., Elite Padel Club"
            className="bg-background text-foreground"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-card-foreground">Location/City *</label>
          <Select required value={formData.location} onValueChange={(val) => handleSelectChange('location', val)}>
            <SelectTrigger className="bg-background text-foreground">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Lahore">Lahore</SelectItem>
              <SelectItem value="Karachi">Karachi</SelectItem>
              <SelectItem value="Islamabad">Islamabad</SelectItem>
              <SelectItem value="Rawalpindi">Rawalpindi</SelectItem>
              <SelectItem value="Multan">Multan</SelectItem>
              <SelectItem value="Peshawar">Peshawar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-card-foreground">Number of Courts *</label>
          <Input 
            required type="number" min="1" name="numberOfCourts" value={formData.numberOfCourts} onChange={handleChange}
            placeholder="e.g., 3"
            className="bg-background text-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-card-foreground">Court Type *</label>
          <Select required value={formData.courtType} onValueChange={(val) => handleSelectChange('courtType', val)}>
            <SelectTrigger className="bg-background text-foreground">
              <SelectValue placeholder="Select Court Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Indoor">Indoor</SelectItem>
              <SelectItem value="Outdoor">Outdoor</SelectItem>
              <SelectItem value="Mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-card-foreground">Price per Hour (PKR) *</label>
          <Input 
            required type="number" min="0" name="pricePerHour" value={formData.pricePerHour} onChange={handleChange}
            placeholder="e.g., 2500"
            className="bg-background text-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-card-foreground">Owner Full Name *</label>
          <Input 
            required name="ownerName" value={formData.ownerName} onChange={handleChange}
            placeholder="Your Full Name"
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

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-card-foreground">Court Description / Amenities</label>
          <textarea 
            name="description" value={formData.description} onChange={handleChange}
            placeholder="Tell us about the facilities, lighting, parking, etc."
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input 
              type="checkbox" 
              name="terms" 
              checked={formData.terms} 
              onChange={handleChange}
              className="w-5 h-5 rounded border-input text-primary focus:ring-primary bg-background"
            />
            <span className="text-sm text-muted-foreground">I agree to the Terms & Conditions and Privacy Policy.</span>
          </label>
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full mt-8 h-12 text-base font-semibold transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Register Your Court'
        )}
      </Button>
    </form>
  );
};

export default PartnerRegistrationForm;
