import { MetaFunction } from '@remix-run/node';

import Dashboard from '~/componentes/dashboard';

export const meta: MetaFunction = () => {
  return [{ title: 'Torre de control' }];
};

export default function DashboardView() {
  return <Dashboard />;
}
