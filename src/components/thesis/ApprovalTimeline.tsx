import { activityLogs, users } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Check, Mail, MessageSquare, Pencil } from "lucide-react";

interface ApprovalTimelineProps {
  thesisId: string;
}

const actionIcons = {
    'Submitted Thesis': Pencil,
    'Approved Thesis': Check,
    'Requested Revision': Mail,
    'Submitted Progress Report': MessageSquare,
} as const;

export function ApprovalTimeline({ thesisId }: ApprovalTimelineProps) {
  const relevantLogs = activityLogs
    .filter(log => log.thesisId === thesisId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  if (relevantLogs.length === 0) {
    return <p className="text-muted-foreground">No activity history available for this thesis.</p>;
  }

  return (
    <div className="space-y-8">
      {relevantLogs.map((log, index) => {
        const user = users.find(u => u.uid === log.userId);
        const Icon = actionIcons[log.action as keyof typeof actionIcons] || Pencil;
        const isLast = index === relevantLogs.length - 1;
        return (
          <div key={log.logId} className="flex gap-4">
            <div className="relative flex flex-col items-center">
              <Avatar className="flex h-10 w-10 items-center justify-center border-2 bg-background">
                <AvatarImage src={user?.avatar} alt={user?.name} data-ai-hint="person portrait"/>
                <AvatarFallback>{user?.name.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              {!isLast && <div className="w-px flex-grow bg-border" />}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {user?.name || 'System'}
                  <span className="font-normal text-muted-foreground"> - {user?.role}</span>
                </p>
                <time className="text-xs text-muted-foreground">
                  {log.timestamp.toLocaleString()}
                </time>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4" />
                  <span>{log.action}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
