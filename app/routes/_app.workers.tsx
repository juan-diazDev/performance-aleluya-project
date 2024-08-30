import { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Empleados' }];
};

export default function Workers() {
  return 'Workers view';
}
