import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertMessage({ message }: { message: string }) {
    return (
        <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}
