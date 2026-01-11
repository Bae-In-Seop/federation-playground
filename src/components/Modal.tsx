import { ReactNode, useEffect, useState } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => setIsVisible(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isVisible) return null

  return (
    <div className={`modal-overlay ${isAnimating ? 'modal-overlay--visible' : ''}`} onClick={onClose}>
      <div className={`modal ${isAnimating ? 'modal--visible' : ''}`} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="modal__header">
            <h3 className="modal__title">{title}</h3>
            <button className="modal__close" onClick={onClose}>
              ×
            </button>
          </div>
        )}
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  )
}

// Demo component for showcase
export function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button className="btn btn--primary" onClick={() => setIsOpen(true)}>
        모달 열기
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="모달 제목"
        footer={
          <div className="modal-demo__footer">
            <button className="btn btn--ghost" onClick={() => setIsOpen(false)}>
              취소
            </button>
            <button className="btn btn--primary" onClick={() => setIsOpen(false)}>
              확인
            </button>
          </div>
        }
      >
        <p>이것은 모달 팝업 내용입니다.</p>
        <p>ESC 키를 누르거나 외부를 클릭하여 닫을 수 있습니다.</p>
      </Modal>
    </>
  )
}
