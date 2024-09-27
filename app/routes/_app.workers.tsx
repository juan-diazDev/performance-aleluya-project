import { LoaderFunctionArgs, MetaFunction, redirect } from '@remix-run/node';
import {
  useLoaderData,
  useRouteError,
} from '@remix-run/react';

import { User } from 'db/schema';
import { getSession } from '~/session';
import { workers } from '~/componentes/workers/helpers';
import Workers from '~/componentes/workers';
import ErrorBoundaryView from '~/componentes/errorBoundary';

export const meta: MetaFunction = () => {
  return [{ title: 'Empleados' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user') as User;

  if (!user) {
    throw redirect('/login');
  }

  return workers;
}

export default function WorkersView() {
  const workerData = useLoaderData<typeof loader>();

  return <Workers workerData={workerData} />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return (
      <ErrorBoundaryView errorMessage={error.message} />
    );
  } else {
    return (
      <ErrorBoundaryView />
    );
  }
}
