import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, TrendingUp, CreditCard, Users } from 'lucide-react';
import { format } from 'date-fns';

const VIP_PRICE = 2999;

const PaymentsPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await pb.collection('vip_members').getList(1, 500, { sort: '-created' });
        setRecords(res.items);
      } catch {
        toast({ title: 'Failed to load payments', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = records.filter(r => {
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchSearch = !search ||
      r.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      r.email?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const activeCount = records.filter(r => r.status === 'active').length;
  const expiredCount = records.filter(r => r.status === 'expired' || r.status === 'inactive').length;
  const totalRevenue = records.length * VIP_PRICE;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Payments & Revenue</h1>
          <p className="text-muted-foreground text-sm">VIP subscription payment records</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-5 flex items-center gap-4">
              <div className="p-3 bg-green-500 rounded-xl shrink-0"><TrendingUp className="h-5 w-5 text-white" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Est. Total Revenue</p>
                <p className="text-xl font-bold">PKR {totalRevenue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 flex items-center gap-4">
              <div className="p-3 bg-purple-500 rounded-xl shrink-0"><CreditCard className="h-5 w-5 text-white" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Active Subscriptions</p>
                <p className="text-xl font-bold">{activeCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 flex items-center gap-4">
              <div className="p-3 bg-gray-400 rounded-xl shrink-0"><Users className="h-5 w-5 text-white" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Expired / Inactive</p>
                <p className="text-xl font-bold">{expiredCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or email..." value={search}
              onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
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
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Subscribed</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">No payment records found</TableCell>
                  </TableRow>
                ) : filtered.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.fullName}</TableCell>
                    <TableCell className="text-sm">{r.email}</TableCell>
                    <TableCell className="text-sm">{r.phone}</TableCell>
                    <TableCell className="text-sm">{r.paymentMethod}</TableCell>
                    <TableCell className="font-medium text-sm">PKR {VIP_PRICE.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {r.subscriptionDate ? format(new Date(r.subscriptionDate), 'MMM d, yyyy') : '—'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {r.expiryDate ? format(new Date(r.expiryDate), 'MMM d, yyyy') : '—'}
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                        r.status === 'active' ? 'bg-green-100 text-green-700' :
                        r.status === 'expired' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{r.status || 'active'}</span>
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

export default PaymentsPage;
