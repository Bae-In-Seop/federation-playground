import { useState } from 'react'
import { Button, Badge, Card, Input, Toggle } from './components'
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

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [toggleChecked, setToggleChecked] = useState(false)

  return (
    <div className="playground">
      <Showcase title="Button">
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
        <div className="showcase__stack">
          <Toggle
            label="Enable notifications"
            checked={toggleChecked}
            onChange={(e) => setToggleChecked(e.target.checked)}
          />
          <Toggle label="Dark mode" />
          <Toggle label="Disabled toggle" disabled />
        </div>
      </Showcase>
    </div>
  )
}
