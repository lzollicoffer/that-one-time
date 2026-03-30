'use client';

import { useState, useRef } from 'react';

/**
 * ImageUploader — drag-and-drop or click-to-browse file upload.
 * Uploads to /api/admin/upload and returns the public URL.
 */

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({
  value,
  onChange,
  label = 'Cover Image',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be under 10MB.');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        const data = await res.json();
        setError(data.error || 'Upload failed');
      }
    } catch {
      setError('Upload failed. Check your connection.');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-1">
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 600,
          color: '#666',
        }}
      >
        {label}
      </span>

      {/* Preview if URL exists */}
      {value && (
        <div className="relative mb-2" style={{ maxWidth: '300px' }}>
          <img
            src={value}
            alt="Cover preview"
            className="w-full object-cover"
            style={{ borderRadius: '8px', maxHeight: '160px' }}
          />
          <button
            onClick={() => onChange('')}
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              lineHeight: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            &times;
          </button>
        </div>
      )}

      {/* Drop zone / upload button */}
      {!value && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            padding: '24px',
            borderRadius: '8px',
            border: `2px dashed ${dragOver ? 'var(--color-primary)' : '#ddd'}`,
            backgroundColor: dragOver ? '#FFF8F6' : '#fafafa',
            cursor: uploading ? 'wait' : 'pointer',
            textAlign: 'center',
            transition: 'border-color 150ms, background-color 150ms',
          }}
        >
          {uploading ? (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#999',
              }}
            >
              Uploading...
            </p>
          ) : (
            <>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: '#666',
                }}
              >
                Drop an image here or click to browse
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  color: '#999',
                  marginTop: '4px',
                }}
              >
                JPG, PNG, WebP — max 10MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />

      {error && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: '#D32F2F',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
