import { useEffect, useState } from 'react'

const STUDENT_SECTIONS = [
  { icon: '👤', title: 'Basic Information', items: ['Full name', 'Student ID / registration number', 'Date of birth', 'Gender', 'Photo', 'Contact details (email, phone)', 'Address'] },
  { icon: '📚', title: 'Academic Information', items: ['Current program/course', 'Department or faculty', 'Year level / grade level', 'Section or class', 'Advisor or homeroom teacher'] },
  { icon: '📝', title: 'Enrollment Details', items: ['Subjects enrolled this term', 'Class schedule', 'Semester / term information', 'Enrollment status (active, leave, graduated)'] },
  { icon: '📊', title: 'Academic Performance', items: ['Grades per subject', 'GPA / average', 'Academic standing', 'Transcript or report card'] },
  { icon: '📅', title: 'Attendance Records', items: ['Daily attendance', 'Absences / tardiness', 'Attendance percentage'] },
  { icon: '🏆', title: 'Activities & Achievements', items: ['Clubs or organizations', 'Awards and recognitions', 'Extracurricular activities', 'Competitions participated in'] },
  { icon: '💳', title: 'Financial Information', items: ['Tuition balance', 'Payment history', 'Scholarships or grants'] },
  { icon: '📂', title: 'Documents & Requirements', items: ['Uploaded documents (ID, birth certificate, etc.)', 'Admission requirements', 'Certificates'] },
  { icon: '⚖️', title: 'Behavior / Discipline Records', items: ['Warnings or disciplinary actions', 'Teacher notes or comments'] },
]

export default function StudentProfile() {
  const [student, setStudent] = useState(null)

  useEffect(() => {
    try {
      const session = localStorage.getItem('studentSession')
      if (session) {
        setStudent(JSON.parse(session))
      }
    } catch {
      setStudent(null)
    }
  }, [])

  const displayName = student?.idOrEmail || 'Student'

  return (
    <div className="profile-page profile-page-student">
      <div className="profile-hero profile-hero-student">
        <div className="profile-hero-badge">Student</div>
        <div className="profile-avatar profile-avatar-student">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <h1 className="profile-hero-title">{displayName}</h1>
        <p className="profile-hero-subtitle">Enrolled Student</p>
      </div>

      <div className="profile-grid">
        {STUDENT_SECTIONS.map((section, i) => (
          <div key={i} className="profile-card profile-card-student">
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
