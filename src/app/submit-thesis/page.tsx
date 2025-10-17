import { AppLayout } from "@/components/layout/AppLayout";
import { ThesisForm } from "@/components/thesis/ThesisForm";

export default function SubmitThesisPage() {
    return (
        <AppLayout>
            <div className="mx-auto grid w-full max-w-4xl gap-2">
                <ThesisForm />
            </div>
        </AppLayout>
    );
}
