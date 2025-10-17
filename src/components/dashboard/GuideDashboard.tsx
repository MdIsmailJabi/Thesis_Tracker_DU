"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { theses, users } from "@/lib/mock-data"
import { useAuth } from "@/hooks/useAuth"
import { ThesisStatusBadge } from "../thesis/ThesisStatusBadge"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function GuideDashboard() {
    const { user } = useAuth()
    const assignedTheses = theses.filter(t => t.guideId === user?.uid || t.coGuideId === user?.uid);

    return (
        <div>
            <CardHeader className="px-0">
                <CardTitle className="font-headline text-3xl">Theses for Review</CardTitle>
                <CardDescription>
                    Theses assigned to you for approval.
                </CardDescription>
            </CardHeader>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {assignedTheses.map(thesis => {
                    const student = users.find(u => u.uid === thesis.studentId);
                    return (
                        <Card key={thesis.thesisId} className="flex flex-col">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-lg font-semibold">{thesis.title}</CardTitle>
                                    <ThesisStatusBadge status={thesis.status} />
                                </div>
                                {student && (
                                    <div className="flex items-center gap-2 pt-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="person portrait" />
                                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <CardDescription>{student.name}</CardDescription>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="line-clamp-3 text-sm text-muted-foreground">{thesis.abstract}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" asChild>
                                    <Link href={`/theses/${thesis.thesisId}`}>View Details</Link>
                                </Button>
                                <div className="flex gap-2">
                                    <Button variant="destructive" size="sm">Reject</Button>
                                    <Button size="sm">Approve</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    )
                })}
                 {assignedTheses.length === 0 && (
                    <p className="text-muted-foreground col-span-full">No theses are currently assigned to you for review.</p>
                )}
            </div>
        </div>
    )
}
