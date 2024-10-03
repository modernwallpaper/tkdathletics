import { UserType } from "@/types";
import * as z from "zod";

//LoginSchema
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

//UpdateUserSchema for admins
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

//CreateUserSchema
const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  authority: z.enum(["USER", "ADMIN"]),
});

//NotificationsSchema
const NotificationsSchema = z.object({
  allowed: z.boolean().default(false).optional(),
  video_upload: z.boolean().default(false).optional(),
  register_competition: z.boolean().default(false).optional(),
})

// User Schema for update
const UpdateUserAsUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  surname: z.string().optional(),
  birthday: z.string().refine((dateString) => {
    // Attempt to parse the string as a date
    return !isNaN(Date.parse(dateString));
  }, {
    message: "Invalid date format",
  }).transform((dateString) => new Date(dateString)).optional(),
  img: z.string().optional().optional(),
  kup: z.enum(["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "DAN"]).optional(),
  weight_class: z.enum([
    "TO_22KG", 
    "TO_24KG",
    "TO_26KG",
    "TO_27KG",
    "TO_29KG",
    "TO_32KG",
    "TO_33KG",
    "TO_35KG",
    "TO_37KG",
    "TO_39KG",
    "TO_41KG",
    "TO_42KG",
    "TO_43KG",
    "TO_44KG",
    "TO_45KG",
    "TO_46KG",
    "TO_47KG",
    "TO_48KG",
    "TO_49KG",
    "TO_51KG",
    "TO_52KG",
    "TO_53KG",
    "TO_54KG",
    "TO_55KG",
    "TO_57KG",
    "TO_58KG",
    "TO_59KG",
    "TO_61KG",
    "TO_62KG",
    "TO_63KG",
    "TO_65KG",
    "TO_67KG",
    "TO_68KG",
    "TO_73KG",
    "TO_74KG",
    "TO_78KG",
    "TO_80KG",
    "TO_87KG",
    "PLUS_45KG",
    "PLUS_57KG",
    "PLUS_59KG",
    "PLUS_63KG",
    "PLUS_65KG",
    "PLUS_67KG",
    "PLUS_68KG",
    "PLUS_73KG",
    "PLUS_78KG",
    "PLUS_80KG",
    "PLUS_87KG"
  ]).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  ag: z.enum(["SENIOR", "YOUTHA", "YOUTHB", "YOUTHC", "YOUTHD"]).optional(),
  pg: z.enum(["KADETS", "LK1", "LK2"]).optional(),
  failed_logins: z.number().optional(),
  timestamp: z.string().optional(),
});

const GetCompetitionShema = z.object({
  id: z.string(),
})

const GetTournamentSchema = z.object({
  id: z.string(),
})

export { UpdateUserAsAdminSchema, CreateUserSchema, UpdateUserAsUserSchema, LoginSchema,NotificationsSchema, GetCompetitionShema, GetTournamentSchema };
