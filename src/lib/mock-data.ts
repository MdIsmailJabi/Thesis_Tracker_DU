import type { User, UserRole, Thesis, ProgressReport, ActivityLog, ThesisStatus } from './types';

const roles: UserRole[] = ['scholar', 'guide', 'registrar', 'vc', 'brs'];
const departments = ['Computer Science', 'Mechanical Engineering', 'Biotechnology', 'Commerce', 'Arts'];
const thesisStatuses: ThesisStatus[] = ['Not Started', 'Submitted', 'Under Review', 'Approved by Guide', 'Approved by HOD', 'Revision Requested', 'Approved', 'Rejected'];

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const users: User[] = Array.from({ length: 10 }, (_, i) => ({
  uid: `user${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@davangereuniversity.ac.in`,
  role: roles[i % roles.length],
  department: departments[i % departments.length],
  phone: `123-456-789${i}`,
  avatar: `https://picsum.photos/seed/avatar${i+1}/100/100`,
  createdAt: generateRandomDate(new Date(2022, 0, 1), new Date()),
}));

export const students = users.filter(u => u.role === 'scholar');
export const guides = users.filter(u => u.role === 'guide');

export const theses: Thesis[] = Array.from({ length: 5 }, (_, i) => ({
  thesisId: `thesis${i + 1}`,
  studentId: students[i % students.length].uid,
  title: `A Comprehensive Study on Advanced Topic ${i + 1}`,
  abstract: 'This thesis explores the depths of an advanced topic, providing novel insights and comprehensive analysis. The research methodology includes a mixed-methods approach, combining quantitative data with qualitative case studies to present a holistic view.',
  keywords: ['research', 'academia', `topic ${i + 1}`],
  department: departments[i % departments.length],
  guideId: guides[i % guides.length].uid,
  coGuideId: guides[(i + 1) % guides.length].uid,
  status: thesisStatuses[(i + 2) % thesisStatuses.length],
  submittedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
  approvedAt: i % 2 === 0 ? generateRandomDate(new Date(2023, 6, 1), new Date()) : undefined,
  fileUrl: '/mock-thesis.pdf',
  plagiarismReportUrl: '/mock-plagiarism-report.pdf',
  remarks: i % 3 === 0 ? 'Minor revisions required in chapter 3.' : '',
}));

export const progressReports: ProgressReport[] = Array.from({ length: 8 }, (_, i) => ({
  reportId: `report${i + 1}`,
  studentId: students[i % students.length].uid,
  period: `Q${(i % 4) + 1} 2023`,
  type: 'Quarterly',
  fileUrl: '/mock-progress-report.pdf',
  submittedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
  status: i % 2 === 0 ? 'Reviewed' : 'Submitted',
  approvedBy: i % 2 === 0 ? guides[i % guides.length].uid : undefined,
}));


export const activityLogs: ActivityLog[] = [
  { logId: 'log1', userId: 'user2', action: 'Approved Thesis', thesisId: 'thesis1', timestamp: new Date('2023-11-10T10:00:00Z'), ipAddress: '192.168.1.1' },
  { logId: 'log2', userId: 'user1', action: 'Submitted Thesis', thesisId: 'thesis1', timestamp: new Date('2023-11-01T14:30:00Z'), ipAddress: '192.168.1.2' },
  { logId: 'log3', userId: 'user4', action: 'Requested Revision', thesisId: 'thesis2', timestamp: new Date('2023-10-25T09:15:00Z'), ipAddress: '192.168.1.3' },
  { logId: 'log4', userId: 'user3', action: 'Submitted Progress Report', thesisId: 'thesis2', timestamp: new Date('2023-10-20T11:00:00Z'), ipAddress: '192.168.1.4' },
];
