import { cn } from "@/lib/utils"

export const Header = ({ label }: { label: string }) => {
  return(
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn(
        "text-3xl font-semibold tracking-tight",
      )}>Tkdathletics</h1>
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
}
