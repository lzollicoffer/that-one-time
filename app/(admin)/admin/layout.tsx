'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

/**
 * Admin Layout — wraps all /admin/* pages with collapsible sidebar.
 * Sidebar defaults to collapsed so content area gets maximum width.
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <main
        className="flex-1 overflow-y-auto"
        style={{
          backgroundColor: '#fafafa',
          padding: '32px',
        }}
      >
        {children}
      </main>
    </div>
  );
}
