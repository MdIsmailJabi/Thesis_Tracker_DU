import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { theses, users } from "@/lib/mock-data";
import { ThesisStatusBadge } from "@/components/thesis/ThesisStatusBadge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function ThesesListPage() {
    return (
        <AppLayout>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-3xl">Thesis Submissions</CardTitle>
                <CardDescription>
                  A list of all thesis submissions in the system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead className="hidden md:table-cell">Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Submitted</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {theses.map((thesis) => {
                        const student = users.find(u => u.uid === thesis.studentId);
                        return (
                            <TableRow key={thesis.thesisId}>
                                <TableCell>
                                <div className="font-medium">{student?.name || 'Unknown Student'}</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    {student?.email}
                                </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell max-w-xs truncate">{thesis.title}</TableCell>
                                <TableCell>{thesis.department}</TableCell>
                                <TableCell>
                                    <ThesisStatusBadge status={thesis.status} />
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {new Date(thesis.submittedAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Button asChild variant="ghost" size="icon">
                                        <Link href={`/theses/${thesis.thesisId}`}>
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
        </AppLayout>
    );
}
