"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { Separator } from '../ui/separator';

interface AbstractRefinementModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalAbstract: string;
  onSave: (newAbstract: string) => void;
}

export function AbstractRefinementModal({ isOpen, onClose, originalAbstract, onSave }: AbstractRefinementModalProps) {
  const [refinedAbstract, setRefinedAbstract] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefine = () => {
    setIsLoading(true);
    // Mock AI refinement
    setTimeout(() => {
      setRefinedAbstract(originalAbstract + " This AI-refined version adds more impactful language and clarifies the research contribution for better academic visibility.");
      setIsLoading(false);
    }, 1500);
  };

  const handleUseThisVersion = () => {
    onSave(refinedAbstract);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline"><Sparkles className="text-accent" /> AI Content Improvement</DialogTitle>
          <DialogDescription>
            Refine your thesis abstract for clarity, impact, and academic tone.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Your Original Abstract</h3>
              <Textarea readOnly value={originalAbstract} className="min-h-[120px] bg-muted" />
            </div>
            <div className="flex justify-center">
                 <Button type="button" onClick={handleRefine} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Refine with AI
                </Button>
            </div>
            <div>
                <h3 className="font-semibold mb-2">AI-Powered Suggestion</h3>
                {isLoading ? (
                    <div className="min-h-[120px] rounded-md border border-dashed flex items-center justify-center">
                        <p className="text-muted-foreground">Generating suggestions...</p>
                    </div>
                ) : (
                    <Textarea 
                        value={refinedAbstract} 
                        onChange={(e) => setRefinedAbstract(e.target.value)}
                        className="min-h-[120px]" 
                        placeholder="AI suggestions will appear here..."
                    />
                )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleUseThisVersion} disabled={!refinedAbstract || isLoading}>Use This Version</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
