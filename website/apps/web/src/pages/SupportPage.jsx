import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MessageSquare, CheckCircle2 } from 'lucide-react';

const SupportPage = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [priority, setPriority] = useState('medium');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await pb.collection('support_tickets').create({ ...data, priority, status: 'open' });
      setSubmitted(true);
    } catch {
      toast({ title: 'Failed to submit ticket', description: 'Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Support — PaddlesPK</title></Helmet>
      <Header />
      <main className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Contact Support</h1>
              <p className="text-muted-foreground mt-2">We'll get back to you as soon as possible</p>
            </div>

            {submitted ? (
              <div className="bg-card border border-border rounded-2xl p-12 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white">Ticket Submitted!</h2>
                <p className="text-muted-foreground mt-2">
                  We've received your request and will respond to your email shortly.
                </p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-1.5">
                    <Label>Full Name</Label>
                    <Input placeholder="Your name" className="h-11"
                      {...register('name', { required: true })} />
                    {errors.name && <p className="text-xs text-red-500">Name is required</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label>Email</Label>
                    <Input type="email" placeholder="you@example.com" className="h-11"
                      {...register('email', { required: true })} />
                    {errors.email && <p className="text-xs text-red-500">Email is required</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label>Subject</Label>
                    <Input placeholder="Brief description of your issue" className="h-11"
                      {...register('subject', { required: true })} />
                    {errors.subject && <p className="text-xs text-red-500">Subject is required</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label>Priority</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low — General question</SelectItem>
                        <SelectItem value="medium">Medium — Issue affecting usage</SelectItem>
                        <SelectItem value="high">High — Urgent / blocking issue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Message</Label>
                    <Textarea placeholder="Describe your issue in detail..." rows={5}
                      {...register('message', { required: true })} />
                    {errors.message && <p className="text-xs text-red-500">Message is required</p>}
                  </div>
                  <Button type="submit" disabled={loading} className="w-full h-12 font-semibold">
                    {loading
                      ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Submitting...</>
                      : <><MessageSquare className="h-4 w-4 mr-2" /> Submit Ticket</>
                    }
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SupportPage;
