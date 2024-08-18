import * as z from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const UpdateUserAsAdminSchema = z.object({
  id: z.string().email().optional(),
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  surename: z.string().optional(),
  birthday: z
    .string()
    .refine(
      (dateString) => {
        // Attempt to parse the string as a date
        return !isNaN(Date.parse(dateString));
      },
      {
        message: "Invalid date format",
      },
    )
    .transform((dateString) => new Date(dateString))
    .optional(),
  img: z.string().optional().optional(),
  kup: z
    .enum([
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ])
    .optional(),
  weight_class: z.enum(["to56kg"]).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  ag: z.enum(["Senior", "Youth_A", "Youth_B", "Youth_C", "Youth_D"]).optional(),
  pg: z.enum(["KADETS", "LK1", "LK2"]).optional(),
  timestamp: z.string().optional(),
  authority: z.enum(["ADMIN", "USER"]).optional(),
});

const UpdateUserAsUserSchema = z.object({
  id: z.string().email().optional(),
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  surename: z.string().optional(),
  birthday: z
    .string()
    .refine(
      (dateString) => {
        // Attempt to parse the string as a date
        return !isNaN(Date.parse(dateString));
      },
      {
        message: "Invalid date format",
      },
    )
    .transform((dateString) => new Date(dateString))
    .optional(),
  img: z.string().optional().optional(),
  kup: z
    .enum([
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ])
    .optional(),
  weight_class: z.enum(["to56kg"]).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  ag: z.enum(["Senior", "Youth_A", "Youth_B", "Youth_C", "Youth_D"]).optional(),
  pg: z.enum(["KADETS", "LK1", "LK2"]).optional(),
  timestamp: z.string().optional(),
});

const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  authority: z.enum(["USER", "ADMIN"]),
});

const NotificationsSchema = z.object({
  video_upload: z.boolean().default(false).optional(),
  register_competition: z.boolean().default(false).optional(),
})

export { UpdateUserAsAdminSchema, CreateUserSchema, UpdateUserAsUserSchema, LoginSchema,NotificationsSchema };
