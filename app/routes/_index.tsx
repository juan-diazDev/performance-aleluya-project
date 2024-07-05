import { LoaderFunctionArgs } from '@remix-run/node';
import { requireUser } from '~/utils/auth.service';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUser(request);

  return null;
}
