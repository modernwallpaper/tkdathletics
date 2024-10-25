import { CircleAlert } from "lucide-react";

export const FormError = ({ message }: { message: string }) => {
  return (
    <div className="flex gap-x-2 items-center justify-start w-full rounded-md border border-destructive p-3 text-destructive">
      <CircleAlert className="h-4 w-4 text-destructive" />
      <p className="text-destructive">{message}</p>
    </div>
  );
};
