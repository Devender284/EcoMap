import { useEffect } from 'react';
import { Toast } from '../hooks/useToast';

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div style={styles.container}>
      {toasts.map((toast) => (
        <ToastMessage key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

interface ToastMessageProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastMessage({ toast, onRemove }: ToastMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      style={{
        ...styles.toast,
        backgroundColor: getBackgroundColor(toast.type),
      }}
      onClick={() => onRemove(toast.id)}
    >
      <span style={styles.message}>{toast.message}</span>
      <button style={styles.closeButton} onClick={() => onRemove(toast.id)}>
        ×
      </button>
    </div>
  );
}

const getBackgroundColor = (type: Toast['type']): string => {
  switch (type) {
    case 'success':
      return '#10B981';
    case 'error':
      return '#EF4444';
    case 'info':
    default:
      return '#3B82F6';
  }
};

const styles = {
  container: {
    position: 'fixed',
    top: '80px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  } as React.CSSProperties,
  toast: {
    minWidth: '300px',
    padding: '16px',
    borderRadius: '8px',
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    animation: 'slideIn 0.3s ease-out',
    cursor: 'pointer',
  } as React.CSSProperties,
  message: {
    flex: 1,
    fontSize: '14px',
    fontWeight: '500',
  } as React.CSSProperties,
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: '#FFF',
    fontSize: '24px',
    cursor: 'pointer',
    marginLeft: '12px',
    padding: '0',
    lineHeight: '1',
  } as React.CSSProperties,
};
