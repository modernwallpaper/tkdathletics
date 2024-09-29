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

const GetCompetitionShema = z.object({
  id: z.string(),
})

const GetTournamentSchema = z.object({
  id: z.string(),
})

export { 
  UserSchema, 
  LoginSchema, 
  GetCompetitionShema,
  UpdateUserAsUserSchema, 
  DeleteUserSchema, 
  GetTournamentSchema 
};
