import { createCookieSessionStorage } from '@remix-run/node';

export const SESSION_COOKIE_NAME = '__session';

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: SESSION_COOKIE_NAME,
      expires: new Date(Date.now() + 120_000),
      maxAge: 120,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: import.meta.env.VITE_SESSION_SECRET.split(','),
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
