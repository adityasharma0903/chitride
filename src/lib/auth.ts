export interface UserAccount {
  name: string;
  email: string;
  phone: string;
  password: string;
  branch?: string;
  year?: string;
}

const ACCOUNTS_KEY = "easyride_accounts";
const CURRENT_USER_KEY = "easyride_user";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const isCollegeEmail = (email: string) =>
  normalizeEmail(email).endsWith("@chitkara.edu.in");

export const sanitizePhone = (value: string) => value.replace(/\D/g, "");

export const getAccounts = (): UserAccount[] => {
  const raw = localStorage.getItem(ACCOUNTS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveAccounts = (accounts: UserAccount[]) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

export const findAccountByEmail = (email: string) => {
  const normalized = normalizeEmail(email);
  return getAccounts().find((account) => normalizeEmail(account.email) === normalized);
};

export const upsertAccount = (account: UserAccount) => {
  const accounts = getAccounts();
  const normalized = normalizeEmail(account.email);
  const index = accounts.findIndex(
    (existing) => normalizeEmail(existing.email) === normalized
  );

  if (index >= 0) {
    accounts[index] = account;
  } else {
    accounts.push(account);
  }

  saveAccounts(accounts);
};

export const setCurrentUserFromAccount = (account: UserAccount) => {
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({
      name: account.name,
      email: normalizeEmail(account.email),
      phone: account.phone,
      branch: account.branch || "",
      year: account.year || "",
    })
  );
};
