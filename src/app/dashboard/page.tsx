"use client";

import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/hooks/useAuth';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { GuideDashboard } from '@/components/dashboard/GuideDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'scholar':
        return <StudentDashboard />;
      case 'guide':
        return <GuideDashboard />;
      case 'registrar':
      case 'vc':
        return <AdminDashboard />;
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Welcome</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your dashboard is being set up. Please check back later.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <AppLayout>
        {renderDashboard()}
    </AppLayout>
  );
}
