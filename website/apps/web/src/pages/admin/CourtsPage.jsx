import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Search, CheckCircle, XCircle, MapPin, Eye, Loader2, Ban } from 'lucide-react';
import { format } from 'date-fns';

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700',
  active: 'bg-green-100 text-green-700',
  blocked: 'bg-red-100 text-red-700',
};

const CourtsPage = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('pending');
  const [selected, setSelected] = useState(null);
  const [approveOpen, setApproveOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [coords, setCoords] = useState({ latitude: '', longitude: '', adminNotes: '' });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await pb.collection('partners').getList(1, 500, { sort: '-created' });
      setCourts(res.items);
    } catch {
      toast({ title: 'Failed to load courts', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const isPending = (c) => !c.status || c.status === 'pending';

  const filtered = courts.filter(c => {
    const matchTab = tab === 'all' || (tab === 'pending' ? isPending(c) : c.status === tab);
    const matchSearch = !search ||
      c.courtName?.toLowerCase().includes(search.toLowerCase()) ||
      c.ownerName?.toLowerCase().includes(search.toLowerCase()) ||
      c.location?.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = {
    all: courts.length,
    pending: courts.filter(isPending).length,
    active: courts.filter(c => c.status === 'active').length,
    blocked: courts.filter(c => c.status === 'blocked').length,
  };

  const handleApprove = async () => {
    if (!coords.latitude || !coords.longitude) {
      toast({ title: 'Enter coordinates to approve', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await pb.collection('partners').update(selected.id, {
        status: 'active',
        latitude: parseFloat(coords.latitude),
        longitude: parseFloat(coords.longitude),
        adminNotes: coords.adminNotes,
      });
      toast({ title: 'Court approved!' });
      setApproveOpen(false);
      load();
    } catch {
      toast({ title: 'Error approving court', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (court, newStatus) => {
    try {
      await pb.collection('partners').update(court.id, { status: newStatus });
      toast({ title: `Court ${newStatus === 'blocked' ? 'blocked' : 'unblocked'}` });
      load();
    } catch {
      toast({ title: 'Error updating court', variant: 'destructive' });
    }
  };

  const TabBadge = ({ count, color }) => (
    <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-medium ${color}`}>{count}</span>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Courts Management</h1>
          <p className="text-muted-foreground text-sm">Review, approve and manage court registrations</p>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, owner or location..." value={search}
            onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="pending">Pending <TabBadge count={counts.pending} color="bg-yellow-100 text-yellow-700" /></TabsTrigger>
            <TabsTrigger value="active">Active <TabBadge count={counts.active} color="bg-green-100 text-green-700" /></TabsTrigger>
            <TabsTrigger value="blocked">Blocked <TabBadge count={counts.blocked} color="bg-red-100 text-red-700" /></TabsTrigger>
            <TabsTrigger value="all">All <TabBadge count={counts.all} color="bg-gray-100 text-gray-700" /></TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="mt-4">
            {loading ? (
              <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-orange-500" /></div>
            ) : (
              <div className="bg-white rounded-xl border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Court Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Price/Hr</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                          No courts in this category
                        </TableCell>
                      </TableRow>
                    ) : filtered.map(court => (
                      <TableRow key={court.id}>
                        <TableCell className="font-medium">{court.courtName}</TableCell>
                        <TableCell>{court.ownerName}</TableCell>
                        <TableCell className="max-w-[140px] truncate text-sm">{court.location}</TableCell>
                        <TableCell className="text-sm">{court.courtType}</TableCell>
                        <TableCell className="text-sm">PKR {court.pricePerHour?.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${STATUS_STYLES[court.status || 'pending']}`}>
                            {court.status || 'pending'}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {court.created ? format(new Date(court.created), 'MMM d, yyyy') : '—'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" title="View details"
                              onClick={() => { setSelected(court); setViewOpen(true); }}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            {isPending(court) && (
                              <>
                                <Button variant="ghost" size="icon" title="Approve"
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                  onClick={() => { setSelected(court); setCoords({ latitude: '', longitude: '', adminNotes: '' }); setApproveOpen(true); }}>
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Reject"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleStatusChange(court, 'blocked')}>
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {court.status === 'active' && (
                              <Button variant="ghost" size="icon" title="Block court"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleStatusChange(court, 'blocked')}>
                                <Ban className="h-4 w-4" />
                              </Button>
                            )}
                            {court.status === 'blocked' && (
                              <Button variant="ghost" size="icon" title="Unblock court"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleStatusChange(court, 'active')}>
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
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

      {/* Approve Modal */}
      <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Approve: {selected?.courtName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-1">
            <p className="text-sm text-muted-foreground">
              Enter verified GPS coordinates before approving. Find them on Google Maps by right-clicking the court location.
            </p>
            <p className="text-xs bg-gray-50 rounded-lg p-3 flex items-start gap-2">
              <MapPin className="h-3.5 w-3.5 text-orange-500 mt-0.5 shrink-0" />
              Submitted address: <strong>{selected?.location}</strong>
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Latitude</Label>
                <Input placeholder="e.g. 31.5204" value={coords.latitude}
                  onChange={e => setCoords(p => ({ ...p, latitude: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Longitude</Label>
                <Input placeholder="e.g. 74.3587" value={coords.longitude}
                  onChange={e => setCoords(p => ({ ...p, longitude: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Admin Notes (optional)</Label>
              <Textarea placeholder="Notes about this approval..." rows={2}
                value={coords.adminNotes} onChange={e => setCoords(p => ({ ...p, adminNotes: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveOpen(false)}>Cancel</Button>
            <Button onClick={handleApprove} disabled={saving} className="bg-green-600 hover:bg-green-700 text-white">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
              Approve Court
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{selected?.courtName}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {[
                  ['Owner', selected.ownerName], ['Email', selected.email],
                  ['Phone', selected.phone], ['Courts', selected.numberOfCourts],
                  ['Type', selected.courtType], ['Price/Hr', `PKR ${selected.pricePerHour?.toLocaleString()}`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-muted-foreground text-xs">{k}</p>
                    <p className="font-medium mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <div><p className="text-muted-foreground text-xs">Location</p><p className="font-medium">{selected.location}</p></div>
              {selected.description && <div><p className="text-muted-foreground text-xs">Description</p><p>{selected.description}</p></div>}
              {selected.latitude && (
                <div><p className="text-muted-foreground text-xs">GPS Coordinates</p>
                  <p className="font-medium font-mono">{selected.latitude}, {selected.longitude}</p>
                </div>
              )}
              {selected.adminNotes && <div><p className="text-muted-foreground text-xs">Admin Notes</p><p>{selected.adminNotes}</p></div>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default CourtsPage;
