import { getSession } from "~/session";
import bcryptjs from "bcryptjs";

export async function requireUser(request: Request) {
  const session = await getSession(request.headers.get("cookie"));

  return session
}

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcryptjs.hash(password, 12);

  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await bcryptjs.compare(password, hashedPassword);

  return isValid;
};
