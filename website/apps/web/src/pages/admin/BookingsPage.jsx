import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, XCircle } from 'lucide-react';
import { format } from 'date-fns';

const STATUS_STYLES = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
};

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await pb.collection('bookings').getList(1, 500, { sort: '-created', expand: 'userId' });
      setBookings(res.items);
    } catch {
      toast({ title: 'Failed to load bookings', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = bookings.filter(b => {
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchSearch = !search || b.arenaName?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleCancel = async (id) => {
    try {
      await pb.collection('bookings').update(id, { status: 'cancelled' });
      toast({ title: 'Booking cancelled' });
      load();
    } catch {
      toast({ title: 'Error cancelling booking', variant: 'destructive' });
    }
  };

  const counts = {
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-muted-foreground text-sm">All court bookings across the platform</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Confirmed', count: counts.confirmed, cls: 'border-green-200 bg-green-50 text-green-700' },
            { label: 'Pending', count: counts.pending, cls: 'border-yellow-200 bg-yellow-50 text-yellow-700' },
            { label: 'Cancelled', count: counts.cancelled, cls: 'border-red-200 bg-red-50 text-red-700' },
          ].map(({ label, count, cls }) => (
            <div key={label} className={`border rounded-xl p-4 ${cls}`}>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-2xl font-bold mt-1">{count}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by arena name..." value={search}
              onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  <TableHead>Arena</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Players</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Booked On</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">No bookings found</TableCell>
                  </TableRow>
                ) : filtered.map(b => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.arenaName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[160px] truncate">
                      {b.expand?.userId?.email || b.userId}
                    </TableCell>
                    <TableCell className="text-sm">{b.date}</TableCell>
                    <TableCell className="text-sm">{b.timeSlot}</TableCell>
                    <TableCell className="text-sm">{b.players}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${STATUS_STYLES[b.status] || 'bg-gray-100 text-gray-600'}`}>
                        {b.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {b.created ? format(new Date(b.created), 'MMM d, yyyy') : '—'}
                    </TableCell>
                    <TableCell>
                      {b.status !== 'cancelled' && (
                        <Button variant="ghost" size="icon" title="Cancel booking"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleCancel(b.id)}>
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
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

export default BookingsPage;
