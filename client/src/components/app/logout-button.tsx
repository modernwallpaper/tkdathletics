import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/useLogout";

export const LogoutButton = () => {
  const { logout } = useLogout();

  const onClick = () => {
    logout();
  };

  return (
    <Button
      onClick={onClick}
      variant={"secondary"}
      className="w-full flex items-center group"
    >
      <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 transform group-hover:-translate-x-1" />
      <p>Logout</p>
    </Button>
  );
};
