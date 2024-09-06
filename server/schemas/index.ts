import * as z from "zod";

// User Schema for registration
const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  authority: z.enum(["USER", "ADMIN"])
})

// User Schema for update
const UpdateUserAsUserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  surename: z.string().optional(),
  birthday: z.string().refine((dateString) => {
    // Attempt to parse the string as a date
    return !isNaN(Date.parse(dateString));
  }, {
    message: "Invalid date format",
  }).transform((dateString) => new Date(dateString)).optional(),
  img: z.string().optional().optional(),
  kup: z.enum(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]).optional(),
  weight_class: z.enum(["to56kg"]).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  ag: z.enum(["Senior", "Youth_A", "Youth_B", "Youth_C", "Youth_D"]).optional(),
  pg: z.enum(["KADETS", "LK1", "LK2"]).optional(),
});

// User Schema for login
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// User Schema for delete
const DeleteUserSchema = z.object({
  id: z.string().min(1),
})

export { UserSchema, LoginSchema, UpdateUserAsUserSchema, DeleteUserSchema };
