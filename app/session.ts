import { createCookieSessionStorage } from '@remix-run/node';

export const SESSION_COOKIE_NAME = '__session';

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: SESSION_COOKIE_NAME,
      maxAge: 3600,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: import.meta.env.VITE_SESSION_SECRET.split(','),
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
