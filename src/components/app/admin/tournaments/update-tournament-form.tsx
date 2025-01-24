import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { getAllUsers } from "@/hooks/getAllUsers";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import {
  TournamentSchema,
  UpdateTournamentSchema,
} from "../../../../../schemas";
import { z } from "zod";
import { useUpdateTournament } from "@/hooks/useUpdateTournament";

export const UpdateTournamentForm = ({
  tournament,
  dataLoading,
  fileLoading,
}: {
  tournament: z.infer<typeof TournamentSchema>;
  dataLoading: boolean;
  fileLoading: boolean;
}) => {
  const form = useForm<z.infer<typeof UpdateTournamentSchema>>({
    resolver: zodResolver(UpdateTournamentSchema),
    defaultValues: {
      ...tournament,
      date: tournament.date ? new Date(tournament.date) : undefined,
      result: undefined,
      contract: undefined,
      participants: tournament.participants || [],
    },
  });

  const { loading, users } = getAllUsers();
  const { loadingTournamentUpdate, update } = useUpdateTournament();

  if (!users) {
    return <p>Internal server error...</p>;
  }

  const onSubmit = async (values: z.infer<typeof UpdateTournamentSchema>) => {
    await update(values);
  };

  return (
    <div className="felx w-fit">
      <div>
        <CardHeader>
          <CardTitle>
            Update <code>{tournament.id}</code>
          </CardTitle>
          <CardDescription>
            Enter the new tournament information to update
          </CardDescription>
        </CardHeader>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-2">
            <FormField
              disabled={dataLoading || fileLoading || loadingTournamentUpdate}
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="example" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={dataLoading || fileLoading || loadingTournamentUpdate}
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="City, Country, etc." />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={dataLoading || fileLoading || loadingTournamentUpdate}
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
                            !field.value && "text-muted-foreground",
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
              disabled={dataLoading || fileLoading || loadingTournamentUpdate}
              name="result"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Results</FormLabel>
                  {tournament.resultUrl ? (
                    <div>
                      <Button
                        className="w-full mb-2"
                        variant={"secondary"}
                        asChild
                      >
                        <a href={tournament.resultUrl}>
                          Already existing result upload
                        </a>
                      </Button>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              field.onChange(e.target.files[0]);
                            } else {
                              field.onChange(undefined);
                            }
                          }}
                        />
                      </FormControl>
                    </div>
                  ) : (
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            field.onChange(e.target.files[0]);
                          } else {
                            field.onChange(undefined);
                          }
                        }}
                      />
                    </FormControl>
                  )}
                </FormItem>
              )}
            />
            <FormField
              disabled={dataLoading || fileLoading || loadingTournamentUpdate}
              name="contract"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Results</FormLabel>
                  {tournament.contractUrl ? (
                    <div>
                      <Button
                        className="w-full mb-2"
                        variant={"secondary"}
                        asChild
                      >
                        <a href={tournament.contractUrl}>
                          Already existing contract upload
                        </a>
                      </Button>
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
                    </div>
                  ) : (
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
                  )}
                </FormItem>
              )}
            />
            <FormField
              disabled={dataLoading || fileLoading || loadingTournamentUpdate}
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
                        ) : (
                          <div>
                            {users.map((user) => (
                              <FormControl>
                                {user.id ? (
                                  <DropdownMenuCheckboxItem
                                    key={user.id}
                                    onCheckedChange={() => {
                                      const newValue = field.value?.some(
                                        (participant) =>
                                          participant.id === user.id,
                                      )
                                        ? field.value.filter(
                                            (participant) =>
                                              participant.id !== user.id,
                                          )
                                        : [...(field.value || []), user];
                                      field.onChange(newValue);
                                    }}
                                    checked={
                                      field.value?.some(
                                        (participant) =>
                                          participant.id === user.id,
                                      ) || false
                                    }
                                  >
                                    <p key={user.id}>{user.name}</p>
                                  </DropdownMenuCheckboxItem>
                                ) : (
                                  <p>Something went wrong</p>
                                )}
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
          <Separator className="mt-3" />
          <div className="flex gap-x-2">
            <Button
              disabled={dataLoading || fileLoading || loadingTournamentUpdate}
              asChild
              className="w-full mt-3"
              variant={"secondary"}
            >
              <a href="/v1/admin">Cancel</a>
            </Button>
            <Button
              disabled={dataLoading || fileLoading || loadingTournamentUpdate}
              className="w-full mt-3"
              type="submit"
            >
              <p>Update</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
