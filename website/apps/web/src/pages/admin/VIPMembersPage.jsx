import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, Crown, ShieldOff, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';

const VIPMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await pb.collection('vip_members').getList(1, 500, { sort: '-created' });
      setMembers(res.items);
    } catch {
      toast({ title: 'Failed to load VIP members', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = members.filter(m => {
    const matchStatus = statusFilter === 'all' || m.status === statusFilter;
    const matchSearch = !search ||
      m.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleToggle = async (member) => {
    const newStatus = member.status === 'active' ? 'inactive' : 'active';
    try {
      await pb.collection('vip_members').update(member.id, { status: newStatus });
      toast({ title: `Membership ${newStatus === 'active' ? 'reactivated' : 'deactivated'}` });
      load();
    } catch {
      toast({ title: 'Error updating membership', variant: 'destructive' });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">VIP Members</h1>
          <p className="text-muted-foreground text-sm">Manage premium VIP subscriptions</p>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or email..." value={search}
              onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-orange-500" /></div>
        ) : (
          <div className="bg-white rounded-xl border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Subscribed</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">No VIP members found</TableCell>
                  </TableRow>
                ) : filtered.map(m => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium flex items-center gap-1.5">
                      <Crown className="h-3.5 w-3.5 text-yellow-500 shrink-0" /> {m.fullName}
                    </TableCell>
                    <TableCell className="text-sm">{m.email}</TableCell>
                    <TableCell className="text-sm">{m.phone}</TableCell>
                    <TableCell className="text-sm">{m.paymentMethod}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {m.subscriptionDate ? format(new Date(m.subscriptionDate), 'MMM d, yyyy') : '—'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {m.expiryDate ? format(new Date(m.expiryDate), 'MMM d, yyyy') : '—'}
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                        m.status === 'active' ? 'bg-green-100 text-green-700' :
                        m.status === 'expired' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{m.status || 'active'}</span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm"
                        className={m.status === 'active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                        onClick={() => handleToggle(m)}>
                        {m.status === 'active'
                          ? <><ShieldOff className="h-3.5 w-3.5 mr-1" /> Deactivate</>
                          : <><ShieldCheck className="h-3.5 w-3.5 mr-1" /> Reactivate</>
                        }
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default VIPMembersPage;
