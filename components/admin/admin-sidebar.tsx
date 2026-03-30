'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * AdminSidebar — That One Time
 * Sidebar navigation for all admin pages.
 * Functional over polished — admin UX priority.
 */

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Timelines', href: '/admin/timelines' },
  { label: 'Entities', href: '/admin/entities' },
  { label: 'Flags', href: '/admin/flags' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="shrink-0 flex flex-col"
      style={{
        width: '220px',
        backgroundColor: '#1a1a1a',
        minHeight: '100vh',
        padding: '24px 0',
      }}
    >
      {/* Admin brand */}
      <div style={{ padding: '0 20px', marginBottom: '32px' }}>
        <Link href="/admin">
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            That One Time
          </span>
        </Link>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '4px',
          }}
        >
          Admin CMS
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1" style={{ padding: '0 8px' }}>
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="block transition-colors"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: isActive ? 700 : 400,
                color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                backgroundColor: isActive
                  ? 'rgba(255,255,255,0.1)'
                  : 'transparent',
                padding: '10px 12px',
                borderRadius: '8px',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Back to app link */}
      <div className="mt-auto" style={{ padding: '0 20px' }}>
        <Link
          href="/browse"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          &larr; Back to app
        </Link>
      </div>
    </aside>
  );
}
