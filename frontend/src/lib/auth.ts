// TEMPORARY: hardcoded credentials until a real backend with proper auth exists.
// This is not secure — do not use this pattern once real users/data are involved.
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "marketly2026";

const TOKEN_KEY = "marketly_admin_token";

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem(TOKEN_KEY, "authenticated");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(TOKEN_KEY) === "authenticated";
}
