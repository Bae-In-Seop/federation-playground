import type { ReactNode } from 'react'
import { useState, useEffect, createContext, useContext, useCallback } from 'react'

type ToastType = 'info' | 'success' | 'warning' | 'error'

interface ToastItem {
  id: number
  type: ToastType
  message: string
}

interface ToastContextType {
  showToast: (type: ToastType, message: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

let toastId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, type, message }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onClose }: { toast: ToastItem; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const icons: Record<ToastType, string> = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  }

  return (
    <div className={`toast toast--${toast.type}`}>
      <span className="toast__icon">{icons[toast.type]}</span>
      <span className="toast__message">{toast.message}</span>
      <button className="toast__close" onClick={onClose}>
        ×
      </button>
    </div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Demo component for showcase
export function ToastDemo() {
  const { showToast } = useToast()

  return (
    <div className="toast-demo">
      <button className="toast-demo__btn toast-demo__btn--info" onClick={() => showToast('info', '정보 메시지입니다.')}>
        Info
      </button>
      <button className="toast-demo__btn toast-demo__btn--success" onClick={() => showToast('success', '성공적으로 완료되었습니다!')}>
        Success
      </button>
      <button className="toast-demo__btn toast-demo__btn--warning" onClick={() => showToast('warning', '주의가 필요합니다.')}>
        Warning
      </button>
      <button className="toast-demo__btn toast-demo__btn--error" onClick={() => showToast('error', '오류가 발생했습니다.')}>
        Error
      </button>
    </div>
  )
}
