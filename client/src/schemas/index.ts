import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email required" }).email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password required" })
})

export const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(6)
})

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(6),
  role: z.enum(["USER", "ADMIN"]),
})

export const UpdateUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(6),
  role: z.enum(["USER", "ADMIN"]),
})

export const FighterDataSchema = z.object({
  weight: z.string().min(1),
  gender: z.enum(["MALE", "FEMALE"]),
  weight_class: z.string().min(1),
  kup: z.string().min(1),
  age: z.string().min(1),
})

export const UserFighterSchema = z.object({
  user:z.object({
    id: z.string(),
    name: z.string(),
    timestamp: z.string(),
    email: z.string().email(),
  }),
  fighter: z.object({
    weight: z.string(),
    gender: z.enum(["MALE", "FEMALE"]),
    weight_class: z.enum(["T45", "T48", "T51", "T55", "T59", "T63", "T68", "T73", "P73", "T78", "P78"]),
    kup: z.enum(["K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8", "D1", "D2", "D3"]),
    date_of_birth: z.string(),
    age_group: z.enum(["YOUTH_A", "YOUTH_B", "YOUTH_C", "YOUTH_D", "SENIOR"]),
    performance_class: z.enum(["ONE", "TWO"]),
  })
})
