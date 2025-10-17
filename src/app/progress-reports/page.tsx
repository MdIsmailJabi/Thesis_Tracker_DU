import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilePlus2, Upload } from "lucide-react";
import { progressReports } from "@/lib/mock-data";
import { ThesisStatusBadge } from "@/components/thesis/ThesisStatusBadge";

export default function ProgressReportsPage() {
    return (
        <AppLayout>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Submit New Progress Report</CardTitle>
                        <CardDescription>Upload your periodic progress report here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="period">Report Period</Label>
                            <Input id="period" placeholder="e.g., Q3 2024" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="type">Report Type</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select report type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="quarterly">Quarterly</SelectItem>
                                    <SelectItem value="final">Final</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="report-file">Report File (PDF)</Label>
                            <Input id="report-file" type="file" />
                        </div>
                        <div className="flex justify-end">
                            <Button>
                                <Upload className="mr-2 h-4 w-4" />
                                Submit Report
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Submission History</CardTitle>
                        <CardDescription>Your previously submitted progress reports.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Period</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
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
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
