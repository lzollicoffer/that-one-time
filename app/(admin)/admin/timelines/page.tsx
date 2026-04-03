'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ConfirmModal } from '@/components/admin/shared/confirm-modal';

/**
 * Admin Timeline List — manage, reorder, and delete timelines.
 * Drag-to-reorder via @dnd-kit. Sort order syncs to consumer browse page.
 */

interface AdminTimeline {
  id: string;
  title: string;
  slug: string;
  status: string;
  event_count: number;
  sort_order: number;
}

/* ── Sortable Row ── */

interface SortableRowProps {
  t: AdminTimeline;
  statusColors: Record<string, string>;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (t: AdminTimeline) => void;
}

function SortableTimelineRow({ t, statusColors, onStatusChange, onDelete }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: t.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : ('auto' as const),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between"
    >
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: isDragging ? '1px solid var(--color-primary)' : '1px solid #eee',
          boxShadow: isDragging ? '0 4px 16px rgba(0,0,0,0.12)' : 'none',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="flex items-center gap-4">
          {/* Drag handle */}
          <button
            {...attributes}
            {...listeners}
            style={{
              cursor: 'grab',
              background: 'none',
              border: 'none',
              padding: '4px',
              color: '#bbb',
              touchAction: 'none',
            }}
            aria-label="Drag to reorder"
          >
            <svg width="12" height="18" viewBox="0 0 12 18" fill="currentColor">
              <circle cx="3" cy="3" r="1.5" />
              <circle cx="9" cy="3" r="1.5" />
              <circle cx="3" cy="9" r="1.5" />
              <circle cx="9" cy="9" r="1.5" />
              <circle cx="3" cy="15" r="1.5" />
              <circle cx="9" cy="15" r="1.5" />
            </svg>
          </button>

          {/* Status dot */}
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: statusColors[t.status] || '#999',
              flexShrink: 0,
            }}
          />
          <div>
            <Link
              href={`/admin/timelines/${t.id}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 600,
                color: '#0a0a0a',
              }}
            >
              {t.title.replace(/\n/g, ' ')}
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: '#999',
                marginTop: '2px',
              }}
            >
              {t.event_count} events &middot; /{t.slug}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={t.status}
            onChange={(e) => onStatusChange(t.id, e.target.value)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
            }}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="unlisted">Unlisted</option>
            <option value="archived">Archived</option>
          </select>
          <Link
            href={`/admin/timelines/${t.id}`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 700,
              color: '#FFFFFF',
              backgroundColor: 'var(--color-primary)',
              padding: '6px 14px',
              borderRadius: '6px',
            }}
          >
            Edit
          </Link>
          <Link
            href={`/admin/timelines/${t.id}/events`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--color-primary)',
            }}
          >
            Events
          </Link>
          <Link
            href={`/admin/timelines/${t.id}/entities`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--color-primary)',
            }}
          >
            Entities
          </Link>
          <button
            onClick={() => onDelete(t)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: '#D32F2F',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */

export default function AdminTimelinesPage() {
  const [timelines, setTimelines] = useState<AdminTimeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<AdminTimeline | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetch('/api/admin/timelines')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        const sorted = Array.isArray(data)
          ? [...data].sort((a: AdminTimeline, b: AdminTimeline) => a.sort_order - b.sort_order)
          : [];
        setTimelines(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await fetch(`/api/admin/timelines/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    setTimelines((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = timelines.findIndex((t) => t.id === active.id);
    const newIndex = timelines.findIndex((t) => t.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...timelines];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);

    const updated = reordered.map((t, i) => ({ ...t, sort_order: i }));
    setTimelines(updated);

    // Persist sort_order changes
    const promises = updated
      .filter((t, i) => {
        const original = timelines.find((o) => o.id === t.id);
        return original && original.sort_order !== i;
      })
      .map((t) =>
        fetch(`/api/admin/timelines/${t.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sort_order: t.sort_order }),
        })
      );
    await Promise.all(promises);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/timelines/${deleteTarget.id}`, { method: 'DELETE' });
    setTimelines((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const statusColors: Record<string, string> = {
    draft: '#FFA726',
    published: '#66BB6A',
    unlisted: '#42A5F5',
    archived: '#BDBDBD',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '24px',
            fontWeight: 700,
          }}
        >
          Timelines
        </h1>
        <Link
          href="/admin/timelines/new"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 700,
            padding: '10px 20px',
            borderRadius: '8px',
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
          }}
        >
          + New Timeline
        </Link>
      </div>

      {loading ? (
        <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>
          Loading...
        </p>
      ) : timelines.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>
          No timelines yet. Create your first timeline to get started.
        </p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={timelines.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {timelines.map((t) => (
                <SortableTimelineRow
                  key={t.id}
                  t={t}
                  statusColors={statusColors}
                  onStatusChange={handleStatusChange}
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Timeline"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.title.replace(/\n/g, ' ')}"? This will also delete all events, entity links, and connections associated with this timeline. This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
