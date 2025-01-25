import { Separator } from "@/components/ui/separator"
import { SmallPageHeader } from "../page-header"
import { OfflineForm } from "./offline-form"

export const Offline = () => {
  return(
    <div>
      <SmallPageHeader label="Offline" />
      <p className="text-sm text-muted-foreground">Manage the settings for what should be made available offline</p>
      <Separator orientation="horizontal" className="mt-6 mb-6"/>
      <OfflineForm />
    </div>
  )
}
