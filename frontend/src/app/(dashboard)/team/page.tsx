import type { Metadata } from 'next'
import { adminDb } from '@/lib/firebase/admin'
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Team | Digital Accounting Transformation',
}

interface TeamMember {
  id?: string
  fullName: string
  role: string
  bio: string
  photoURL?: string
}

interface TeamMemberData {
  fullName?: string
  displayName?: string
  photoURL?: string
  bio?: string
  role?: string
}

const TEAM_83_MEMBERS: TeamMember[] = [
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
  {
    fullName: 'Hayden',
    role: 'PM',
    bio: 'Studying a Bachelor of Computer Science with a major in Cybersecurity. Alongside his technical background in Cybersecurity, AI and Machine Learning, he brings expertise from working in retail leadership and management.',
  },
]

export default async function TeamPage() {
  const dbUsersMap: Record<string, TeamMemberData> = {}

  try {
    const snapshot = await adminDb.collection('users').get()
    snapshot.docs.forEach((doc) => {
      const data = doc.data() as TeamMemberData
      const nameKey = (data.fullName || data.displayName || '').toLowerCase()
      if (nameKey) {
        dbUsersMap[nameKey] = data
      }
    })
  } catch (error) {
    console.error('Failed to fetch users from Firestore:', error)
  }

  const displayList = TEAM_83_MEMBERS.map((member) => {
    const match = dbUsersMap[member.fullName.toLowerCase()]
    return {
      ...member,
      photoURL: match?.photoURL || member.photoURL,
      bio: match?.bio || member.bio,
      role: match?.role || member.role,
    }
  })

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#0c0e5a] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {displayList.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-md bg-white p-5 shadow-lg"
            >
              {/* 1 icon */}
              {member.photoURL ? (
                <Image 
                  src={member.photoURL}
                  alt={member.fullName}
                  className="mb-4 h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="mb-4 h-24 w-24 rounded-full bg-zinc-300" />
              )}

              {/* 2. Full Name */}
              <div className="mb-1.5 flex w-full justify-center">
                <span className="rounded bg-zinc-200 px-3 py-0.5 text-xs font-semibold text-zinc-800">
                  {member.fullName}
                </span>
              </div>

              {/* 3. Role  */}
              <div className="mb-4 flex w-full justify-center">
                <span className="rounded bg-zinc-200 px-3 py-0.5 text-xs font-medium text-zinc-700">
                  {member.role}
                </span>
              </div>

              {/* 4. info describe */}
              <div className="mt-auto w-full text-center text-xs leading-relaxed text-zinc-600">
                <p className="line-clamp-6">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}