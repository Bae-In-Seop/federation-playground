import type { ReactNode } from 'react'

interface Column<T> {
  key: keyof T | string
  header: string
  render?: (item: T) => ReactNode
  align?: 'left' | 'center' | 'right'
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  striped?: boolean
  hoverable?: boolean
}

export function Table<T>({
  columns,
  data,
  striped = true,
  hoverable = true,
}: TableProps<T>) {
  const getClassName = () => {
    const classes = ['table']
    if (striped) classes.push('table--striped')
    if (hoverable) classes.push('table--hoverable')
    return classes.join(' ')
  }

  const getCellValue = (item: T, column: Column<T>) => {
    if (column.render) {
      return column.render(item)
    }
    return item[column.key as keyof T] as ReactNode
  }

  return (
    <div className="table-wrapper">
      <table className={getClassName()}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} style={{ textAlign: column.align || 'left' }}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={String(column.key)} style={{ textAlign: column.align || 'left' }}>
                  {getCellValue(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Demo data and component
interface SampleData {
  id: number
  name: string
  role: string
  status: string
  email: string
}

const sampleData: SampleData[] = [
  { id: 1, name: '홍길동', role: '개발자', status: '활성', email: 'hong@example.com' },
  { id: 2, name: '김영희', role: '디자이너', status: '활성', email: 'kim@example.com' },
  { id: 3, name: '이철수', role: '매니저', status: '비활성', email: 'lee@example.com' },
  { id: 4, name: '박민수', role: '개발자', status: '활성', email: 'park@example.com' },
  { id: 5, name: '정수진', role: '디자이너', status: '활성', email: 'jung@example.com' },
]

export function TableDemo() {
  const columns: Column<SampleData>[] = [
    { key: 'id', header: 'ID', align: 'center' },
    { key: 'name', header: '이름' },
    { key: 'role', header: '역할' },
    {
      key: 'status',
      header: '상태',
      align: 'center',
      render: (item) => (
        <span className={`table-status table-status--${item.status === '활성' ? 'active' : 'inactive'}`}>
          {item.status}
        </span>
      ),
    },
    { key: 'email', header: '이메일' },
  ]

  return <Table<SampleData> columns={columns} data={sampleData} />
}
