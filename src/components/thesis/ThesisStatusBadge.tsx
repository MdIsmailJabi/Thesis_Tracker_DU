import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ThesisStatus } from "@/lib/types";

interface ThesisStatusBadgeProps {
  status: ThesisStatus | 'Submitted' | 'Reviewed';
}

export function ThesisStatusBadge({ status }: ThesisStatusBadgeProps) {
  const statusClasses = {
    'Not Started': 'bg-gray-200 text-gray-800 hover:bg-gray-200',
    'Submitted': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    'Under Review': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    'Approved by Guide': 'bg-teal-100 text-teal-800 hover:bg-teal-100',
    'Approved by HOD': 'bg-cyan-100 text-cyan-800 hover:bg-cyan-100',
    'Revision Requested': 'bg-orange-100 text-orange-800 hover:bg-orange-100',
    'Approved': 'bg-green-100 text-green-800 hover:bg-green-100',
    'Rejected': 'bg-red-100 text-red-800 hover:bg-red-100',
    'Reviewed': 'bg-purple-100 text-purple-800 hover:bg-purple-100',
  };

  return (
    <Badge variant="outline" className={cn("border-none", statusClasses[status])}>
      {status}
    </Badge>
  );
}
