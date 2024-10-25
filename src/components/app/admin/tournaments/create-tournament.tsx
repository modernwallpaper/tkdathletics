import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateTournamentSchemaFrontend } from "../../../../../schemas"
import { z } from "zod"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { getAllUsers } from "@/hooks/getAllUsers"
import { DropdownMenuCheckboxItem, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUploadTournamentFile } from "@/hooks/useUploadTournamentFile"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { useRouter } from "@tanstack/react-router"

export const CreateTournametForm = () => {
  const form = useForm<z.infer<typeof CreateTournamentSchemaFrontend>>({
    resolver: zodResolver(CreateTournamentSchemaFrontend),
  })

  const [dataLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { UploadFile, fileLoading } =  useUploadTournamentFile();

  const onSubmit = async (values: z.infer<typeof CreateTournamentSchemaFrontend>) => {
    setLoading(true);
    const { result, contract, participants, ...tournamentData } = values;

    const uploadedResult = result ? await UploadFile(result) : null;
    const uploadedContract = contract ? await UploadFile(contract) : null;

    const finalData = {
      ...tournamentData,
      date: new Date(tournamentData.date ? tournamentData.date : ""),
      result: uploadedResult ? {
        id: uploadedResult 
      } : undefined,
      contract: uploadedContract ? {
        id: uploadedContract
      } : undefined,
      participants,
    }

    console.log(uploadedResult);

    try {
      const res = await fetch("/api/tournament/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if(!res.ok) {
        throw new Error("Failed to create tournament");
      }

      const data = await res.json();
      console.log(data);
      setLoading(false);
      sessionStorage.setItem("toastMessage", data.success);
      await router.navigate({ to: "/v1/admin" });
      window.location.reload()
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const { loading, users } = getAllUsers();

  if(!users) {
    return <p>Internal server error...</p>
  }

  return(
    <div className="felx w-fit">
      <CardHeader>
        <CardTitle>Create Tournament</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-2">
            <FormField
              disabled={dataLoading || fileLoading}
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="example"/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField 
              disabled={dataLoading || fileLoading}
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="City, Country, etc."/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField 
              disabled={dataLoading || fileLoading}
              name="date"
              control={form.control}
              render={({ field }) => (
                  <FormItem className="flex flex-col">
                  <FormLabel>Date of tournament</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField 
              disabled={dataLoading || fileLoading}
              name="result"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Results</FormLabel>
                  <FormControl>
                    <Input 
                      type="file"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          field.onChange(e.target.files[0]);  
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField 
              disabled={dataLoading || fileLoading}
              name="contract"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract</FormLabel>
                  <FormControl>
                    <Input 
                      type="file"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField 
              disabled={dataLoading || fileLoading}
              name="participants"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-1">
                  <FormLabel>Participants</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={"outline"}>
                          <p>Choose participants</p>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {loading ? (
                          <p>Loading...</p>
                        ): (
                          <div>
                            {users.map((user) => (
                              <FormControl>
                                <DropdownMenuCheckboxItem
                                  key={user.id}
                                  checked={field.value?.includes(user.id ? user.id : "")}
                                  onCheckedChange={() => {
                                    const newValue = field.value?.includes(user.id ? user.id : "") 
                                      ? field.value.filter((id: String) => id !== user.id)
                                      : [...field.value || [], user.id];
                                    field.onChange(newValue);
                                  }}
                                >
                                  <p key={user.id}>{user.name}</p>
                                </DropdownMenuCheckboxItem>
                              </FormControl>
                            ))}
                          </div>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Separator className="mt-3"/>
          <div className="flex gap-x-2">
            <Button disabled={dataLoading || fileLoading} asChild className="w-full mt-3" variant={"secondary"}>
              <a href="/v1/admin">
                Cancel
              </a>
            </Button>
            <Button disabled={dataLoading || fileLoading} className="w-full mt-3" type="submit">
              <p>Create</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
