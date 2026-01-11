import { useState, useEffect, useRef } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const lineData = [
  { name: '1월', value: 400 },
  { name: '2월', value: 300 },
  { name: '3월', value: 600 },
  { name: '4월', value: 800 },
  { name: '5월', value: 500 },
  { name: '6월', value: 900 },
]

const barData = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 600 },
  { name: 'D', value: 800 },
  { name: 'E', value: 500 },
]

const pieData = [
  { name: 'React', value: 400 },
  { name: 'Vue', value: 300 },
  { name: 'Angular', value: 200 },
  { name: 'Svelte', value: 100 },
]

const areaData = [
  { name: '1월', uv: 400, pv: 240 },
  { name: '2월', uv: 300, pv: 139 },
  { name: '3월', uv: 200, pv: 980 },
  { name: '4월', uv: 278, pv: 390 },
  { name: '5월', uv: 189, pv: 480 },
  { name: '6월', uv: 239, pv: 380 },
]

// Hook to get theme colors from CSS variables using a ref element
function useThemeColors(ref: React.RefObject<HTMLElement | null>) {
  const [colors, setColors] = useState({
    primary: '#6366f1',
    accent: '#22c55e',
  })

  useEffect(() => {
    const updateColors = () => {
      if (!ref.current) return

      const style = getComputedStyle(ref.current)
      const primary = style.getPropertyValue('--theme-primary').trim() || '#6366f1'
      const accent = style.getPropertyValue('--theme-accent').trim() || '#22c55e'

      setColors((prev) => {
        if (prev.primary !== primary || prev.accent !== accent) {
          return { primary, accent }
        }
        return prev
      })
    }

    updateColors()

    // Poll for changes since CSS variables can change via parent style attribute
    const interval = setInterval(updateColors, 100)

    return () => {
      clearInterval(interval)
    }
  }, [ref])

  return colors
}

// Generate color palette based on primary color
function generatePalette(primary: string) {
  return [
    primary,
    '#22c55e',
    '#f59e0b',
    '#ef4444',
  ]
}

export function LineChartDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const { primary } = useThemeColors(ref)

  return (
    <div className="chart-container" ref={ref}>
      <h4 className="chart-title">Line Chart</h4>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke={primary} strokeWidth={2} dot={{ fill: primary }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function BarChartDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const { primary } = useThemeColors(ref)

  return (
    <div className="chart-container" ref={ref}>
      <h4 className="chart-title">Bar Chart</h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill={primary} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PieChartDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const { primary } = useThemeColors(ref)
  const COLORS = generatePalette(primary)

  return (
    <div className="chart-container" ref={ref}>
      <h4 className="chart-title">Pie Chart</h4>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function AreaChartDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const { primary, accent } = useThemeColors(ref)

  return (
    <div className="chart-container" ref={ref}>
      <h4 className="chart-title">Area Chart</h4>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={areaData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="uv" stackId="1" stroke={primary} fill={primary} fillOpacity={0.6} />
          <Area type="monotone" dataKey="pv" stackId="1" stroke={accent} fill={accent} fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ChartDemo() {
  return (
    <div className="chart-demo">
      <div className="chart-demo__grid">
        <LineChartDemo />
        <BarChartDemo />
        <PieChartDemo />
        <AreaChartDemo />
      </div>
    </div>
  )
}
