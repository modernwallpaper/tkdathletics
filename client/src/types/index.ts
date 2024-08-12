export type User = {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
  surename?: string;
  username?: string;
  birthday?: Date;
  img?: string;
  kup?:
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine"
  | "ten";
  weight_class?: "to56kg";
  gender?: "MALE" | "FEMALE";
  ag?: "Senior" | "Youth_A" | "Youth_B" | "Youth_C" | "Youth_D";
  pg?: "KADETS" | "LK1" | "LK2";
  authority?: "USER" | "ADMIN";
  timestamp?: string;
}
