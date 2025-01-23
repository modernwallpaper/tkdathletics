import { UpdateUserSchema } from "../../../../schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useUpdateUserAsAdmin } from "@/hooks/useUpdateUserAsAdmin";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthContext } from "@/hooks/useAuthContext";

export const UpdateUserForm = () => {
  const { state } = useAuthContext();
  const { user } = state;

  if (user) {
    const form = useForm<z.infer<typeof UpdateUserSchema>>({
      resolver: zodResolver(UpdateUserSchema),
      defaultValues: {
        name: user.name,
        email: user.email,
      },
    });

    const [isLoading, setLoading] = useState(false);

    const { loading, update } = useUpdateUserAsAdmin();

    const onSubmit = async (values: z.infer<typeof UpdateUserSchema>) => {
      setLoading(loading);
      try {
        await update({
          ...values,
          id: user.id,
          timestamp: JSON.stringify(new Date()),
        });
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className="flex flex-col w-full">
        <div className="space-y-2 w-full">
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full"
              >
                <div className="flex space-x-2 w-full">
                  <div className="flex-col gap-y-2 w-full">
                    <FormField
                      control={form.control}
                      name="name"
                      disabled={isLoading}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="someone" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      disabled={isLoading}
                      render={() => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="someone@example.com" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="surname"
                      disabled={isLoading}
                      render={() => (
                        <FormItem>
                          <FormLabel>Surename</FormLabel>
                          <FormControl>
                            <Input placeholder="surename" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kup"
                      disabled={isLoading}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kup</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    user.kup ? user.kup : "Select a kup"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="one">1</SelectItem>
                              <SelectItem value="two">2</SelectItem>
                              <SelectItem value="three">3</SelectItem>
                              <SelectItem value="four">4</SelectItem>
                              <SelectItem value="five">5</SelectItem>
                              <SelectItem value="six">6</SelectItem>
                              <SelectItem value="seven">7</SelectItem>
                              <SelectItem value="eight">8</SelectItem>
                              <SelectItem value="nine">9</SelectItem>
                              <SelectItem value="ten">10</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-col gap-y-2 w-full">
                    <FormField
                      control={form.control}
                      name="weight_class"
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                                    user.gender
                                      ? user.gender
                                      : "Select a gender"
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
                      disabled={isLoading}
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
                              <SelectItem value="Senior">Senior</SelectItem>
                              <SelectItem value="Youth_A">Youth A</SelectItem>
                              <SelectItem value="Youth_B">Youth B</SelectItem>
                              <SelectItem value="Youth_C">Youth D</SelectItem>
                              <SelectItem value="Youth_D">Youth C</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pg"
                      disabled={isLoading}
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
                                    user.pg
                                      ? user.pg
                                      : "Select a performance class"
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
                </div>
                <div className="flex w-full">
                  <Button disabled={isLoading} type="submit" className="w-full">
                    Update
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  }
};
