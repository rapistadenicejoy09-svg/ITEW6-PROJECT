import { useEffect, useState } from 'react'

const FACULTY_SECTIONS = [
  {
    icon: '👤',
    title: 'Personal Information',
    items: ['Full name', 'Faculty ID', 'Email address', 'Contact number', 'Department / Faculty', 'Photo'],
  },
  {
    icon: '📚',
    title: 'Academic Details',
    items: ['Current position / rank', 'Specialization', 'Years of service', 'Advisor status'],
  },
  {
    icon: '📅',
    title: 'Teaching Load',
    items: ['Subjects assigned', 'Class schedule', 'Semester / term', 'Office hours'],
  },
  {
    icon: '🔬',
    title: 'Research & Publications',
    items: ['Research projects', 'Publications', 'Conferences attended', 'Grants'],
  },
]

export default function FacultyProfile() {
  const [faculty, setFaculty] = useState(null)

  useEffect(() => {
    try {
      const session = localStorage.getItem('facultySession')
      if (session) {
        setFaculty(JSON.parse(session))
      }
    } catch {
      setFaculty(null)
    }
  }, [])

  const displayName = faculty?.email?.split('@')[0] || 'Faculty Member'

  return (
    <div className="profile-page profile-page-faculty">
      <div className="profile-hero profile-hero-faculty">
        <div className="profile-hero-badge">Faculty</div>
        <div className="profile-avatar profile-avatar-faculty">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <h1 className="profile-hero-title">{faculty?.email || 'Faculty Member'}</h1>
        <p className="profile-hero-subtitle">College Faculty</p>
      </div>

      <div className="profile-grid">
        {FACULTY_SECTIONS.map((section, i) => (
          <div key={i} className="profile-card profile-card-faculty">
            <h3 className="profile-card-title">
              <span className="profile-card-icon">{section.icon}</span>
              {section.title}
            </h3>
            <ul className="profile-card-list">
              {section.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
