export type UserRole = 'scholar' | 'guide' | 'co_guide' | 'hod' | 'registrar' | 'vc' | 'brs' | 'research_admin';

export interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  phone: string;
  avatar: string;
  createdAt: Date;
}

export type ThesisStatus = 'Not Started' | 'Submitted' | 'Under Review' | 'Approved by Guide' | 'Approved by HOD' | 'Revision Requested' | 'Approved' | 'Rejected';

export interface Thesis {
  thesisId: string;
  studentId: string;
  title: string;
  abstract: string;
  keywords: string[];
  department: string;
  guideId: string;
  coGuideId: string;
  status: ThesisStatus;
  submittedAt: Date;
  approvedAt?: Date;
  fileUrl: string;
  plagiarismReportUrl: string;
  remarks: string;
}

export interface ProgressReport {
  reportId: string;
  studentId: string;
  period: string;
  type: 'Monthly' | 'Quarterly' | 'Final';
  fileUrl: string;
  submittedAt: Date;
  status: 'Submitted' | 'Reviewed';
  approvedBy?: string;
}

export interface ActivityLog {
  logId: string;
  userId: string;
  action: string;
  thesisId: string;
  timestamp: Date;
  ipAddress: string;
}
