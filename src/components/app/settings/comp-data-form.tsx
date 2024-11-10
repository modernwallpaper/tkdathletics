import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useUpdateUserAsUser } from "@/hooks/useUpdateUserAsUser";
import { UpdateUserSchema } from "../../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormError } from "../form-error";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const CompDataForm = () => {
  const { state } = useAuthContext();
  const { user } = state;
  const { error, loading, update } = useUpdateUserAsUser();

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
  });

  const onSubmit = async (values: z.infer<typeof UpdateUserSchema>) => {
    if (user?.id) {
      await update(
        { ...values, timestamp: JSON.stringify(new Date()), id: user.id },
        user.id,
      );
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4 w-full">
            <FormField
              control={form.control}
              name="kup"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kup</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={"Select a kup"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ONE">1</SelectItem>
                      <SelectItem value="TWO">2</SelectItem>
                      <SelectItem value="THREE">3</SelectItem>
                      <SelectItem value="FOUR">4</SelectItem>
                      <SelectItem value="FIVE">5</SelectItem>
                      <SelectItem value="SIX">6</SelectItem>
                      <SelectItem value="SEVEN">7</SelectItem>
                      <SelectItem value="EIGHT">8</SelectItem>
                      <SelectItem value="NINE">9</SelectItem>
                      <SelectItem value="TEN">10</SelectItem>
                      <SelectItem value="DAN">Dan</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight_class"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight class</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            user.weight_class
                              ? user.weight_class
                              : "Select a weight class"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TO_22KG">-22kg</SelectItem>
                      <SelectItem value="TO_24KG">-24kg</SelectItem>
                      <SelectItem value="TO_26KG">-26kg</SelectItem>
                      <SelectItem value="TO_27KG">-27kg</SelectItem>
                      <SelectItem value="TO_29KG">-29kg</SelectItem>
                      <SelectItem value="TO_32KG">-32kg</SelectItem>
                      <SelectItem value="TO_33KG">-33kg</SelectItem>
                      <SelectItem value="TO_35KG">-35kg</SelectItem>
                      <SelectItem value="TO_37KG">-37kg</SelectItem>
                      <SelectItem value="TO_39KG">-39kg</SelectItem>
                      <SelectItem value="TO_41KG">-41kg</SelectItem>
                      <SelectItem value="TO_42KG">-42kg</SelectItem>
                      <SelectItem value="TO_43KG">-43kg</SelectItem>
                      <SelectItem value="TO_44KG">-44kg</SelectItem>
                      <SelectItem value="TO_45KG">-45kg</SelectItem>
                      <SelectItem value="TO_46KG">-46kg</SelectItem>
                      <SelectItem value="TO_47KG">-47kg</SelectItem>
                      <SelectItem value="TO_48KG">-48kg</SelectItem>
                      <SelectItem value="TO_49KG">-49kg</SelectItem>
                      <SelectItem value="TO_51KG">-51kg</SelectItem>
                      <SelectItem value="TO_52KG">-52kg</SelectItem>
                      <SelectItem value="TO_53KG">-53kg</SelectItem>
                      <SelectItem value="TO_54KG">-54kg</SelectItem>
                      <SelectItem value="TO_55KG">-55kg</SelectItem>
                      <SelectItem value="TO_57KG">-57kg</SelectItem>
                      <SelectItem value="TO_58KG">-58kg</SelectItem>
                      <SelectItem value="TO_59KG">-59kg</SelectItem>
                      <SelectItem value="TO_61KG">-61kg</SelectItem>
                      <SelectItem value="TO_62KG">-62kg</SelectItem>
                      <SelectItem value="TO_63KG">-63kg</SelectItem>
                      <SelectItem value="TO_65KG">-65kg</SelectItem>
                      <SelectItem value="TO_67KG">-67kg</SelectItem>
                      <SelectItem value="TO_68KG">-68kg</SelectItem>
                      <SelectItem value="TO_73KG">-73kg</SelectItem>
                      <SelectItem value="TO_74KG">-74kg</SelectItem>
                      <SelectItem value="TO_78KG">-78kg</SelectItem>
                      <SelectItem value="TO_80KG">-80kg</SelectItem>
                      <SelectItem value="TO_87KG">-87kg</SelectItem>
                      <SelectItem value="PLUS_45KG">+45kg</SelectItem>
                      <SelectItem value="PLUS_57KG">+57kg</SelectItem>
                      <SelectItem value="PLUS_59KG">+59kg</SelectItem>
                      <SelectItem value="PLUS_63KG">+63kg</SelectItem>
                      <SelectItem value="PLUS_65KG">+65kg</SelectItem>
                      <SelectItem value="PLUS_67KG">+67kg</SelectItem>
                      <SelectItem value="PLUS_68KG">+68kg</SelectItem>
                      <SelectItem value="PLUS_73KG">+73kg</SelectItem>
                      <SelectItem value="PLUS_78KG">+78kg</SelectItem>
                      <SelectItem value="PLUS_80KG">+80kg</SelectItem>
                      <SelectItem value="PLUS_87KG">+87kg</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            user.gender ? user.gender : "Select a gender"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="MALE">Andre</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ag"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            user.ag ? user.ag : "Select an age group"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SENIOR">Senior</SelectItem>
                      <SelectItem value="YOUTHA">Youth A</SelectItem>
                      <SelectItem value="YOUTHB">Youth B</SelectItem>
                      <SelectItem value="YOUTHC">Youth D</SelectItem>
                      <SelectItem value="YOUTHD">Youth C</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pg"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Performance class</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            user.pg ? user.pg : "Select a performance class"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="KADETS">Kadets</SelectItem>
                      <SelectItem value="LK1">LK1</SelectItem>
                      <SelectItem value="LK2">LK2</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              disabled={loading}
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("pl-3 text-left font-normal")}
                        >
                          {field.value
                            ? format(field.value, "yyyy-mm-dd")
                            : format(
                                user.birthday ? user.birthday : "",
                                "yyyy-mm-dd",
                              )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        } // Convert string to Date for selection
                        onSelect={(date) => {
                          // Convert Date to string format
                          const formattedDate = date
                            ? date.toISOString().split("T")[0]
                            : ""; // Format as YYYY-MM-DD or any other string format you prefer
                          field.onChange(formattedDate); // Set the string value
                        }}
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
          </div>
          <Button type="submit" className="mt-2">
            Save
          </Button>
          {error && <FormError message={error} />}
        </form>
      </Form>
    </div>
  );
};
