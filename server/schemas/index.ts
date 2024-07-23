import * as z from "zod";

const UserSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password must have a minimum of 6 Characters" }),
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

const FighterSchema = z.object({
  weight: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  weight_class: z.enum(["T45", "T48", "T51", "T55", "T59", "T63", "T68", "T73", "P73", "T78", "P78"]).optional(),
  kup: z.enum(["K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8", "D1", "D2", "D3"]).optional(),
  date_of_birth: z.date().optional(),
  age_group: z.enum(["YOUTH_A", "YOUTH_B", "YOUTH_C", "YOUTH_D", "SENIOR"]).optional(),
  performance_class: z.enum(["ONE", "TWO"]).optional(),
})

export { UserSchema, LoginSchema, UpdateUserSchema, FighterSchema };
