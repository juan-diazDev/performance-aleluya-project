import { json, redirect } from '@remix-run/node';
import bcryptjs from 'bcryptjs';

import { User } from '../../db/schema';

import { destroySession, getSession } from '~/session';

export async function hashPassword(password: string) {
  const hashedPassword = await bcryptjs.hash(password, 12);

  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await bcryptjs.compare(password, hashedPassword);

  return isValid;
}

export async function requireAnonymous(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.get('user')) {
    throw redirect('/dashboard');
  }

  const data = { error: session.get("error") };

  return json(data);
}

export async function requireUser(request: Request) {
  const session = await getSession(request.headers.get('cookie'));
  const user = session.get('user');

  if (!user) {
    throw redirect('/login', {
      headers: {
        'set-cookie': await destroySession(session),
      },
    });
  }

  if (session.get('user')) {
    throw redirect('/dashboard');
  }

  return user as User;
}
