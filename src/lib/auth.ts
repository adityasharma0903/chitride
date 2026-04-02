export interface UserAccount {
  id?: string;
  name: string;
  email: string;
  phone: string;
  branch?: string;
  year?: string;
  role?: "user" | "admin";
}

const CURRENT_USER_KEY = "easyride_user";
const ACCESS_TOKEN_KEY = "easyride_access_token";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const isCollegeEmail = (email: string) =>
  normalizeEmail(email).endsWith("@chitkara.edu.in");

export const sanitizePhone = (value: string) => value.replace(/\D/g, "");

export const setCurrentUserFromAccount = (account: UserAccount, accessToken?: string) => {
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({
      id: account.id,
      name: account.name,
      email: normalizeEmail(account.email),
      phone: account.phone,
      branch: account.branch || "",
      year: account.year || "",
      role: account.role || "user",
    })
  );

  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
};

export const getCurrentUser = (): UserAccount | null => {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as UserAccount;
  } catch {
    return null;
  }
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const clearSession = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};
