"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ThesisStatusBadge } from "../thesis/ThesisStatusBadge"
import { useAuth } from "@/hooks/useAuth"
import { theses, progressReports as allProgressReports } from "@/lib/mock-data"
import { BookUp, FilePlus2 } from "lucide-react"

const statusToProgress: Record<string, number> = {
    'Not Started': 0,
    'Submitted': 20,
    'Under Review': 40,
    'Approved by Guide': 60,
    'Approved by HOD': 80,
    'Revision Requested': 50,
    'Approved': 100,
    'Rejected': 100
}

export function StudentDashboard() {
  const { user } = useAuth();
  const myThesis = theses.find(t => t.studentId === user?.uid);
  const progressReports = allProgressReports.filter(pr => pr.studentId === user?.uid);
  const progress = myThesis ? statusToProgress[myThesis.status] : 0;
  const progressColor = myThesis?.status === 'Rejected' ? 'bg-destructive' : 'bg-primary';

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline">Your Thesis</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Track your thesis submission and approval status.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
                <Link href="/submit-thesis"><BookUp className="mr-2 h-4 w-4"/>{myThesis ? 'Update Thesis' : 'Submit Thesis'}</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Current Status</CardDescription>
            <div className="flex items-center gap-2">
                <CardTitle className="text-4xl">{progress}%</CardTitle>
                {myThesis && <ThesisStatusBadge status={myThesis.status} />}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {myThesis?.status || 'Not Started'}
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={progress} aria-label={`${progress}% complete`} indicatorclassname={progressColor} />
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Progress Reports</CardTitle>
                <CardDescription>
                    Submit and view your periodic progress reports.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/progress-reports">
                    <FilePlus2 className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        New Report
                    </span>
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {progressReports.map(report => (
                <TableRow key={report.reportId}>
                  <TableCell className="font-medium">{report.period}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell><ThesisStatusBadge status={report.status} /></TableCell>
                  <TableCell>{new Date(report.submittedAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {progressReports.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">No progress reports submitted yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
