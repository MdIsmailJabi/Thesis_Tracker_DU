import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { activityLogs, users } from "@/lib/mock-data";

const emailLogs = [
    { id: 1, to: "student1@davangereuniversity.ac.in", subject: "Thesis Approval Update", timestamp: new Date("2023-11-10T10:01:00Z"), status: "Sent" },
    { id: 2, to: "guide2@davangereuniversity.ac.in", subject: "New Thesis for Review", timestamp: new Date("2023-11-01T14:31:00Z"), status: "Sent" },
    { id: 3, to: "student2@davangereuniversity.ac.in", subject: "Revision Requested", timestamp: new Date("2023-10-25T09:16:00Z"), status: "Sent" },
];

export default function LogsPage() {
    return (
        <AppLayout>
            <div className="grid gap-6">
                <CardHeader className="p-0">
                    <CardTitle className="font-headline text-3xl">System Logs</CardTitle>
                    <CardDescription>Review system activity and email notifications.</CardDescription>
                </CardHeader>
                <Tabs defaultValue="activity">
                    <TabsList>
                        <TabsTrigger value="activity">Activity Logs</TabsTrigger>
                        <TabsTrigger value="email">Email Logs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="activity">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Activity</CardTitle>
                                <CardDescription>A log of all significant actions taken by users.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Action</TableHead>
                                            <TableHead>Thesis ID</TableHead>
                                            <TableHead>Timestamp</TableHead>
                                            <TableHead>IP Address</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {activityLogs.map(log => {
                                            const user = users.find(u => u.uid === log.userId);
                                            return (
                                                <TableRow key={log.logId}>
                                                    <TableCell>{user?.name || log.userId}</TableCell>
                                                    <TableCell>{log.action}</TableCell>
                                                    <TableCell>{log.thesisId}</TableCell>
                                                    <TableCell>{log.timestamp.toLocaleString()}</TableCell>
                                                    <TableCell>{log.ipAddress}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="email">
                        <Card>
                            <CardHeader>
                                <CardTitle>Email Notifications</CardTitle>
                                <CardDescription>A log of all automated emails sent by the system.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Recipient</TableHead>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Timestamp</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {emailLogs.map(log => (
                                            <TableRow key={log.id}>
                                                <TableCell>{log.to}</TableCell>
                                                <TableCell>{log.subject}</TableCell>
                                                <TableCell>{log.status}</TableCell>
                                                <TableCell>{log.timestamp.toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
