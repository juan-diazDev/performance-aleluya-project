import { LoaderFunctionArgs } from '@remix-run/node';

import { requireUser } from '~/utils/auth.service';

import AppLayout from '~/componentes/app';


export async function loader({ request }: LoaderFunctionArgs) {
  const response = await requireUser(request);

  return response;
}

export default function App() {
  return <AppLayout />;
}
