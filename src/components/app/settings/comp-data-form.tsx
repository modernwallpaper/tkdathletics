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

export const CompDataForm = () => {
  const { state } = useAuthContext();
  const { user } = state;
  const { error, loading, update } = useUpdateUserAsUser();

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
  });

  const onSubmit = async (values: z.infer<typeof UpdateUserSchema>) => {
    if (user?.id) {
      await update({ ...values, timestamp: JSON.stringify(new Date()), id: user.id }, user.id);
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
                      <SelectItem value="to56kg">-56kg</SelectItem>
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
