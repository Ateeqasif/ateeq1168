import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, CalendarDays, Crown, Users, AlertCircle, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';

const StatCard = ({ title, value, icon: Icon, color, sub }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{value ?? '—'}</p>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const PIE_COLORS = ['#f97316', '#22c55e', '#ef4444'];

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [partners, bookings, vip, users, tickets] = await Promise.all([
          pb.collection('partners').getList(1, 500, { sort: '-created' }),
          pb.collection('bookings').getList(1, 500, { sort: '-created' }),
          pb.collection('vip_members').getList(1, 500),
          pb.collection('users').getList(1, 1),
          pb.collection('support_tickets').getList(1, 500).catch(() => ({ totalItems: 0, items: [] })),
        ]);

        const pending = partners.items.filter(p => !p.status || p.status === 'pending').length;
        const active = partners.items.filter(p => p.status === 'active').length;
        const blocked = partners.items.filter(p => p.status === 'blocked').length;

        setData({
          totalCourts: partners.totalItems,
          pendingCourts: pending,
          activeCourts: active,
          blockedCourts: blocked,
          totalBookings: bookings.totalItems,
          confirmedBookings: bookings.items.filter(b => b.status === 'confirmed').length,
          pendingBookings: bookings.items.filter(b => b.status === 'pending').length,
          totalVIP: vip.totalItems,
          activeVIP: vip.items.filter(v => v.status === 'active').length,
          totalUsers: users.totalItems,
          openTickets: tickets.items.filter(t => t.status === 'open').length,
          recentPendingCourts: partners.items.filter(p => !p.status || p.status === 'pending').slice(0, 5),
          recentBookings: bookings.items.slice(0, 5),
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    </AdminLayout>
  );

  const courtPieData = [
    { name: 'Pending', value: data.pendingCourts },
    { name: 'Active', value: data.activeCourts },
    { name: 'Blocked', value: data.blockedCourts },
  ].filter(d => d.value > 0);

  const bookingBarData = [
    { name: 'Confirmed', value: data.confirmedBookings },
    { name: 'Pending', value: data.pendingBookings },
    { name: 'Other', value: data.totalBookings - data.confirmedBookings - data.pendingBookings },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-muted-foreground text-sm">PaddlesPK platform overview</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Total Courts" value={data.totalCourts} icon={Building2} color="bg-blue-500"
            sub={`${data.pendingCourts} pending approval`} />
          <StatCard title="Total Bookings" value={data.totalBookings} icon={CalendarDays} color="bg-orange-500"
            sub={`${data.confirmedBookings} confirmed`} />
          <StatCard title="VIP Members" value={data.totalVIP} icon={Crown} color="bg-purple-500"
            sub={`${data.activeVIP} active`} />
          <StatCard title="Registered Users" value={data.totalUsers} icon={Users} color="bg-green-500"
            sub={data.openTickets > 0 ? `${data.openTickets} open support tickets` : undefined} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Courts by Status</CardTitle></CardHeader>
            <CardContent>
              {courtPieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={courtPieData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                      {courtPieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-muted-foreground py-10 text-sm">No court registrations yet</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Bookings by Status</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={bookingBarData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f97316" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" /> Pending Court Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.recentPendingCourts.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4 text-center">No pending courts — all clear!</p>
              ) : (
                <div className="space-y-2">
                  {data.recentPendingCourts.map(court => (
                    <div key={court.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div>
                        <p className="font-medium text-sm">{court.courtName}</p>
                        <p className="text-xs text-muted-foreground">{court.ownerName} · {court.location}</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Pending</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" /> Recent Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.recentBookings.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4 text-center">No bookings yet</p>
              ) : (
                <div className="space-y-2">
                  {data.recentBookings.map(b => (
                    <div key={b.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{b.arenaName}</p>
                        <p className="text-xs text-muted-foreground">{b.date} · {b.timeSlot}</p>
                      </div>
                      <Badge variant={b.status === 'confirmed' ? 'default' : 'secondary'} className="capitalize">
                        {b.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
