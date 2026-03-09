import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const MODULES = [
  { id: 'student-profile', code: '1.1', title: 'Student Profile', path: '/student-profile' },
  { id: 'faculty-profile', code: '1.2', title: 'Faculty Profile', path: '/faculty-profile' },
  { id: 'events', code: '1.3', title: 'Events', path: '/events' },
  { id: 'scheduling', code: '1.4', title: 'Scheduling', path: '/scheduling' },
  { id: 'college-research', code: '1.5', title: 'College Research', path: '/college-research' },
  { id: 'instructions', code: '1.6', title: 'Instructions', path: '/instructions' },
]

const MOCK_DATA = {
  students: [
    { id: 1, name: 'Juan Dela Cruz', meta: 'BSCS • 3rd Year • Active' },
    { id: 2, name: 'Maria Santos', meta: 'BSCS • 2nd Year • Active' },
  ],
  faculty: [
    { id: 1, name: 'Prof. Maria Santos', meta: 'Full-time • CS Dept.' },
  ],
  events: [
    { id: 1, name: 'CCS Research Colloquium', meta: 'Apr 15, 2026 • Auditorium' },
  ],
  schedules: [
    { id: 1, name: 'CS101 – Intro to Programming', meta: 'MWF 9:00–10:30 • Lab 2' },
  ],
  research: [
    { id: 1, name: 'AI for Campus Analytics', meta: 'Ongoing • College Research' },
  ],
  instructions: [
    { id: 1, name: 'BSCS Curriculum 2026', meta: 'Updated • Effective AY 26–27' },
  ],
}

const moduleCounts = {
  'student-profile': MOCK_DATA.students.length,
  'faculty-profile': MOCK_DATA.faculty.length,
  events: MOCK_DATA.events.length,
  scheduling: MOCK_DATA.schedules.length,
  'college-research': MOCK_DATA.research.length,
  instructions: MOCK_DATA.instructions.length,
}

const totalRecords = Object.values(moduleCounts).reduce((a, b) => a + b, 0)

function SummaryCard({ label, value, hint, link }) {
  return (
    <Link to={link} className="summary-card summary-card-link">
      <div className="summary-label">{label}</div>
      <div className="summary-value">{value}</div>
      <div className="summary-hint">{hint}</div>
    </Link>
  )
}

export default function Dashboard() {
  const [search, setSearch] = useState('')
  const query = search.toLowerCase()

  const filteredItems = useMemo(() => {
    const all = [
      ...MOCK_DATA.students.map((i) => ({ ...i, type: 'student', module: 'student-profile' })),
      ...MOCK_DATA.faculty.map((i) => ({ ...i, type: 'faculty', module: 'faculty-profile' })),
      ...MOCK_DATA.events.map((i) => ({ ...i, type: 'event', module: 'events' })),
      ...MOCK_DATA.schedules.map((i) => ({ ...i, type: 'schedule', module: 'scheduling' })),
      ...MOCK_DATA.research.map((i) => ({ ...i, type: 'research', module: 'college-research' })),
      ...MOCK_DATA.instructions.map((i) => ({ ...i, type: 'instruction', module: 'instructions' })),
    ]
    if (!query) return all
    return all.filter(
      (i) =>
        i.name.toLowerCase().includes(query) || i.meta.toLowerCase().includes(query)
    )
  }, [query])

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1 className="main-title">Dashboard</h1>
          <p className="main-description">
            Overview of information across all mandatory modules of the CCS system.
          </p>
        </div>
        <div className="search-section">
          <input
            className="search-input"
            type="text"
            placeholder="Search across all modules…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <section className="summary-row">
        {MODULES.map((m) => (
          <SummaryCard
            key={m.id}
            label={m.title}
            value={moduleCounts[m.id] ?? 0}
            hint={`View ${m.title}`}
            link={m.path}
          />
        ))}
      </section>

      <section className="content-panel">
        <div className="content-header">
          <div>
            <h2 className="content-title">Quick View</h2>
            <p className="content-subtitle">
              Recent records from all modules. Click a module to see full details.
            </p>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name / Title</th>
                <th>Details</th>
                <th>Module</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="4" className="empty-state">
                    No records match your search.
                  </td>
                </tr>
              )}
              {filteredItems.map((item, index) => (
                <tr key={`${item.type}-${item.id}`}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.meta}</td>
                  <td className="tag">
                    <Link to={`/${item.module}`}>
                      {MODULES.find((m) => m.id === item.module)?.title ?? item.module}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
