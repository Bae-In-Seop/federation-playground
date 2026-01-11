import { useState } from 'react'

interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  items: TabItem[]
  defaultActiveId?: string
}

export function Tabs({ items, defaultActiveId }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveId || items[0]?.id || '')

  return (
    <div className="tabs">
      <div className="tabs__header">
        {items.map((item) => (
          <button
            key={item.id}
            className={`tabs__tab ${activeTab === item.id ? 'tabs__tab--active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tabs__content">
        {items.map((item) => (
          <div
            key={item.id}
            className="tabs__panel"
            style={{ display: activeTab === item.id ? 'block' : 'none' }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        if (!allowMultiple) {
          newSet.clear()
        }
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="accordion">
      {items.map((item) => (
        <div
          key={item.id}
          className={`accordion__item ${openItems.has(item.id) ? 'accordion__item--open' : ''}`}
        >
          <button className="accordion__header" onClick={() => toggle(item.id)}>
            <span className="accordion__title">{item.title}</span>
            <span className="accordion__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
          <div className="accordion__content">
            <div className="accordion__body">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Demo components
export function TabsDemo() {
  const tabItems = [
    {
      id: 'tab1',
      label: '탭 1',
      content: '첫 번째 탭의 내용입니다. React로 만든 탭 컴포넌트입니다.',
    },
    {
      id: 'tab2',
      label: '탭 2',
      content: '두 번째 탭의 내용입니다. 탭을 클릭하여 내용을 전환할 수 있습니다.',
    },
    {
      id: 'tab3',
      label: '탭 3',
      content: '세 번째 탭의 내용입니다. CSS 변수를 통해 테마가 적용됩니다.',
    },
  ]

  return <Tabs items={tabItems} />
}

export function AccordionDemo() {
  const accordionItems = [
    {
      id: 'acc1',
      title: 'React란?',
      content:
        'React는 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리입니다. 컴포넌트 기반 아키텍처를 사용하여 재사용 가능한 UI를 구축합니다.',
    },
    {
      id: 'acc2',
      title: 'Hooks란?',
      content:
        'Hooks는 React 16.8에서 도입된 기능으로, 함수 컴포넌트에서 state와 생명주기 기능을 사용할 수 있게 해줍니다. useState, useEffect 등이 있습니다.',
    },
    {
      id: 'acc3',
      title: 'Module Federation',
      content:
        '이 프로젝트는 Module Federation을 사용하여 마이크로 프론트엔드 아키텍처를 구현합니다. 여러 독립적인 앱을 하나로 통합할 수 있습니다.',
    },
  ]

  return <Accordion items={accordionItems} />
}
