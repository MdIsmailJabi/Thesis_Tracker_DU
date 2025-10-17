import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { users } from "@/lib/mock-data";
import { Checkbox } from "@/components/ui/checkbox";

const approvalStages = [
    { id: 1, name: "Guide Approval", role: "guide", order: 1, isFinal: false },
    { id: 2, name: "BRS Committee", role: "brs", order: 2, isFinal: false },
    { id: 3, name: "Registrar Finalization", role: "registrar", order: 3, isFinal: false },
    { id: 4, name: "VC Approval", role: "vc", order: 4, isFinal: true },
];

export default function SettingsPage() {
    return (
        <AppLayout>
            <div className="grid gap-6">
                <CardHeader className="p-0">
                    <CardTitle className="font-headline text-3xl">Admin Settings</CardTitle>
                    <CardDescription>Manage application-wide configurations.</CardDescription>
                </CardHeader>
                <Tabs defaultValue="stages">
                    <TabsList>
                        <TabsTrigger value="stages">Approval Stages</TabsTrigger>
                        <TabsTrigger value="roles">Role Management</TabsTrigger>
                        <TabsTrigger value="templates">Email Templates</TabsTrigger>
                    </TabsList>
                    <TabsContent value="stages">
                        <Card>
                            <CardHeader>
                                <CardTitle>Approval Workflow Stages</CardTitle>
                                <CardDescription>Define the sequence of approvals for thesis submissions.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Order</TableHead>
                                            <TableHead>Stage Name</TableHead>
                                            <TableHead>Approving Role</TableHead>
                                            <TableHead>Is Final</TableHead>
                                            <TableHead><span className="sr-only">Actions</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {approvalStages.map(stage => (
                                            <TableRow key={stage.id}>
                                                <TableCell><Input type="number" defaultValue={stage.order} className="w-16" /></TableCell>
                                                <TableCell><Input defaultValue={stage.name} /></TableCell>
                                                <TableCell><Input defaultValue={stage.role} /></TableCell>
                                                <TableCell><Checkbox checked={stage.isFinal} /></TableCell>
                                                <TableCell><Button variant="outline" size="sm">Save</Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <div className="flex justify-end mt-4">
                                     <Button>Add Stage</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="roles">
                        <Card>
                             <CardHeader>
                                <CardTitle>User Role Management</CardTitle>
                                <CardDescription>View and manage user roles across the university.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Department</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map(user => (
                                            <TableRow key={user.uid}>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.role}</TableCell>
                                                <TableCell>{user.department}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="templates">
                         <Card>
                             <CardHeader>
                                <CardTitle>Email Templates</CardTitle>
                                <CardDescription>Edit the content of automated email notifications.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Email template management UI would be here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
