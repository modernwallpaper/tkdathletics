import * as z from "zod";

const UserSchema = z.object({
  name: z.string({ message: "Name is required" }),
  username: z.string({ message: "Username is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password must have a minimum of 6 Characters" }),
  surename: z.string({ message: "Surename is required" }),
  authority: z.enum([ "ADMIN", "USER" ]),
  birthday: z.string().refine((dateString) => {
    // Attempt to parse the string as a date
    return !isNaN(Date.parse(dateString));
  }, {
    message: "Invalid date format",
  }).transform((dateString) => new Date(dateString)),
  img: z.string().optional(),
  kup: z.enum(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]),
  weight_class: z.enum(["to56kg"]),
  gender: z.enum(["MALE", "FEMALE"]),
  ag: z.enum(["Senior", "Youth_A", "Youth_B", "Youth_C", "Youth_D"]),
  pg: z.enum(["KADETS", "LK1", "LK2"]),
});

const UpdateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  id: z.string(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export { UserSchema, LoginSchema, UpdateUserSchema };
