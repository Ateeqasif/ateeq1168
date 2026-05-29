import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, MessageSquare, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const PRIORITY_STYLES = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-blue-100 text-blue-700',
};

const STATUS_STYLES = {
  open: 'bg-orange-100 text-orange-700',
  in_progress: 'bg-blue-100 text-blue-700',
  closed: 'bg-gray-100 text-gray-600',
};

const SupportTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('open');
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await pb.collection('support_tickets').getList(1, 500, { sort: '-created' });
      setTickets(res.items);
    } catch {
      toast({ title: 'Failed to load tickets', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = tickets.filter(t => {
    const matchTab = tab === 'all' || t.status === tab;
    const matchSearch = !search ||
      t.subject?.toLowerCase().includes(search.toLowerCase()) ||
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.email?.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = {
    open: tickets.filter(t => t.status === 'open' || !t.status).length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length,
  };

  const openTicket = (t) => {
    setSelected(t);
    setReply(t.adminReply || '');
    setNewStatus(t.status || 'open');
    setNewPriority(t.priority || 'medium');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await pb.collection('support_tickets').update(selected.id, {
        adminReply: reply,
        status: newStatus,
        priority: newPriority,
      });
      toast({ title: 'Ticket updated' });
      setSelected(null);
      load();
    } catch {
      toast({ title: 'Error updating ticket', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const TabBadge = ({ count, color }) => (
    <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-medium ${color}`}>{count}</span>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Support Tickets</h1>
          <p className="text-muted-foreground text-sm">Manage customer support requests</p>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by subject, name, or email..." value={search}
            onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="open">Open <TabBadge count={counts.open} color="bg-orange-100 text-orange-700" /></TabsTrigger>
            <TabsTrigger value="in_progress">In Progress <TabBadge count={counts.in_progress} color="bg-blue-100 text-blue-700" /></TabsTrigger>
            <TabsTrigger value="closed">Closed <TabBadge count={counts.closed} color="bg-gray-100 text-gray-600" /></TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="mt-4">
            {loading ? (
              <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-orange-500" /></div>
            ) : (
              <div className="bg-white rounded-xl border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Subject</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">No tickets found</TableCell>
                      </TableRow>
                    ) : filtered.map(t => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">{t.subject}</TableCell>
                        <TableCell className="text-sm">{t.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{t.email}</TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${PRIORITY_STYLES[t.priority] || 'bg-gray-100 text-gray-600'}`}>
                            {t.priority || 'medium'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[t.status] || STATUS_STYLES.open}`}>
                            {(t.status || 'open').replace('_', ' ')}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {t.created ? format(new Date(t.created), 'MMM d, yyyy') : '—'}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => openTicket(t)}>
                            <MessageSquare className="h-4 w-4 mr-1" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">{selected?.subject}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-xs text-muted-foreground mb-0.5">From</p><p className="font-medium">{selected.name}</p></div>
                <div><p className="text-xs text-muted-foreground mb-0.5">Email</p><p className="font-medium">{selected.email}</p></div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1.5">Message</p>
                <div className="bg-gray-50 rounded-lg p-4 text-sm leading-relaxed">{selected.message}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Status</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Priority</Label>
                  <Select value={newPriority} onValueChange={setNewPriority}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Reply to Customer</Label>
                <Textarea value={reply} onChange={e => setReply(e.target.value)}
                  placeholder="Type your reply here..." rows={4} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
              Save & Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default SupportTicketsPage;
