import type { Metadata } from 'next'
import { adminDb } from '@/lib/firebase/admin'

export const metadata: Metadata = {
  title: 'Team | Digital Accounting Transformation',
}

interface TeamMember {
  id?: string
  fullName?: string
  displayName?: string
  email?: string
  role?: string
  bio?: string
  photoURL?: string
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    fullName: 'Ronith',
    role: 'Business Analyst',
    bio: 'Studying a Bachelor of Computer Science, minoring in Data Science and AI. Currently working part time as an Automations and System Engineer, specialising in data engineering and machine learning.',
  },
  {
    fullName: 'Manan',
    role: 'User Experience Specialist',
    bio: 'Studying a Bachelor of Computer Science. Currently runs his own business managing day to day operations, clients and teams. Strong foundation in planning, problem solving and understanding user / business requirements.',
  },
  {
    fullName: 'Shihong',
    role: 'Developer',
    bio: 'Studying a Bachelors of IT with a minor in Data Science. Enjoys programming and developing small projects in his own time to learn new tools and technologies.',
  },
  {
    fullName: 'Zekun',
    role: 'Developer',
    bio: 'Studying a Bachelor of IT, specialising in deep learning, cloud architecture and data science. Committed to leveraging analytical insights to deliver high impact solutions.',
  },
]

export default async function TeamPage() {
  let dbMembers: TeamMember[] = []

  try {
    const snapshot = await adminDb.collection('users').get()
    dbMembers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TeamMember[]
  } catch (error) {
    console.error('Failed to fetch team members from Firestore:', error)
  }
  const displayList: TeamMember[] = [...dbMembers]
  
  DEFAULT_MEMBERS.forEach((defaultMember) => {
    if (displayList.length < 4) {
      const exists = displayList.some(
        (m) => (m.fullName || m.displayName)?.toLowerCase() === defaultMember.fullName?.toLowerCase()
      )
      if (!exists) {
        displayList.push(defaultMember)
      }
    }
  })

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#0c0e5a] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayList.slice(0, 4).map((member, index) => (
            <div
              key={member.id || index}
              className="flex flex-col items-center rounded-md bg-white p-5 shadow-lg"
            >
              {/* 1. pic */}
              {member.photoURL ? (
                <img
                  src={member.photoURL}
                  alt={member.fullName || 'Member'}
                  className="mb-4 h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="mb-4 h-24 w-24 rounded-full bg-zinc-300" />
              )}

              {/* 2. Full Name */}
              <div className="mb-1.5 flex w-full justify-center">
                <span className="rounded bg-zinc-200 px-3 py-0.5 text-xs font-semibold text-zinc-800">
                  {member.fullName || member.displayName || member.email || '(Full Name)'}
                </span>
              </div>

              {/* 3. Role */}
              <div className="mb-4 flex w-full justify-center">
                <span className="rounded bg-zinc-200 px-3 py-0.5 text-xs font-medium text-zinc-700">
                  {member.role || '(Role)'}
                </span>
              </div>

              {/* 4. describe */}
              <div className="mt-auto w-full text-center text-xs leading-relaxed text-zinc-600">
                {member.bio ? (
                  <p className="line-clamp-6">{member.bio}</p>
                ) : (
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-zinc-200" />
                    <div className="h-2 w-full rounded bg-zinc-200" />
                    <div className="h-2 w-full rounded bg-zinc-200" />
                    <div className="h-2 w-full rounded bg-zinc-200" />
                    <div className="h-2 w-full rounded bg-zinc-200" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}