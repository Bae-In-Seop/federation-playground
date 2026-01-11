import { useState } from 'react'
import {
  Button,
  Badge,
  Card,
  Input,
  Toggle,
  IconButton,
  DatePicker,
  RadioGroup,
  CheckboxGroup,
  ToastProvider,
  ToastDemo,
  ModalDemo,
  TableDemo,
  ChartDemo,
} from './components'
import './App.css'

interface ShowcaseProps {
  title: string
  children: React.ReactNode
}

function Showcase({ title, children }: ShowcaseProps) {
  return (
    <div className="showcase">
      <h2 className="showcase__title">{title}</h2>
      <div className="showcase__content">{children}</div>
    </div>
  )
}

// Icons for IconButton demo
const icons = {
  heart: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
}

function AppContent() {
  const [inputValue, setInputValue] = useState('')
  const [toggleChecked, setToggleChecked] = useState(false)
  const [selectedRadio, setSelectedRadio] = useState('option1')
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>(['option1'])

  const radioOptions = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ]

  const checkboxOptions = [
    { value: 'option1', label: '사과' },
    { value: 'option2', label: '바나나' },
    { value: 'option3', label: '오렌지' },
    { value: 'option4', label: '포도' },
  ]

  return (
    <div className="playground">
      <Showcase title="Button">
        <div className="showcase__row">
          <IconButton icon={icons.heart} variant="primary" />
          <IconButton icon={icons.star} variant="secondary" />
          <IconButton icon={icons.edit} variant="outline" />
          <IconButton icon={icons.trash} variant="ghost" />
        </div>
        <div className="showcase__row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="showcase__row">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className="showcase__row">
          <Button disabled>Disabled</Button>
          <IconButton icon={icons.heart} variant="primary" disabled />
        </div>
      </Showcase>

      <Showcase title="Badge">
        <div className="showcase__row">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </Showcase>

      <Showcase title="Card">
        <div className="showcase__grid">
          <Card title="Card Title" description="This is a card description">
            <p>Card content goes here.</p>
          </Card>
          <Card title="Another Card">
            <p>Cards are flexible containers.</p>
            <Button variant="outline" size="sm">
              Action
            </Button>
          </Card>
        </div>
      </Showcase>

      <Showcase title="Input">
        <div className="showcase__stack">
          <Input
            label="Username"
            placeholder="Enter your username"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            error="Password must be at least 8 characters"
          />
        </div>
      </Showcase>

      <Showcase title="Toggle">
        <div className="showcase__row">
          <Toggle
            label="Enable notifications"
            checked={toggleChecked}
            onChange={(e) => setToggleChecked(e.target.checked)}
          />
          <Toggle label="Dark mode" />
          <Toggle label="Disabled toggle" disabled />
        </div>
      </Showcase>

      <Showcase title="Select">
        <div className="showcase__stack-wide">
          <div className="select-group">
            <h4 className="select-group__title">Radio</h4>
            <RadioGroup
              name="demo-radio"
              options={radioOptions}
              value={selectedRadio}
              onChange={setSelectedRadio}
              direction="horizontal"
            />
          </div>
          <div className="select-group">
            <h4 className="select-group__title">Checkbox</h4>
            <CheckboxGroup
              options={checkboxOptions}
              values={selectedCheckboxes}
              onChange={setSelectedCheckboxes}
              direction="horizontal"
            />
          </div>
        </div>
      </Showcase>

      <Showcase title="Date Picker">
        <div className="datepicker-grid">
          <DatePicker mode="single" label="단일 선택" />
          <DatePicker mode="multiple" label="다중 선택" />
          <DatePicker mode="week" label="주 선택" />
          <DatePicker mode="month" label="월 선택" />
          <DatePicker mode="year" label="연 선택" />
          <DatePicker mode="range" label="기간 선택" />
        </div>
      </Showcase>

      <Showcase title="Toast Notification">
        <ToastDemo />
      </Showcase>

      <Showcase title="Modal">
        <ModalDemo />
      </Showcase>

      <Showcase title="Table">
        <TableDemo />
      </Showcase>

      <Showcase title="Charts">
        <ChartDemo />
      </Showcase>
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}
