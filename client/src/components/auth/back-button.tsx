import { Button } from "@/components/ui/button"

export const BackButton = ({ href, label }: { href: string, label: string }) => {
  return(
    <Button variant={"link"} size={"sm"} className="font-normal w-full" asChild>
      <a href={href}>{label}</a>
    </Button>
  )
}
