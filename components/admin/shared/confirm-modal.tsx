'use client';

/**
 * ConfirmModal — "Are you sure?" for destructive admin actions.
 */

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[70]"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={onCancel}
      />
      <div
        className="fixed z-[70] flex flex-col"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          maxWidth: '90vw',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '24px',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            fontWeight: 700,
            color: '#0a0a0a',
            marginBottom: '8px',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: '#666',
            lineHeight: '22px',
            marginBottom: '24px',
          }}
        >
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 500,
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 700,
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#D32F2F',
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </>
  );
}
