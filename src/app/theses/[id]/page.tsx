import { AppLayout } from "@/components/layout/AppLayout";
import { notFound } from "next/navigation";
import { theses, users, guides } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThesisStatusBadge } from "@/components/thesis/ThesisStatusBadge";
import { Separator } from "@/components/ui/separator";
import { ApprovalTimeline } from "@/components/thesis/ApprovalTimeline";
import { Check, Download, FileText, Fingerprint, Mail, MessageSquare, User, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ThesisDetailPage({ params }: { params: { id: string } }) {
    const thesis = theses.find(t => t.thesisId === params.id);

    if (!thesis) {
        notFound();
    }

    const student = users.find(u => u.uid === thesis.studentId);
    const guide = guides.find(g => g.uid === thesis.guideId);
    const coGuide = guides.find(g => g.uid === thesis.coGuideId);

    return (
        <AppLayout>
            <div className="grid gap-4 md:grid-cols-[1fr_350px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <CardTitle className="font-headline text-3xl">{thesis.title}</CardTitle>
                                <ThesisStatusBadge status={thesis.status} />
                            </div>
                            <CardDescription>
                                Submitted on {new Date(thesis.submittedAt).toLocaleDateString()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold">Abstract</h3>
                                    <p className="text-muted-foreground">{thesis.abstract}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                     <h3 className="font-semibold w-full">Keywords</h3>
                                    {thesis.keywords.map(kw => <Badge variant="secondary" key={kw}>{kw}</Badge>)}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ApprovalTimeline thesisId={thesis.thesisId} />
                        </CardContent>
                    </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 text-sm">
                           <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="font-semibold mr-2">Student:</span>
                                <span>{student?.name}</span>
                            </div>
                             <div className="flex items-center">
                                <Fingerprint className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="font-semibold mr-2">Department:</span>
                                <span>{thesis.department}</span>
                            </div>
                             <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="font-semibold mr-2">Guide:</span>
                                <span>{guide?.name}</span>
                            </div>
                             <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="font-semibold mr-2">Co-Guide:</span>
                                <span>{coGuide?.name}</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Documents</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <FileText className="h-4 w-4" /> Thesis Document
                                <Download className="h-4 w-4 ml-auto"/>
                            </Button>
                             <Button variant="outline" className="w-full justify-start gap-2">
                                <FileText className="h-4 w-4" /> Plagiarism Report
                                <Download className="h-4 w-4 ml-auto"/>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <Button><Check className="mr-2 h-4 w-4"/>Approve</Button>
                            <Button variant="destructive"><X className="mr-2 h-4 w-4"/>Reject</Button>
                            <Button variant="outline"><Mail className="mr-2 h-4 w-4"/>Request Revision</Button>
                        </CardContent>
                        <CardFooter>
                            <Textarea placeholder="Add remarks... (optional)" />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
// Required for textarea in footer
import { Textarea } from "@/components/ui/textarea";
