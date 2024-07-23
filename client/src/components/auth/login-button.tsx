import { useRouter } from "@tanstack/react-router"

export const LoginButton = ({ 
  children, 
  mode = "redirect", 
  //asChild 
}: { 
  children: React.ReactNode, 
  mode?: "modal" | "redirect", 
  asChild?: boolean 
})=> {
  const router = useRouter();
  const onClick = () => {
    router.navigate({ to: "/login" });
  }

  if(mode === "modal") {
    return <span>TODO: Implement Modal Mode</span>
  }

  return(
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
