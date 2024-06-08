export const USER_ROLE = {
  superAdmin: "superAdmin",
  manager: "manager",
  user: "user",
} as const;
export type TUserRole = keyof typeof USER_ROLE;
