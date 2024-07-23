import { useSelector } from "react-redux"
import { LogoutButton } from "../auth/logout-button"
import { RootState } from "@/store"

export const SettingsPage = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div>
      <LogoutButton />
      <div>
        {JSON.stringify(user)}
      </div>
    </div>
  )
}
