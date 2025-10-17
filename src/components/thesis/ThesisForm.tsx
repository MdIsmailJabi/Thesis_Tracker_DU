"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { guides, students } from "@/lib/mock-data";
import { Sparkles, Upload } from "lucide-react";
import { AbstractRefinementModal } from "./AbstractRefinementModal";
import { useToast } from "@/hooks/use-toast";

export function ThesisForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [abstract, setAbstract] = useState("This thesis explores the depths of an advanced topic, providing novel insights and comprehensive analysis.");
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Thesis Submitted",
            description: "Your thesis has been successfully submitted for review.",
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl">Submit Your Thesis</CardTitle>
                        <CardDescription>
                            Fill out the form below to submit your thesis for approval. All fields are required.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Thesis Title</Label>
                            <Input id="title" placeholder="A Comprehensive Study on..." defaultValue="A Comprehensive Study on Advanced Topics" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="abstract">Abstract</Label>
                                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
                                    <Sparkles className="mr-2 h-4 w-4 text-accent" />
                                    Refine with AI
                                </Button>
                            </div>
                            <Textarea
                                id="abstract"
                                placeholder="Provide a brief summary of your thesis..."
                                className="min-h-[150px]"
                                value={abstract}
                                onChange={(e) => setAbstract(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="keywords">Keywords</Label>
                            <Input id="keywords" placeholder="Enter keywords separated by commas" defaultValue="research, academia, topic" />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="guide">Guide</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your guide" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {guides.map(guide => (
                                            <SelectItem key={guide.uid} value={guide.uid}>{guide.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="co-guide">Co-Guide</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your co-guide" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {guides.map(guide => (
                                            <SelectItem key={guide.uid} value={guide.uid}>{guide.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="thesis-pdf">Upload Thesis (PDF)</Label>
                                <Input id="thesis-pdf" type="file" className="pt-1.5"/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="plagiarism-report">Upload Plagiarism Report (PDF)</Label>
                                <Input id="plagiarism-report" type="file" className="pt-1.5" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" size="lg">
                                <Upload className="mr-2 h-4 w-4" />
                                Submit for Approval
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
            <AbstractRefinementModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                originalAbstract={abstract}
                onSave={(newAbstract) => {
                    setAbstract(newAbstract);
                    setIsModalOpen(false);
                     toast({
                        title: "Abstract Updated",
                        description: "Your abstract has been updated with the AI-refined version.",
                    });
                }}
            />
        </>
    );
}
