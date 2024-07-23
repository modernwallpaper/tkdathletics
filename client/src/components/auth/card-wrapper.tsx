import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Header } from "./header";
import { BackButton } from "./back-button";


interface Props {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref }: Props) => {
  return(
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel}/>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel}/>
      </CardFooter>
    </Card>
  )
}
