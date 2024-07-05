import { redirect } from '@remix-run/node';
import bcryptjs from 'bcryptjs';

import { destroySession, getSession } from '~/session';

export async function requireUser(request: Request) {
  const session = await getSession(request.headers.get('cookie'));
  const user = session.get('userId');

  if (!user) {
    throw redirect('/login', {
      headers: {
        'set-cookie': await destroySession(session),
      },
    });
  }

  return user as User;
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
