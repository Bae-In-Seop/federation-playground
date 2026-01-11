import { useState, useMemo, useRef, useEffect } from 'react'

type DatePickerMode = 'single' | 'multiple' | 'week' | 'month' | 'year' | 'range'

interface DatePickerProps {
  mode?: DatePickerMode
  value?: Date | Date[] | { start: Date | null; end: Date | null }
  onChange?: (value: Date | Date[] | { start: Date | null; end: Date | null }) => void
  label?: string
  placeholder?: string
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토']
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

export function DatePicker({ mode = 'single', onChange, label, placeholder }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [rangeStart, setRangeStart] = useState<Date | null>(null)
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const daysInMonth = useMemo(() => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }, [year, month])

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false
    return d1.toDateString() === d2.toDateString()
  }

  const isSelected = (date: Date | null) => {
    if (!date) return false

    if (mode === 'single') {
      return selectedDates.length > 0 && isSameDay(date, selectedDates[0])
    }

    if (mode === 'multiple') {
      return selectedDates.some((d) => isSameDay(d, date))
    }

    if (mode === 'week') {
      if (selectedDates.length === 0) return false
      const weekStart = new Date(selectedDates[0])
      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekEnd.getDate() + 6)
      return date >= weekStart && date <= weekEnd
    }

    if (mode === 'range') {
      if (rangeStart && rangeEnd) {
        return date >= rangeStart && date <= rangeEnd
      }
      return isSameDay(date, rangeStart)
    }

    return false
  }

  const handleDateClick = (date: Date | null) => {
    if (!date) return

    if (mode === 'single') {
      setSelectedDates([date])
      onChange?.(date)
      setIsOpen(false)
    } else if (mode === 'multiple') {
      const exists = selectedDates.some((d) => isSameDay(d, date))
      const newDates = exists
        ? selectedDates.filter((d) => !isSameDay(d, date))
        : [...selectedDates, date]
      setSelectedDates(newDates)
      onChange?.(newDates)
    } else if (mode === 'week') {
      setSelectedDates([date])
      onChange?.(date)
      setIsOpen(false)
    } else if (mode === 'range') {
      if (!rangeStart || rangeEnd) {
        setRangeStart(date)
        setRangeEnd(null)
      } else {
        const [start, end] = date < rangeStart ? [date, rangeStart] : [rangeStart, date]
        setRangeStart(start)
        setRangeEnd(end)
        onChange?.({ start, end })
        setIsOpen(false)
      }
    }
  }

  const handleMonthClick = (monthIndex: number) => {
    if (mode === 'month') {
      const date = new Date(year, monthIndex, 1)
      setSelectedDates([date])
      onChange?.(date)
      setIsOpen(false)
    }
  }

  const handleYearClick = (selectedYear: number) => {
    if (mode === 'year') {
      const date = new Date(selectedYear, 0, 1)
      setSelectedDates([date])
      onChange?.(date)
      setIsOpen(false)
    }
  }

  const navigate = (direction: number) => {
    if (mode === 'year') {
      setCurrentDate(new Date(year + direction * 12, month, 1))
    } else if (mode === 'month') {
      setCurrentDate(new Date(year + direction, month, 1))
    } else {
      setCurrentDate(new Date(year, month + direction, 1))
    }
  }

  const getDisplayValue = () => {
    if (mode === 'single' && selectedDates[0]) {
      return selectedDates[0].toLocaleDateString('ko-KR')
    }
    if (mode === 'multiple' && selectedDates.length > 0) {
      return `${selectedDates.length}개 선택됨`
    }
    if (mode === 'week' && selectedDates[0]) {
      const weekStart = new Date(selectedDates[0])
      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekEnd.getDate() + 6)
      return `${weekStart.toLocaleDateString('ko-KR')} ~ ${weekEnd.toLocaleDateString('ko-KR')}`
    }
    if (mode === 'month' && selectedDates[0]) {
      return `${selectedDates[0].getFullYear()}년 ${selectedDates[0].getMonth() + 1}월`
    }
    if (mode === 'year' && selectedDates[0]) {
      return `${selectedDates[0].getFullYear()}년`
    }
    if (mode === 'range' && rangeStart) {
      if (rangeEnd) {
        return `${rangeStart.toLocaleDateString('ko-KR')} ~ ${rangeEnd.toLocaleDateString('ko-KR')}`
      }
      return `${rangeStart.toLocaleDateString('ko-KR')} ~ `
    }
    return ''
  }

  const getPlaceholder = () => {
    if (placeholder) return placeholder
    switch (mode) {
      case 'single': return '날짜 선택'
      case 'multiple': return '날짜 선택 (다중)'
      case 'week': return '주 선택'
      case 'month': return '월 선택'
      case 'year': return '연도 선택'
      case 'range': return '기간 선택'
      default: return '날짜 선택'
    }
  }

  const renderMonthView = () => (
    <div className="datepicker__months">
      {MONTHS.map((m, i) => (
        <button
          key={i}
          className={`datepicker__month ${selectedDates[0]?.getMonth() === i && selectedDates[0]?.getFullYear() === year ? 'datepicker__month--selected' : ''}`}
          onClick={() => handleMonthClick(i)}
        >
          {m}
        </button>
      ))}
    </div>
  )

  const renderYearView = () => {
    const startYear = Math.floor(year / 12) * 12
    const years = Array.from({ length: 12 }, (_, i) => startYear + i)

    return (
      <div className="datepicker__years">
        {years.map((y) => (
          <button
            key={y}
            className={`datepicker__year ${selectedDates[0]?.getFullYear() === y ? 'datepicker__year--selected' : ''}`}
            onClick={() => handleYearClick(y)}
          >
            {y}
          </button>
        ))}
      </div>
    )
  }

  const renderDayView = () => (
    <>
      <div className="datepicker__weekdays">
        {DAYS.map((day) => (
          <span key={day} className="datepicker__weekday">
            {day}
          </span>
        ))}
      </div>
      <div className="datepicker__days">
        {daysInMonth.map((date, i) => (
          <button
            key={i}
            className={`datepicker__day ${!date ? 'datepicker__day--empty' : ''} ${isSelected(date) ? 'datepicker__day--selected' : ''} ${date && isSameDay(date, new Date()) ? 'datepicker__day--today' : ''}`}
            onClick={() => handleDateClick(date)}
            disabled={!date}
          >
            {date?.getDate()}
          </button>
        ))}
      </div>
    </>
  )

  const getTitle = () => {
    if (mode === 'year') {
      const startYear = Math.floor(year / 12) * 12
      return `${startYear} - ${startYear + 11}`
    }
    if (mode === 'month') {
      return `${year}년`
    }
    return `${year}년 ${month + 1}월`
  }

  return (
    <div className="datepicker-wrapper" ref={containerRef}>
      {label && <label className="datepicker__label">{label}</label>}
      <div className="datepicker-input-wrapper">
        <input
          type="text"
          className="datepicker__input"
          value={getDisplayValue()}
          placeholder={getPlaceholder()}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
        />
        <span className="datepicker__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="datepicker__popup">
          <div className="datepicker__header">
            <button className="datepicker__nav" onClick={() => navigate(-1)}>
              ◀
            </button>
            <span className="datepicker__title">{getTitle()}</span>
            <button className="datepicker__nav" onClick={() => navigate(1)}>
              ▶
            </button>
          </div>
          {mode === 'month' ? renderMonthView() : mode === 'year' ? renderYearView() : renderDayView()}
          {mode === 'range' && rangeStart && !rangeEnd && (
            <div className="datepicker__range-info">종료일을 선택하세요</div>
          )}
          {mode === 'multiple' && selectedDates.length > 0 && (
            <div className="datepicker__footer">
              <button className="datepicker__done" onClick={() => setIsOpen(false)}>
                완료 ({selectedDates.length}개)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
