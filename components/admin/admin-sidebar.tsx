'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * AdminSidebar — That One Time
 * Collapsible sidebar navigation for all admin pages.
 * Collapsed: icons only. Expanded: icons + text labels.
 * Default state: collapsed.
 */

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: 'Timelines',
    href: '/admin/timelines',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 3V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="3" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="3" cy="13" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 5H16M7 9H14M7 13H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Entities',
    href: '/admin/entities',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="1" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 5H12M6 9H12M6 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Flags',
    href: '/admin/flags',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 2V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 3H14L11 7L14 11H3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="shrink-0 flex flex-col"
      style={{
        width: collapsed ? '60px' : '220px',
        backgroundColor: '#1a1a1a',
        minHeight: '100vh',
        padding: '12px 0',
        transition: 'width 200ms ease-in-out',
        overflow: 'hidden',
      }}
    >
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center"
        style={{
          width: collapsed ? '60px' : '220px',
          height: '40px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '8px',
        }}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          {collapsed ? (
            <path d="M4 4H14M4 9H14M4 14H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M12 4L6 9L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </button>

      {/* Admin brand — only when expanded */}
      {!collapsed && (
        <div style={{ padding: '0 20px', marginBottom: '24px' }}>
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
      )}

      {/* Nav items */}
      <nav
        className="flex flex-col gap-1"
        style={{ padding: collapsed ? '0 6px' : '0 8px' }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 transition-colors"
              title={collapsed ? item.label : undefined}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: isActive ? 700 : 400,
                color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                backgroundColor: isActive
                  ? 'rgba(255,255,255,0.1)'
                  : 'transparent',
                padding: collapsed ? '10px 14px' : '10px 12px',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
              }}
            >
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Back to app link */}
      <div className="mt-auto" style={{ padding: collapsed ? '0 6px' : '0 20px' }}>
        <Link
          href="/browse"
          className="flex items-center gap-2"
          title={collapsed ? 'Back to app' : undefined}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.4)',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M10 7H4M4 7L7 4M4 7L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {!collapsed && <span>Back to app</span>}
        </Link>
      </div>
    </aside>
  );
}
