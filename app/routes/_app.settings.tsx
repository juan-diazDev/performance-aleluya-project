import { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Configuraciones' }];
};

export default function Settings() {
  return 'Settings view';
}
