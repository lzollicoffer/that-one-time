'use client';

import { AdminSidebar } from '@/components/admin/admin-sidebar';

/**
 * Admin Layout — wraps all /admin/* pages with sidebar navigation.
 * Functional over polished per design system instructions.
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
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
